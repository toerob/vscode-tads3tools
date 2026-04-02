import * as fs from "fs";

/**
 * Checks if a TADS3 image file contains debug records.
 * @param filePath Path to the .t3 image file
 * @returns true if debug records are found, false otherwise
 */
export function tads3ImageHasDebugSymbols(filePath: string): boolean {
  const buffer = fs.readFileSync(filePath);
  // Check signature
  const signature = Buffer.from([0x54, 0x33, 0x2d, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x0d, 0x0a, 0x1a]);
  for (let i = 0; i < signature.length; i++) {
    if (buffer[i] !== signature[i]) return false;
  }

  // Scan blocks
  let offset = 69; // After signature, version, reserved, timestamp
  let methodHeaderSize = 0;
  let mhlsEntries: number[] = [];
  while (offset < buffer.length) {
    const blockType = buffer.slice(offset, offset + 4).toString("ascii");
    const blockSize = buffer.readUInt32LE(offset + 4);
    //const blockFlags = buffer.readUInt16LE(offset+8);
    const blockDataOffset = offset + 10;

    if (blockType === "ENTP") {
      // ENTP block: parse method header size
      // ENTP: UINT4 entrypoint, UINT2 methodHeaderSize, ...
      methodHeaderSize = buffer.readUInt16LE(blockDataOffset + 4);
    }
    if (blockType === "MHLS") {
      // MHLS block: UINT4 count, then count*UINT4 addresses
      const count = buffer.readUInt32LE(blockDataOffset);
      for (let i = 0; i < count; i++) {
        mhlsEntries.push(buffer.readUInt32LE(blockDataOffset + 4 + i * 4));
      }
    }
    offset += 10 + blockSize;
    if (blockType === "EOF ") break;
  }

  if (!methodHeaderSize || mhlsEntries.length === 0) {
    // Can't locate method headers
    // This likely means the image is stripped of debug info,
    // but to be safe, assume no debug symbols if there are
    // no method headers at all
    return false;
  }

  // For each method header, check debug records field
  for (const addr of mhlsEntries) {
    // Method header starts at addr in code pool (assume code pool is contiguous after blocks)
    // For most images, code pool is after blocks, but for simplicity, treat addr as file offset
    // Debug records offset is usually at offset 24 in header (spec may vary)
    const debugOffset = buffer.readUInt32LE(addr + 24);
    if (debugOffset !== 0) {
      return true;
    }
  }
  // No debug records found in any method header
  return false;
}

/**
 * Parses a TADS3 image file and returns structured data for all recognized blocks.
 * @param filePath Path to the .t3 image file
 * @returns Object with parsed data for each block type
 */
export function parseTads3Image(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const blocks = scanTads3ImageBlocks(filePath);
  if (!blocks) return null;

  /*
  EOF (end of file)
  ENTP (entrypoint)
  OBJS (static objects)
  CPDF (constant pool definition)
  CPPG (constant pool page)
  MRES (multi-media resource)
  MREL (multi-media resource links)
  MCLD (metaclass dependency list)
  FNSD (function set dependency list)
  SYMD (symbolic names)
  SRCF (source file descriptor)
  GSYM (global symbol table)
  MHLS (method header list)
  MACR (preprocessor macro symbol table)
  SINI (static initializer list)
  */

  const parsed: any = {
    ENTP: blocks.ENTP.map(({ blockDataOffset }) => parseBlockENTP(buffer, blockDataOffset)),
    OBJS: blocks.OBJS.map(({ blockDataOffset, blockSize }) => parseBlockOBJS(buffer, blockDataOffset)),
    CPDF: blocks.CPDF.map(({ blockDataOffset }) => parseBlockCPDF(buffer, blockDataOffset)),
    CPPG: blocks.CPPG.map(({ blockDataOffset, blockSize }) => parseBlockCPPG(buffer, blockDataOffset, blockSize)),
    MRES: blocks.MRES.map(({ blockDataOffset, blockSize }) => parseBlockMRES(buffer, blockDataOffset, blockSize)),
    MCLD: blocks.MCLD.map(({ blockDataOffset, blockSize }) => parseBlockMCLD(buffer, blockDataOffset, blockSize)),
    FNSD: blocks.FNSD.map(({ blockDataOffset, blockSize }) => parseBlockFNSD(buffer, blockDataOffset, blockSize)),
    SYMD: blocks.SYMD.map(({ blockDataOffset, blockSize }) => parseBlockSYMD(buffer, blockDataOffset, blockSize)),
    SRCF: blocks.SRCF.map(({ blockDataOffset, blockSize }) => parseBlockSRCF(buffer, blockDataOffset, blockSize)),
    MHLS: blocks.MHLS.map(({ blockDataOffset, blockSize }) => parseBlockMHLS(buffer, blockDataOffset, blockSize)),
    GSYM: blocks.GSYM.map(({ blockDataOffset, blockSize }) => parseBlockGSYM(buffer, blockDataOffset, blockSize)),

    // Not parsed in detail yet
    /*
    MACR: blocks.MACR, 
    SINI: blocks.SINI, 
    MREL: blocks.MREL, 
    EOF: blocks.EOF,   
    */
    unknown: blocks.unknown,
  };

  return parsed;
}

