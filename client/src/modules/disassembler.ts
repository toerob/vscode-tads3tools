import { parseTads3Image } from './image';

// ---------------------------------------------------------------------------
// Opcode table
// operandSpec is a space-separated list of operand types to read after opcode.
// Special values: 'PUSHSTRI', 'SWITCH', 'NAMEDARGTAB' for variable-length operands.
// ---------------------------------------------------------------------------
interface OpcodeInfo {
  mnemonic: string;
  operandSpec: string;
}

const OPCODES: Record<number, OpcodeInfo> = {
  0x01: { mnemonic: 'PUSH_0',           operandSpec: '' },
  0x02: { mnemonic: 'PUSH_1',           operandSpec: '' },
  0x03: { mnemonic: 'PUSHINT8',         operandSpec: 'SBYTE' },
  0x04: { mnemonic: 'PUSHINT',          operandSpec: 'INT4' },
  0x05: { mnemonic: 'PUSHSTR',          operandSpec: 'UINT4' },
  0x06: { mnemonic: 'PUSHLST',          operandSpec: 'UINT4' },
  0x07: { mnemonic: 'PUSHOBJ',          operandSpec: 'UINT4' },
  0x08: { mnemonic: 'PUSHNIL',          operandSpec: '' },
  0x09: { mnemonic: 'PUSHTRUE',         operandSpec: '' },
  0x0A: { mnemonic: 'PUSHPROPID',       operandSpec: 'UINT2' },
  0x0B: { mnemonic: 'PUSHFNPTR',        operandSpec: 'UINT4' },
  0x0C: { mnemonic: 'PUSHSTRI',         operandSpec: 'PUSHSTRI' },
  0x0D: { mnemonic: 'PUSHPARLST',       operandSpec: 'UBYTE' },
  0x0E: { mnemonic: 'MAKELSTPAR',       operandSpec: '' },
  0x0F: { mnemonic: 'PUSHENUM',         operandSpec: 'INT4' },
  0x10: { mnemonic: 'PUSHBIFPTR',       operandSpec: 'UINT2 UINT2' },

  0x20: { mnemonic: 'NEG',              operandSpec: '' },
  0x21: { mnemonic: 'BNOT',             operandSpec: '' },
  0x22: { mnemonic: 'ADD',              operandSpec: '' },
  0x23: { mnemonic: 'SUB',              operandSpec: '' },
  0x24: { mnemonic: 'MUL',              operandSpec: '' },
  0x25: { mnemonic: 'BAND',             operandSpec: '' },
  0x26: { mnemonic: 'BOR',              operandSpec: '' },
  0x27: { mnemonic: 'SHL',              operandSpec: '' },
  0x28: { mnemonic: 'ASHR',             operandSpec: '' },
  0x29: { mnemonic: 'XOR',              operandSpec: '' },
  0x2A: { mnemonic: 'DIV',              operandSpec: '' },
  0x2B: { mnemonic: 'MOD',              operandSpec: '' },
  0x2C: { mnemonic: 'NOT',              operandSpec: '' },
  0x2D: { mnemonic: 'BOOLIZE',          operandSpec: '' },
  0x2E: { mnemonic: 'INC',              operandSpec: '' },
  0x2F: { mnemonic: 'DEC',              operandSpec: '' },
  0x30: { mnemonic: 'LSHR',             operandSpec: '' },

  0x40: { mnemonic: 'EQ',               operandSpec: '' },
  0x41: { mnemonic: 'NE',               operandSpec: '' },
  0x42: { mnemonic: 'LT',               operandSpec: '' },
  0x43: { mnemonic: 'LE',               operandSpec: '' },
  0x44: { mnemonic: 'GT',               operandSpec: '' },
  0x45: { mnemonic: 'GE',               operandSpec: '' },

  0x50: { mnemonic: 'RETVAL',           operandSpec: '' },
  0x51: { mnemonic: 'RETNIL',           operandSpec: '' },
  0x52: { mnemonic: 'RETTRUE',          operandSpec: '' },
  0x54: { mnemonic: 'RET',              operandSpec: '' },
  0x56: { mnemonic: 'NAMEDARGPTR',      operandSpec: 'UINT2 UBYTE' },
  0x57: { mnemonic: 'NAMEDARGTAB',      operandSpec: 'NAMEDARGTAB' },
  0x58: { mnemonic: 'CALL',             operandSpec: 'UBYTE UINT4' },
  0x59: { mnemonic: 'PTRCALL',          operandSpec: 'UBYTE' },

  0x60: { mnemonic: 'GETPROP',          operandSpec: 'UINT2' },
  0x61: { mnemonic: 'CALLPROP',         operandSpec: 'UBYTE UINT2' },
  0x62: { mnemonic: 'PTRCALLPROP',      operandSpec: 'UBYTE' },
  0x63: { mnemonic: 'GETPROPSELF',      operandSpec: 'UINT2' },
  0x64: { mnemonic: 'CALLPROPSELF',     operandSpec: 'UBYTE UINT2' },
  0x65: { mnemonic: 'PTRCALLPROPSELF',  operandSpec: 'UBYTE' },
  0x66: { mnemonic: 'OBJGETPROP',       operandSpec: 'UINT4 UINT2' },
  0x67: { mnemonic: 'OBJCALLPROP',      operandSpec: 'UBYTE UINT4 UINT2' },
  0x68: { mnemonic: 'GETPROPDATA',      operandSpec: 'UINT2' },
  0x69: { mnemonic: 'PTRGETPROPDATA',   operandSpec: '' },
  0x6A: { mnemonic: 'GETPROPLCL1',      operandSpec: 'UBYTE UINT2' },
  0x6B: { mnemonic: 'CALLPROPLCL1',     operandSpec: 'UBYTE UBYTE UINT2' },
  0x6C: { mnemonic: 'GETPROPR0',        operandSpec: 'UINT2' },
  0x6D: { mnemonic: 'CALLPROPR0',       operandSpec: 'UBYTE UINT2' },

  0x72: { mnemonic: 'INHERIT',          operandSpec: 'UBYTE UINT2' },
  0x73: { mnemonic: 'PTRINHERIT',       operandSpec: 'UBYTE' },
  0x74: { mnemonic: 'EXPINHERIT',       operandSpec: 'UBYTE UINT2 UINT4' },
  0x75: { mnemonic: 'PTREXPINHERIT',    operandSpec: 'UBYTE UINT4' },
  0x76: { mnemonic: 'VARARGC',          operandSpec: '' },
  0x77: { mnemonic: 'DELEGATE',         operandSpec: 'UBYTE UINT2' },
  0x78: { mnemonic: 'PTRDELEGATE',      operandSpec: 'UBYTE' },
  0x7A: { mnemonic: 'SWAP2',            operandSpec: '' },
  0x7C: { mnemonic: 'GETARGN0',         operandSpec: '' },
  0x7D: { mnemonic: 'GETARGN1',         operandSpec: '' },
  0x7E: { mnemonic: 'GETARGN2',         operandSpec: '' },
  0x7F: { mnemonic: 'GETARGN3',         operandSpec: '' },

  0x80: { mnemonic: 'GETLCL1',          operandSpec: 'UBYTE' },
  0x81: { mnemonic: 'GETLCL2',          operandSpec: 'UINT2' },
  0x82: { mnemonic: 'GETARG1',          operandSpec: 'UBYTE' },
  0x83: { mnemonic: 'GETARG2',          operandSpec: 'UINT2' },
  0x84: { mnemonic: 'PUSHSELF',         operandSpec: '' },
  0x85: { mnemonic: 'GETDBLCL',         operandSpec: 'UINT2 UINT2' },
  0x86: { mnemonic: 'GETDBARG',         operandSpec: 'UINT2 UINT2' },
  0x87: { mnemonic: 'GETARGC',          operandSpec: '' },
  0x88: { mnemonic: 'DUP',              operandSpec: '' },
  0x89: { mnemonic: 'DISC',             operandSpec: '' },
  0x8A: { mnemonic: 'DISC1',            operandSpec: 'UBYTE' },
  0x8B: { mnemonic: 'GETR0',            operandSpec: '' },
  0x8C: { mnemonic: 'GETDBARGC',        operandSpec: 'UINT2' },
  0x8D: { mnemonic: 'SWAP',             operandSpec: '' },
  0x8E: { mnemonic: 'PUSHCTXELE',       operandSpec: 'UBYTE' },
  0x8F: { mnemonic: 'DUP2',             operandSpec: '' },

  0x90: { mnemonic: 'SWITCH',           operandSpec: 'SWITCH' },
  0x91: { mnemonic: 'JMP',              operandSpec: 'INT2' },
  0x92: { mnemonic: 'JT',               operandSpec: 'INT2' },
  0x93: { mnemonic: 'JF',               operandSpec: 'INT2' },
  0x94: { mnemonic: 'JE',               operandSpec: 'INT2' },
  0x95: { mnemonic: 'JNE',              operandSpec: 'INT2' },
  0x96: { mnemonic: 'JGT',              operandSpec: 'INT2' },
  0x97: { mnemonic: 'JGE',              operandSpec: 'INT2' },
  0x98: { mnemonic: 'JLT',              operandSpec: 'INT2' },
  0x99: { mnemonic: 'JLE',              operandSpec: 'INT2' },
  0x9A: { mnemonic: 'JST',              operandSpec: 'INT2' },
  0x9B: { mnemonic: 'JSF',              operandSpec: 'INT2' },
  0x9C: { mnemonic: 'LJSR',             operandSpec: 'INT2' },
  0x9D: { mnemonic: 'LRET',             operandSpec: 'UINT2' },
  0x9E: { mnemonic: 'JNIL',             operandSpec: 'INT2' },
  0x9F: { mnemonic: 'JNOTNIL',          operandSpec: 'INT2' },
  0xA0: { mnemonic: 'JR0T',             operandSpec: 'INT2' },
  0xA1: { mnemonic: 'JR0F',             operandSpec: 'INT2' },
  0xA6: { mnemonic: 'GETSPN',           operandSpec: 'UBYTE' },
  // GETLCLN0-5: spec HTML shows "0x8AA-0x8AF" but actual compiled bytecode
  // places these at 0xAA-0xAF.  No operands — push local variable 0..5.
  0xAA: { mnemonic: 'GETLCLN0',         operandSpec: '' },
  0xAB: { mnemonic: 'GETLCLN1',         operandSpec: '' },
  0xAC: { mnemonic: 'GETLCLN2',         operandSpec: '' },
  0xAD: { mnemonic: 'GETLCLN3',         operandSpec: '' },
  0xAE: { mnemonic: 'GETLCLN4',         operandSpec: '' },
  0xAF: { mnemonic: 'GETLCLN5',         operandSpec: '' },

  0xB0: { mnemonic: 'SAY',              operandSpec: 'UINT4' },
  0xB1: { mnemonic: 'BUILTIN_A',        operandSpec: 'UBYTE UBYTE' },
  0xB2: { mnemonic: 'BUILTIN_B',        operandSpec: 'UBYTE UBYTE' },
  0xB3: { mnemonic: 'BUILTIN_C',        operandSpec: 'UBYTE UBYTE' },
  0xB4: { mnemonic: 'BUILTIN_D',        operandSpec: 'UBYTE UBYTE' },
  0xB5: { mnemonic: 'BUILTIN1',         operandSpec: 'UBYTE UBYTE UBYTE' },
  0xB6: { mnemonic: 'BUILTIN2',         operandSpec: 'UBYTE UINT2 UBYTE' },
  0xB8: { mnemonic: 'THROW',            operandSpec: '' },
  0xB9: { mnemonic: 'SAYVAL',           operandSpec: '' },
  0xBA: { mnemonic: 'INDEX',            operandSpec: '' },
  0xBB: { mnemonic: 'IDXLCL1INT8',      operandSpec: 'UBYTE SBYTE' },
  0xBC: { mnemonic: 'IDXINT8',          operandSpec: 'SBYTE' },

  0xC0: { mnemonic: 'NEW1',             operandSpec: 'UBYTE UBYTE' },
  0xC1: { mnemonic: 'NEW2',             operandSpec: 'UINT2 UINT2' },
  0xC2: { mnemonic: 'TRNEW1',           operandSpec: 'UBYTE UBYTE' },
  0xC3: { mnemonic: 'TRNEW2',           operandSpec: 'UINT2 UINT2' },

  0xD0: { mnemonic: 'INCLCL',           operandSpec: 'UINT2' },
  0xD1: { mnemonic: 'DECLCL',           operandSpec: 'UINT2' },
  0xD2: { mnemonic: 'ADDILCL1',         operandSpec: 'UBYTE SBYTE' },
  0xD3: { mnemonic: 'ADDILCL4',         operandSpec: 'UINT2 INT4' },
  0xD4: { mnemonic: 'ADDTOLCL',         operandSpec: 'UINT2' },
  0xD5: { mnemonic: 'SUBFROMLCL',       operandSpec: 'UINT2' },
  0xD6: { mnemonic: 'ZEROLCL1',         operandSpec: 'UBYTE' },
  0xD7: { mnemonic: 'ZEROLCL2',         operandSpec: 'UINT2' },
  0xD8: { mnemonic: 'NILLCL1',          operandSpec: 'UBYTE' },
  0xD9: { mnemonic: 'NILLCL2',          operandSpec: 'UINT2' },
  0xDA: { mnemonic: 'ONELCL1',          operandSpec: 'UBYTE' },
  0xDB: { mnemonic: 'ONELCL2',          operandSpec: 'UINT2' },

  0xE0: { mnemonic: 'SETLCL1',          operandSpec: 'UBYTE' },
  0xE1: { mnemonic: 'SETLCL2',          operandSpec: 'UINT2' },
  0xE2: { mnemonic: 'SETARG1',          operandSpec: 'UBYTE' },
  0xE3: { mnemonic: 'SETARG2',          operandSpec: 'UINT2' },
  0xE4: { mnemonic: 'SETIND',           operandSpec: '' },
  0xE5: { mnemonic: 'SETPROP',          operandSpec: 'UINT2' },
  0xE6: { mnemonic: 'PTRSETPROP',       operandSpec: '' },
  0xE7: { mnemonic: 'SETPROPSELF',      operandSpec: 'UINT2' },
  0xE8: { mnemonic: 'OBJSETPROP',       operandSpec: 'UINT4 UINT2' },
  0xE9: { mnemonic: 'SETDBLCL',         operandSpec: 'UINT2 UINT2' },
  0xEA: { mnemonic: 'SETDBARG',         operandSpec: 'UINT2 UINT2' },
  0xEB: { mnemonic: 'SETSELF',          operandSpec: '' },
  0xEC: { mnemonic: 'LOADCTX',          operandSpec: '' },
  0xEE: { mnemonic: 'SETLCL1R0',        operandSpec: 'UBYTE' },
  0xEF: { mnemonic: 'SETINDLCL1I8',     operandSpec: 'UBYTE SBYTE' },

  0xF1: { mnemonic: 'BP',               operandSpec: '' },
  0xF2: { mnemonic: 'NOP',              operandSpec: '' },
};

