import { TreeDataProvider, EventEmitter, TreeItem, TreeItemCollapsibleState } from "vscode";
import { parseTads3Image } from "./image";

export class ImageInfoProvider implements TreeDataProvider<ImageItem> {
  private _onDidChangeTreeData = new EventEmitter<ImageItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;
  imageData: any;

  update(filepath: string): void {
    this.imageData = parseTads3Image(filepath);
    //const { ENTP, OBJS, CPDF, CPPG, MRES, MCLD, FNSD, SYMD, SRCF, MHLS, GSYM }

    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: ImageItem): TreeItem {
    return element;
  }

  getChildren(element?: ImageItem): ImageItem[] {
    if (!this.imageData) {
      return [];
    }

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

    if (!element) {
      // Root items
      return [
        new ImageItem("MHLS (method header list)", TreeItemCollapsibleState.Collapsed),
        new ImageItem("GSYM (global symbol table)", TreeItemCollapsibleState.Collapsed),
      ];
    }
    if (element.label === "MHLS (method header list)") {
      // Show each method header address
      return (this.imageData.MHLS || []).flatMap((mhlsBlock: any, blockIdx: number) =>
        (mhlsBlock.addresses || []).map(
          (addr: number, idx: number) =>
            new ImageItem(`Header ${blockIdx + 1}-${idx + 1}: 0x${addr.toString(16)}`, TreeItemCollapsibleState.None),
        ),
      );
    }
    if (element.label === "GSYM (global symbol table)") {
      // Show each symbol name
      return (this.imageData.GSYM || []).flatMap((gsymBlock: any, blockIdx: number) =>
        (gsymBlock.symbols || []).map(
          (sym: any, idx: number) =>
						// name, typeCode, extraData 
						new ImageItem(`Symbol ${blockIdx + 1}-${idx + 1}: ${sym.name} (typeCode: ${sym.typeCode}, extraData: ${sym.extraData})`, TreeItemCollapsibleState.None),
        ),
      );
    }
    return [];
  }
}

class ImageItem extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState,
  ) {
    super(label, collapsibleState);
  }
}
