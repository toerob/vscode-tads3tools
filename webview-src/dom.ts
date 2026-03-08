export type DomRefs = {
  resetButton: HTMLButtonElement | null;
  refreshButton: HTMLButtonElement | null;
  roomSelector: HTMLSelectElement | null;
  levelLabelRef: HTMLLabelElement | null;
  editorSelector: HTMLSelectElement | null;
  inputDialogEl: HTMLElement | null;
};

export function getDomRefs(): DomRefs {
  return {
    resetButton: document.getElementById("resetButton") as HTMLButtonElement | null,
    refreshButton: document.getElementById("refreshButton") as HTMLButtonElement | null,
    roomSelector: document.getElementById("roomSelector") as HTMLSelectElement | null,
    levelLabelRef: document.getElementById("levelLabel") as HTMLLabelElement | null,
    editorSelector: document.getElementById("editorSelector") as HTMLSelectElement | null,
    inputDialogEl: document.getElementById("inputDialog") as HTMLElement | null,
  };
}

export function initializeDom(refs: DomRefs) {
  if (refs.inputDialogEl) {
    refs.inputDialogEl.style.visibility = "hidden";
  }
}

export type DomHandlers = {
  onRefreshClick: () => void;
  onResetClick: () => void;
  onRoomChange: (value: string) => void;
  onEditorChange: (value: string) => void;
  onWindowMessage: (data: unknown) => void;
};

export function bindDomEvents(refs: DomRefs, handlers: DomHandlers) {
  refs.refreshButton?.addEventListener("click", handlers.onRefreshClick);
  refs.resetButton?.addEventListener("click", handlers.onResetClick);

  refs.roomSelector?.addEventListener("change", (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    handlers.onRoomChange(value);
  });

  refs.editorSelector?.addEventListener("change", (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    handlers.onEditorChange(value);
  });

  window.addEventListener("message", (event: MessageEvent) => {
    handlers.onWindowMessage(event.data);
  });
}