// ---------------------------------------------------------------------------
// Code pool assembly
// ---------------------------------------------------------------------------

function buildCodePool(parsed: any): { pool: Buffer; pageSize: number } | null {
  // Find the bytecode pool CPDF (pool type 1)
  const cpdf = (parsed.CPDF || []).find((c: any) => c.type === 1);
  if (!cpdf) return null;

  const pageSize: number = cpdf.size;
  const totalPages: number = cpdf.pages;
  const pool = Buffer.alloc(totalPages * pageSize, 0);

  for (const page of parsed.CPPG || []) {
    if (page.type !== 1) continue;
    const dest = page.page * pageSize;
    if (dest + page.data.length <= pool.length) {
      page.data.copy(pool, dest);
    }
  }

  return { pool, pageSize };
}

// ---------------------------------------------------------------------------
// Single-instruction disassembler
// ---------------------------------------------------------------------------

function readOperandValue(pool: Buffer, offset: number, type: string): { text: string; size: number } {
  switch (type) {
    case 'SBYTE': return { text: pool.readInt8(offset).toString(), size: 1 };
    case 'UBYTE': return { text: pool.readUInt8(offset).toString(), size: 1 };
    case 'INT2':  return { text: pool.readInt16LE(offset).toString(), size: 2 };
    case 'UINT2': return { text: `0x${pool.readUInt16LE(offset).toString(16).toUpperCase()}`, size: 2 };
    case 'INT4':  return { text: pool.readInt32LE(offset).toString(), size: 4 };
    case 'UINT4': return { text: `0x${pool.readUInt32LE(offset).toString(16).toUpperCase()}`, size: 4 };
    default:      return { text: '?', size: 0 };
  }
}