export function parseBlockGSYM(buffer: Buffer, offset: number, blockSize: number) {
  // GSYM header: UINT4 (number of entries)
  const entryCount = buffer.readUInt32LE(offset);
  let pos = offset + 4;
  const symbols = [];
  for (let i = 0; i < entryCount && pos < offset + blockSize; i++) {
    const nameLen = buffer.readUInt16LE(pos);
    const extraLen = buffer.readUInt16LE(pos + 2);
    const typeCode = buffer.readUInt16LE(pos + 4);
    const name = buffer.slice(pos + 6, pos + 6 + nameLen).toString('utf8');
    const extraData = buffer.slice(pos + 6 + nameLen, pos + 6 + nameLen + extraLen);
    symbols.push({ name, typeCode, extraData });
    pos += 6 + nameLen + extraLen;
  }
  return { entryCount, symbols };
}

export function parseBlockMHLS(buffer: Buffer, offset: number, blockSize: number) {
  const entries = buffer.readUInt32LE(offset);
  const addresses = [];
  for (let i = 0; i < entries; i++) {
    addresses.push(buffer.readUInt32LE(offset + 4 + i * 4));
  }
  return { entries, addresses };
}

/**
 * Scans a TADS3 image file and collects block entries for later analysis.
 * @param filePath Path to the .t3 image file
 * @returns Object with arrays for each block type
 */
export function scanTads3ImageBlocks(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const signature = Buffer.from([0x54, 0x33, 0x2d, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x0d, 0x0a, 0x1a]);
  for (let i = 0; i < signature.length; i++) {
    if (buffer[i] !== signature[i]) return null;
  }

  let offset = 69; // After signature, version, reserved, timestamp
  const blocks = {
    ENTP: [],
    MHLS: [],
    OBJS: [],
    CPDF: [],
    CPPG: [],
    MRES: [],
    MREL: [],
    MCLD: [],
    FNSD: [],
    SYMD: [],
    SRCF: [],
    GSYM: [],
    MACR: [],
    SINI: [],
    EOF: [],
    unknown: [],
  };

  while (offset < buffer.length) {
    const blockType = buffer.slice(offset, offset + 4).toString("ascii");
    const blockSize = buffer.readUInt32LE(offset + 4);
    const blockDataOffset = offset + 10;

    // Store block info
    if (blocks.hasOwnProperty(blockType.trim())) {
      blocks[blockType.trim()].push({ offset, blockSize, blockDataOffset });
    } else {
      blocks.unknown.push({ blockType, offset, blockSize, blockDataOffset });
    }

    offset += 10 + blockSize;
    if (blockType === "EOF ") break;
  }
  return blocks;
}

export function parseBlockENTP(buffer: Buffer, offset: number) {
  // ENTP: UINT4 entrypoint, UINT2 methodHeaderSize, UINT2 exceptionTableEntrySize, UINT2 debugLineTableEntrySize, UINT2 debugTableHeaderSize, UINT2 debugTableLocalSymbolHeaderSize, UINT2 debugRecordsVersion, UINT2 debugTableFrameHeaderSize (v2+)
  return {
    entrypoint: buffer.readUInt32LE(offset),
    methodHeaderSize: buffer.readUInt16LE(offset + 4),
    exceptionEntrySize: buffer.readUInt16LE(offset + 6),
    debugLineSize: buffer.readUInt16LE(offset + 8),
    debugHeaderSize: buffer.readUInt16LE(offset + 10),
    debugLocalSize: buffer.readUInt16LE(offset + 12),
    debugVersion: buffer.readUInt16LE(offset + 14),
    debugFrameSize: buffer.readUInt16LE(offset + 16),
  };
}

export function parseBlockOBJS(buffer: Buffer, offset: number) {
  const entries = buffer.readUInt16LE(offset);
  const metaclass = buffer.readUInt16LE(offset + 2);
  const flags = buffer.readUInt16LE(offset + 4);
  const flagLarge = !!(flags & 0x01);
  const flagTransient = !!(flags & 0x02);
  let pos = offset + 6;
  const objects = [];
  for (let i = 0; i < entries; i++) {
    const id = buffer.readUInt32LE(pos);
    let size;
    if (flagLarge) {
      size = buffer.readUInt32LE(pos + 4);
      pos += 8;
    } else {
      size = buffer.readUInt16LE(pos + 4);
      pos += 6;
    }
    const data = buffer.slice(pos, pos + size);
    pos += size;
    objects.push({ id, metaclass, flags, size, data });
  }
  return { entries, metaclass, flags, flagLarge, flagTransient, objects };
}

export function parseBlockCPDF(buffer: Buffer, offset: number) {
  const type = buffer.readUInt16LE(offset);
  const pages = buffer.readUInt32LE(offset + 2);
  const size = buffer.readUInt32LE(offset + 6);
  return { type, pages, size };
}

export function parseBlockCPPG(buffer: Buffer, offset: number, blockSize: number) {
  const type = buffer.readUInt16LE(offset);
  const page = buffer.readUInt32LE(offset + 2);
  const mask = buffer.readUInt8(offset + 6);
  // XOR decrypt the rest
  const data = Buffer.alloc(blockSize - 7);
  for (let i = 0; i < blockSize - 7; i++) {
    data[i] = buffer[offset + 7 + i] ^ mask;
  }
  return { type, page, mask, data };
}

export function parseBlockMRES(buffer: Buffer, offset: number, blockSize: number) {
  const entries = buffer.readUInt16LE(offset);
  let pos = offset + 2;
  const resources = [];
  for (let i = 0; i < entries; i++) {
    const dataPos = buffer.readUInt32LE(pos);
    const size = buffer.readUInt32LE(pos + 4);
    const nameSize = buffer.readUInt8(pos + 8);
    const name = buffer.slice(pos + 9, pos + 9 + nameSize);
    // Decrypt name (XOR 0xFF)
    const decrypted = Buffer.from(name.map((b) => b ^ 0xff));
    resources.push({ name: decrypted.toString(), size, dataPos });
    pos += 9 + nameSize;
  }
  // Embedded data is after ToC
  return { entries, resources };
}

export function parseBlockMCLD(buffer: Buffer, offset: number, blockSize: number) {
  const entries = buffer.readUInt16LE(offset);
  let pos = offset + 2;
  const metaclasses = [];
  for (let i = 0; i < entries; i++) {
    const entryOffset = buffer.readUInt16LE(pos);
    const nameSize = buffer.readUInt8(pos + 2);
    const name = buffer.slice(pos + 3, pos + 3 + nameSize).toString();
    // TODO: Parse property IDs, etc.
    metaclasses.push({ name });
    pos += entryOffset;
  }
  return { entries, metaclasses };
}

export function parseBlockFNSD(buffer: Buffer, offset: number, blockSize: number) {
  const entries = buffer.readInt16LE(offset);
  let pos = offset + 2;
  const functions = [];
  while (pos < offset + blockSize) {
    const nameSize = buffer.readUInt8(pos);
    const name = buffer.slice(pos + 1, pos + 1 + nameSize).toString();
    functions.push(name);
    pos += 1 + nameSize;
  }
  return { entries, functions };
}

export function parseBlockSYMD(buffer: Buffer, offset: number, blockSize: number) {
  const entries = buffer.readUInt16LE(offset);
  let pos = offset + 2;
  const symbols = [];
  while (pos < offset + blockSize) {
    const symbolValue = buffer.slice(pos, pos + 5);
    const symbolSize = buffer.readUInt8(pos + 5);
    const symbolName = buffer.slice(pos + 6, pos + 6 + symbolSize).toString();
    symbols.push({ symbolName, symbolValue });
    pos += 6 + symbolSize;
  }
  return { entries, symbols };
}

export function parseBlockSRCF(buffer: Buffer, offset: number, blockSize: number) {
  const entries = buffer.readUInt16LE(offset);
  const sizeLineRecord = buffer.readUInt16LE(offset + 2);
  let pos = offset + 4; // UINT2 count + UINT2 sizeLineRecord = 4 bytes
  const files = [];
  for (let i = 0; i < entries; i++) {
    const entrySize = buffer.readUInt32LE(pos);
    const masterIndex = buffer.readUInt16LE(pos + 4);
    const filenameSize = buffer.readUInt16LE(pos + 6);
    const filename = buffer.slice(pos + 8, pos + 8 + filenameSize).toString();
    let posRec = pos + 8 + filenameSize;
    const recordCount = buffer.readUInt32LE(posRec);
    posRec += 4;
    const records = [];
    for (let j = 0; j < recordCount; j++) {
      const lineNo = buffer.readUInt32LE(posRec);
      const bytecode = buffer.readUInt32LE(posRec + 4);
      records.push({ lineNo, bytecode });
      posRec += 8;
    }
    files.push({ filename, masterIndex, records });
    pos += entrySize;
  }
  return { entries, sizeLineRecord, files };
}