function disassembleInstruction(
  pool: Buffer,
  addr: number,
): { mnemonic: string; args: string[]; size: number } {
  if (addr >= pool.length) {
    return { mnemonic: '<EOF>', args: [], size: 1 };
  }

  const opcode = pool.readUInt8(addr);
  const info = OPCODES[opcode];

  if (!info) {
    return {
      mnemonic: `db`,
      args: [`0x${opcode.toString(16).padStart(2, '0').toUpperCase()}`],
      size: 1,
    };
  }

  let operandOffset = addr + 1;
  const args: string[] = [];

  // Handle variable-length operand formats
  if (info.operandSpec === 'PUSHSTRI') {
    const strLen = pool.readUInt16LE(operandOffset);
    const str = pool.slice(operandOffset + 2, operandOffset + 2 + strLen).toString('utf8');
    args.push(strLen.toString(), JSON.stringify(str));
    return { mnemonic: info.mnemonic, args, size: 1 + 2 + strLen };
  }

  if (info.operandSpec === 'SWITCH') {
    // UINT2 case_count, then case_count * (DATA_HOLDER[5] + INT2[2]), then INT2 default
    if (operandOffset + 2 > pool.length) {
      return { mnemonic: info.mnemonic, args: ['<truncated>'], size: 1 };
    }
    const caseCount = pool.readUInt16LE(operandOffset);
    const totalSize = 1 + 2 + caseCount * 7 + 2;
    args.push(`case_count=${caseCount}`);
    return { mnemonic: info.mnemonic, args, size: totalSize };
  }

  if (info.operandSpec === 'NAMEDARGTAB') {
    // UINT2 table_bytes, then table_bytes more bytes
    if (operandOffset + 2 > pool.length) {
      return { mnemonic: info.mnemonic, args: ['<truncated>'], size: 1 };
    }
    const tableBytes = pool.readUInt16LE(operandOffset);
    args.push(`table_bytes=${tableBytes}`);
    return { mnemonic: info.mnemonic, args, size: 1 + 2 + tableBytes };
  }

  // Fixed operand list
  if (info.operandSpec) {
    for (const type of info.operandSpec.split(' ')) {
      if (operandOffset >= pool.length) {
        args.push('<truncated>');
        break;
      }
      const { text, size } = readOperandValue(pool, operandOffset, type);
      args.push(text);
      operandOffset += size;
    }
  }

  return {
    mnemonic: info.mnemonic,
    args,
    size: operandOffset - addr,
  };
}

// ---------------------------------------------------------------------------
// Range disassembler
// ---------------------------------------------------------------------------

function disassembleRange(pool: Buffer, startAddr: number, endAddr: number): string[] {
  const lines: string[] = [];
  let addr = startAddr;

  while (addr < endAddr) {
    const { mnemonic, args, size } = disassembleInstruction(pool, addr);
    const addrHex = `0x${addr.toString(16).padStart(8, '0')}`;
    const argStr = args.length > 0 ? `  ${args.join(', ')}` : '';
    lines.push(`  ${addrHex}  ${mnemonic.padEnd(16)}${argStr}`);
    if (size <= 0) break; // safety guard
    addr += size;
  }

  return lines;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface MethodSummary {
  name: string;
  codePoolAddr: number;
  varArgs: boolean;
  paramCount: number;
  optParamCount: number;
  localCount: number;
  maxStack: number;
}

/**
 * Returns a list of all methods found in the .t3 image, with metadata.
 */
export function getMethodsFromImage(filePath: string): MethodSummary[] {
  const parsed = parseTads3Image(filePath);
  if (!parsed) return [];

  const methodHeaderSize: number = parsed.ENTP?.[0]?.methodHeaderSize ?? 10;
  const cpResult = buildCodePool(parsed);
  if (!cpResult) return [];
  const { pool } = cpResult;

  // Build code-pool-address → name map from GSYM (type 1 = function)
  const addrToName = new Map<number, string>();
  for (const gsym of parsed.GSYM || []) {
    for (const sym of gsym.symbols || []) {
      if (sym.typeCode === 1 && sym.extraData.length >= 4) {
        const codeAddr: number = sym.extraData.readUInt32LE(0);
        addrToName.set(codeAddr, sym.name);
      }
    }
  }

  const methods: MethodSummary[] = [];
  const mhlsAddrs: number[] = (parsed.MHLS || []).flatMap((m: any) => m.addresses ?? []);

  for (const addr of mhlsAddrs) {
    if (addr + methodHeaderSize > pool.length) continue;
    const paramByte = pool.readUInt8(addr);
    const varArgs = !!(paramByte & 0x80);
    const paramCount = paramByte & 0x7f;
    const optParamCount = pool.readUInt8(addr + 1);
    const localCount = pool.readUInt16LE(addr + 2);
    const maxStack = pool.readUInt16LE(addr + 4);

    methods.push({
      name: addrToName.get(addr) ?? `<anonymous@0x${addr.toString(16)}>`,
      codePoolAddr: addr,
      varArgs,
      paramCount,
      optParamCount,
      localCount,
      maxStack,
    });
  }

  return methods;
}

/**
 * Disassemble a single named method from the .t3 image.
 * Returns the assembly text.
 */
export function disassembleNamedMethod(filePath: string, methodName: string): string {
  const parsed = parseTads3Image(filePath);
  if (!parsed) return `; Error: could not parse ${filePath}`;

  const methodHeaderSize: number = parsed.ENTP?.[0]?.methodHeaderSize ?? 10;
  const cpResult = buildCodePool(parsed);
  if (!cpResult) return '; Error: no bytecode pool (CPPG type=1) found in image';
  const { pool } = cpResult;

  // Resolve method address from GSYM
  let methodAddr: number | null = null;
  for (const gsym of parsed.GSYM || []) {
    for (const sym of gsym.symbols || []) {
      if (sym.name === methodName && sym.typeCode === 1 && sym.extraData.length >= 4) {
        methodAddr = sym.extraData.readUInt32LE(0);
        break;
      }
    }
    if (methodAddr !== null) break;
  }

  if (methodAddr === null) {
    return `; Method '${methodName}' not found in GSYM symbol table`;
  }

  // Find neighbouring method addresses to bound the bytecode
  const sortedMhls: number[] = (parsed.MHLS || [])
    .flatMap((m: any) => m.addresses ?? [])
    .sort((a: number, b: number) => a - b);
  const idx = sortedMhls.indexOf(methodAddr);
  const nextAddr = idx >= 0 && idx + 1 < sortedMhls.length ? sortedMhls[idx + 1] : undefined;

  return renderMethod(pool, methodAddr, methodHeaderSize, methodName, nextAddr);
}

/**
 * Disassemble all methods in the .t3 image.
 * Returns the full assembly text.
 */
export function disassembleAllMethods(filePath: string): string {
  const parsed = parseTads3Image(filePath);
  if (!parsed) return `; Error: could not parse ${filePath}`;

  const methodHeaderSize: number = parsed.ENTP?.[0]?.methodHeaderSize ?? 10;
  const cpResult = buildCodePool(parsed);
  if (!cpResult) return '; Error: no bytecode pool (CPPG type=1) found in image';
  const { pool } = cpResult;

  // Build address → name map
  const addrToName = new Map<number, string>();
  for (const gsym of parsed.GSYM || []) {
    for (const sym of gsym.symbols || []) {
      if (sym.typeCode === 1 && sym.extraData.length >= 4) {
        addrToName.set(sym.extraData.readUInt32LE(0), sym.name);
      }
    }
  }

  const sortedMhls: number[] = (parsed.MHLS || [])
    .flatMap((m: any) => m.addresses ?? [])
    .sort((a: number, b: number) => a - b);

  const sections: string[] = [];
  const header = [
    `; TADS3 Image Disassembly`,
    `; File: ${filePath}`,
    `; Methods: ${sortedMhls.length}`,
    `; Method header size: ${methodHeaderSize}`,
    '',
  ].join('\n');
  sections.push(header);

  for (let i = 0; i < sortedMhls.length; i++) {
    const addr = sortedMhls[i];
    const name = addrToName.get(addr) ?? `<anonymous@0x${addr.toString(16)}>`;
    const nextAddr = i + 1 < sortedMhls.length ? sortedMhls[i + 1] : undefined;
    sections.push(renderMethod(pool, addr, methodHeaderSize, name, nextAddr));
  }

  return sections.join('\n\n');
}

// ---------------------------------------------------------------------------
// Shared boundary helper
// ---------------------------------------------------------------------------

/**
 * Returns the address where a method's bytecode ends.
 * Bytecode is bounded by the earliest of:
 *  - exception table offset (if present)
 *  - debug records offset (if present)
 *  - next method's start address (or pool end)
 */
function methodBytecodeEnd(
  pool: Buffer,
  methodAddr: number,
  nextMethodAddr: number | undefined,
  poolEnd: number,
): number {
  const exceptOffset = pool.readUInt16LE(methodAddr + 6);
  const debugOffset  = pool.readUInt16LE(methodAddr + 8);
  let end = nextMethodAddr !== undefined ? nextMethodAddr : poolEnd;
  if (exceptOffset > 0) end = Math.min(end, methodAddr + exceptOffset);
  if (debugOffset  > 0) end = Math.min(end, methodAddr + debugOffset);
  return end;
}

// ---------------------------------------------------------------------------
// Verification helper (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Returns a Set of every instruction-start address across all methods in the
 * image's bytecode pool.  Used in tests to check that SRCF line-record
 * addresses are valid instruction boundaries.
 */
export function getInstructionBoundaries(filePath: string): Set<number> {
  const parsed = parseTads3Image(filePath);
  if (!parsed) return new Set();

  const methodHeaderSize: number = parsed.ENTP?.[0]?.methodHeaderSize ?? 10;
  const cpResult = buildCodePool(parsed);
  if (!cpResult) return new Set();
  const { pool } = cpResult;

  const sortedMhls: number[] = (parsed.MHLS || [])
    .flatMap((m: any) => m.addresses ?? [])
    .sort((a: number, b: number) => a - b);

  const boundaries = new Set<number>();

  for (let i = 0; i < sortedMhls.length; i++) {
    const methodAddr = sortedMhls[i];
    if (methodAddr + methodHeaderSize > pool.length) continue;

    const nextMethodAddr = i + 1 < sortedMhls.length ? sortedMhls[i + 1] : undefined;
    const bytecodeStart = methodAddr + methodHeaderSize;
    const bytecodeEnd = methodBytecodeEnd(pool, methodAddr, nextMethodAddr, pool.length);

    let addr = bytecodeStart;
    while (addr < bytecodeEnd) {
      boundaries.add(addr);
      const { size } = disassembleInstruction(pool, addr);
      if (size <= 0) break;
      addr += size;
    }
  }

  return boundaries;
}

// ---------------------------------------------------------------------------
// Internal renderer
// ---------------------------------------------------------------------------

function renderMethod(
  pool: Buffer,
  methodAddr: number,
  methodHeaderSize: number,
  name: string,
  nextMethodAddr?: number,
): string {
  if (methodAddr + methodHeaderSize > pool.length) {
    return `; ${name}\n; Error: method header at 0x${methodAddr.toString(16)} is out of pool bounds`;
  }

  const paramByte    = pool.readUInt8(methodAddr);
  const varArgs      = !!(paramByte & 0x80);
  const paramCount   = paramByte & 0x7f;
  const optParams    = pool.readUInt8(methodAddr + 1);
  const localCount   = pool.readUInt16LE(methodAddr + 2);
  const maxStack     = pool.readUInt16LE(methodAddr + 4);
  const exceptOffset = pool.readUInt16LE(methodAddr + 6);
  const debugOffset  = pool.readUInt16LE(methodAddr + 8);

  const bytecodeStart = methodAddr + methodHeaderSize;
  const bytecodeEnd = methodBytecodeEnd(pool, methodAddr, nextMethodAddr, pool.length);

  const paramStr = varArgs
    ? `${paramCount}+ (varargs${optParams > 0 ? `, ${optParams} opt` : ''})`
    : `${paramCount}${optParams > 0 ? ` + ${optParams} opt` : ''}`;

  const lines: string[] = [
    `; ${'─'.repeat(70)}`,
    `; ${name}`,
    `; Code pool offset : 0x${methodAddr.toString(16).toUpperCase()}`,
    `; Parameters       : ${paramStr}`,
    `; Locals           : ${localCount}`,
    `; Max stack        : ${maxStack}`,
    ...(exceptOffset > 0 ? [`; Exception table  : +0x${exceptOffset.toString(16)}`] : []),
    ...(debugOffset  > 0 ? [`; Debug records    : +0x${debugOffset.toString(16)}`]  : []),
    '',
    `${name}:`,
    ...disassembleRange(pool, bytecodeStart, bytecodeEnd),
  ];

  return lines.join('\n');
}
