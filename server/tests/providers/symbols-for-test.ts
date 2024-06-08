import { DocumentSymbol, SymbolKind, Range } from "vscode-languageserver";

export function createSymbol(name: string, children: DocumentSymbol[] = []) {
  return DocumentSymbol.create(
    name,
    "",
    SymbolKind.Object,
    Range.create(0, 0, 0, 0),
    Range.create(0, 0, 0, 0),
    children,
  );
}

export const symbolHierarchy1 = [
  createSymbol("A", [
    createSymbol("A_1", [
      createSymbol("A_1_1"),
      createSymbol("A_1_2"),
      createSymbol("A_1_3", [
        createSymbol("A_1_3_1"),
        createSymbol("A_1_3_2"),
        createSymbol("A_1_3_3", [
          createSymbol("A_1_3_3_1", [
            createSymbol("A_1_3_3_1_1", [
              createSymbol("A_1_3_3_1_1_1"),
              createSymbol("A_1_3_3_1_1_2"),
              createSymbol("A_1_3_3_1_1_3", [
                createSymbol("A_1_3_3_1_1_3_1"),
                createSymbol("A_1_3_3_1_1_3_2"),
                createSymbol("A_1_3_3_1_1_3_3"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("B", [
    createSymbol("B_1", [
      createSymbol("B_1_1"),
      createSymbol("B_1_2"),
      createSymbol("B_1_3", [
        createSymbol("B_1_3_1"),
        createSymbol("B_1_3_2"),
        createSymbol("B_1_3_3", [
          createSymbol("B_1_3_3_1", [
            createSymbol("B_1_3_3_1_1", [
              createSymbol("B_1_3_3_1_1_1"),
              createSymbol("B_1_3_3_1_1_2"),
              createSymbol("B_1_3_3_1_1_3", [
                createSymbol("B_1_3_3_1_1_3_1"),
                createSymbol("B_1_3_3_1_1_3_2"),
                createSymbol("B_1_3_3_1_1_3_3"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("C", [
    createSymbol("C_1", [
      createSymbol("C_1_1"),
      createSymbol("C_1_2"),
      createSymbol("C_1_3", [
        createSymbol("C_1_3_1"),
        createSymbol("C_1_3_2"),
        createSymbol("C_1_3_3", [
          createSymbol("C_1_3_3_1", [
            createSymbol("C_1_3_3_1_1", [
              createSymbol("C_1_3_3_1_1_1"),
              createSymbol("C_1_3_3_1_1_2"),
              createSymbol("C_1_3_3_1_1_3", [
                createSymbol("C_1_3_3_1_1_3_1"),
                createSymbol("C_1_3_3_1_1_3_2"),
                createSymbol("C_1_3_3_1_1_3_3"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
];

export const symbolHierarchy2 = [
  createSymbol("A", [
    createSymbol("A_1", [
      createSymbol("A_1_1"),
      createSymbol("A_1_2"),
      createSymbol("A_1_3", [
        createSymbol("A_1_3_1"),
        createSymbol("A_1_3_2"),
        createSymbol("A_1_3_3", [
          createSymbol("A_1_3_3_1", [
            createSymbol("A_1_3_3_1_1", [
              createSymbol("A_1_3_3_1_1_1"),
              createSymbol("A_1_3_3_1_1_2"),
              createSymbol("A_1_3_3_1_1_3", [
                createSymbol("A_1_3_3_1_1_3_1"),
                createSymbol("A_1_3_3_1_1_3_2"),
                createSymbol("A_1_3_3_1_1_3_3"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("B", [
    createSymbol("B_1", [
      createSymbol("B_1_1"),
      createSymbol("B_1_2"),
      createSymbol("B_1_3", [
        createSymbol("B_1_3_1"),
        createSymbol("B_1_3_2"),
        createSymbol("B_1_3_3", [
          createSymbol("B_1_3_3_1", [
            createSymbol("B_1_3_3_1_1", [
              createSymbol("B_1_3_3_1_1_1"),
              createSymbol("B_1_3_3_1_1_2"),
              createSymbol("B_1_3_3_1_1_3", [
                createSymbol("B_1_3_3_1_1_3_1"),
                createSymbol("B_1_3_3_1_1_3_2"),
                createSymbol("B_1_3_3_1_1_3_3"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("C", [
    createSymbol("C_1", [
      createSymbol("C_1_1"),
      createSymbol("C_1_2"),
      createSymbol("C_1_3", [
        createSymbol("C_1_3_1"),
        createSymbol("C_1_3_2"),
        createSymbol("C_1_3_3", [
          createSymbol("C_1_3_3_1", [
            createSymbol("C_1_3_3_1_1", [
              createSymbol("C_1_3_3_1_1_1"),
              createSymbol("C_1_3_3_1_1_2"),
              createSymbol("C_1_3_3_1_1_3", [
                createSymbol("C_1_3_3_1_1_3_1"),
                createSymbol("C_1_3_3_1_1_3_2"),
                createSymbol("C_1_3_3_1_1_3_3", [
                  createSymbol("X", [
                    createSymbol("X_1", [
                      createSymbol("X_1_1"),
                      createSymbol("X_1_2"),
                      createSymbol("X_1_3", [
                        createSymbol("X_1_3_1"),
                        createSymbol("X_1_3_2"),
                        createSymbol("X_1_3_3", [
                          createSymbol("X_1_3_3_1", [
                            createSymbol("X_1_3_3_1_1", [
                              createSymbol("X_1_3_3_1_1_1"),
                              createSymbol("X_1_3_3_1_1_2"),
                              createSymbol("X_1_3_3_1_1_3", [
                                createSymbol("X_1_3_3_1_1_3_1"),
                                createSymbol("X_1_3_3_1_1_3_2"),
                                createSymbol("X_1_3_3_1_1_3_3", [
                                  createSymbol("Y", [
                                    createSymbol("Y_1", [
                                      createSymbol("Y_1_1"),
                                      createSymbol("Y_1_2"),
                                      createSymbol("Y_1_3", [
                                        createSymbol("Y_1_3_1"),
                                        createSymbol("Y_1_3_2"),
                                        createSymbol("Y_1_3_3", [
                                          createSymbol("Y_1_3_3_1", [
                                            createSymbol("Y_1_3_3_1_1", [
                                              createSymbol("Y_1_3_3_1_1_1"),
                                              createSymbol("Y_1_3_3_1_1_2"),
                                              createSymbol("Y_1_3_3_1_1_3", [
                                                createSymbol("Y_1_3_3_1_1_3_1"),
                                                createSymbol("Y_1_3_3_1_1_3_2"),
                                                createSymbol("Y_1_3_3_1_1_3_3"),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                      ]),
                                    ]),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("C", [
    createSymbol("C_1", [
      createSymbol("C_1_1"),
      createSymbol("C_1_2"),
      createSymbol("C_1_3", [
        createSymbol("C_1_3_1"),
        createSymbol("C_1_3_2"),
        createSymbol("C_1_3_3", [
          createSymbol("C_1_3_3_1", [
            createSymbol("C_1_3_3_1_1", [
              createSymbol("C_1_3_3_1_1_1"),
              createSymbol("C_1_3_3_1_1_2"),
              createSymbol("C_1_3_3_1_1_3", [
                createSymbol("C_1_3_3_1_1_3_1"),
                createSymbol("C_1_3_3_1_1_3_2"),
                createSymbol("C_1_3_3_1_1_3_3", [
                  createSymbol("X", [
                    createSymbol("X_1", [
                      createSymbol("X_1_1"),
                      createSymbol("X_1_2"),
                      createSymbol("X_1_3", [
                        createSymbol("X_1_3_1"),
                        createSymbol("X_1_3_2"),
                        createSymbol("X_1_3_3", [
                          createSymbol("X_1_3_3_1", [
                            createSymbol("X_1_3_3_1_1", [
                              createSymbol("X_1_3_3_1_1_1"),
                              createSymbol("X_1_3_3_1_1_2"),
                              createSymbol("X_1_3_3_1_1_3", [
                                createSymbol("X_1_3_3_1_1_3_1"),
                                createSymbol("X_1_3_3_1_1_3_2"),
                                createSymbol("X_1_3_3_1_1_3_3", [
                                  createSymbol("Y", [
                                    createSymbol("Y_1", [
                                      createSymbol("Y_1_1"),
                                      createSymbol("Y_1_2"),
                                      createSymbol("Y_1_3", [
                                        createSymbol("Y_1_3_1"),
                                        createSymbol("Y_1_3_2"),
                                        createSymbol("Y_1_3_3", [
                                          createSymbol("Y_1_3_3_1", [
                                            createSymbol("Y_1_3_3_1_1", [
                                              createSymbol("Y_1_3_3_1_1_1"),
                                              createSymbol("Y_1_3_3_1_1_2"),
                                              createSymbol("Y_1_3_3_1_1_3", [
                                                createSymbol("Y_1_3_3_1_1_3_1"),
                                                createSymbol("Y_1_3_3_1_1_3_2"),
                                                createSymbol("Y_1_3_3_1_1_3_3"),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                      ]),
                                    ]),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("C", [
    createSymbol("C_1", [
      createSymbol("C_1_1"),
      createSymbol("C_1_2"),
      createSymbol("C_1_3", [
        createSymbol("C_1_3_1"),
        createSymbol("C_1_3_2"),
        createSymbol("C_1_3_3", [
          createSymbol("C_1_3_3_1", [
            createSymbol("C_1_3_3_1_1", [
              createSymbol("C_1_3_3_1_1_1"),
              createSymbol("C_1_3_3_1_1_2"),
              createSymbol("C_1_3_3_1_1_3", [
                createSymbol("C_1_3_3_1_1_3_1"),
                createSymbol("C_1_3_3_1_1_3_2"),
                createSymbol("C_1_3_3_1_1_3_3", [
                  createSymbol("X", [
                    createSymbol("X_1", [
                      createSymbol("X_1_1"),
                      createSymbol("X_1_2"),
                      createSymbol("X_1_3", [
                        createSymbol("X_1_3_1"),
                        createSymbol("X_1_3_2"),
                        createSymbol("X_1_3_3", [
                          createSymbol("X_1_3_3_1", [
                            createSymbol("X_1_3_3_1_1", [
                              createSymbol("X_1_3_3_1_1_1"),
                              createSymbol("X_1_3_3_1_1_2"),
                              createSymbol("X_1_3_3_1_1_3", [
                                createSymbol("X_1_3_3_1_1_3_1"),
                                createSymbol("X_1_3_3_1_1_3_2"),
                                createSymbol("X_1_3_3_1_1_3_3", [
                                  createSymbol("Y", [
                                    createSymbol("Y_1", [
                                      createSymbol("Y_1_1"),
                                      createSymbol("Y_1_2"),
                                      createSymbol("Y_1_3", [
                                        createSymbol("Y_1_3_1"),
                                        createSymbol("Y_1_3_2"),
                                        createSymbol("Y_1_3_3", [
                                          createSymbol("Y_1_3_3_1", [
                                            createSymbol("Y_1_3_3_1_1", [
                                              createSymbol("Y_1_3_3_1_1_1"),
                                              createSymbol("Y_1_3_3_1_1_2"),
                                              createSymbol("Y_1_3_3_1_1_3", [
                                                createSymbol("Y_1_3_3_1_1_3_1"),
                                                createSymbol("Y_1_3_3_1_1_3_2"),
                                                createSymbol("Y_1_3_3_1_1_3_3"),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                      ]),
                                    ]),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("C", [
    createSymbol("C_1", [
      createSymbol("C_1_1"),
      createSymbol("C_1_2"),
      createSymbol("C_1_3", [
        createSymbol("C_1_3_1"),
        createSymbol("C_1_3_2"),
        createSymbol("C_1_3_3", [
          createSymbol("C_1_3_3_1", [
            createSymbol("C_1_3_3_1_1", [
              createSymbol("C_1_3_3_1_1_1"),
              createSymbol("C_1_3_3_1_1_2"),
              createSymbol("C_1_3_3_1_1_3", [
                createSymbol("C_1_3_3_1_1_3_1"),
                createSymbol("C_1_3_3_1_1_3_2"),
                createSymbol("C_1_3_3_1_1_3_3", [
                  createSymbol("X", [
                    createSymbol("X_1", [
                      createSymbol("X_1_1"),
                      createSymbol("X_1_2"),
                      createSymbol("X_1_3", [
                        createSymbol("X_1_3_1"),
                        createSymbol("X_1_3_2"),
                        createSymbol("X_1_3_3", [
                          createSymbol("X_1_3_3_1", [
                            createSymbol("X_1_3_3_1_1", [
                              createSymbol("X_1_3_3_1_1_1"),
                              createSymbol("X_1_3_3_1_1_2"),
                              createSymbol("X_1_3_3_1_1_3", [
                                createSymbol("X_1_3_3_1_1_3_1"),
                                createSymbol("X_1_3_3_1_1_3_2"),
                                createSymbol("X_1_3_3_1_1_3_3", [
                                  createSymbol("Y", [
                                    createSymbol("Y_1", [
                                      createSymbol("Y_1_1"),
                                      createSymbol("Y_1_2"),
                                      createSymbol("Y_1_3", [
                                        createSymbol("Y_1_3_1"),
                                        createSymbol("Y_1_3_2"),
                                        createSymbol("Y_1_3_3", [
                                          createSymbol("Y_1_3_3_1", [
                                            createSymbol("Y_1_3_3_1_1", [
                                              createSymbol("Y_1_3_3_1_1_1"),
                                              createSymbol("Y_1_3_3_1_1_2"),
                                              createSymbol("Y_1_3_3_1_1_3", [
                                                createSymbol("Y_1_3_3_1_1_3_1"),
                                                createSymbol("Y_1_3_3_1_1_3_2"),
                                                createSymbol("Y_1_3_3_1_1_3_3"),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                      ]),
                                    ]),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  createSymbol("C", [
    createSymbol("C_1", [
      createSymbol("C_1_1"),
      createSymbol("C_1_2"),
      createSymbol("C_1_3", [
        createSymbol("C_1_3_1"),
        createSymbol("C_1_3_2"),
        createSymbol("C_1_3_3", [
          createSymbol("C_1_3_3_1", [
            createSymbol("C_1_3_3_1_1", [
              createSymbol("C_1_3_3_1_1_1"),
              createSymbol("C_1_3_3_1_1_2"),
              createSymbol("C_1_3_3_1_1_3", [
                createSymbol("C_1_3_3_1_1_3_1"),
                createSymbol("C_1_3_3_1_1_3_2"),
                createSymbol("C_1_3_3_1_1_3_3", [
                  createSymbol("X", [
                    createSymbol("X_1", [
                      createSymbol("X_1_1"),
                      createSymbol("X_1_2"),
                      createSymbol("X_1_3", [
                        createSymbol("X_1_3_1"),
                        createSymbol("X_1_3_2"),
                        createSymbol("X_1_3_3", [
                          createSymbol("X_1_3_3_1", [
                            createSymbol("X_1_3_3_1_1", [
                              createSymbol("X_1_3_3_1_1_1"),
                              createSymbol("X_1_3_3_1_1_2"),
                              createSymbol("X_1_3_3_1_1_3", [
                                createSymbol("X_1_3_3_1_1_3_1"),
                                createSymbol("X_1_3_3_1_1_3_2"),
                                createSymbol("X_1_3_3_1_1_3_3", [
                                  createSymbol("Y", [
                                    createSymbol("Y_1", [
                                      createSymbol("Y_1_1"),
                                      createSymbol("Y_1_2"),
                                      createSymbol("Y_1_3", [
                                        createSymbol("Y_1_3_1"),
                                        createSymbol("Y_1_3_2"),
                                        createSymbol("Y_1_3_3", [
                                          createSymbol("Y_1_3_3_1", [
                                            createSymbol("Y_1_3_3_1_1", [
                                              createSymbol("Y_1_3_3_1_1_1"),
                                              createSymbol("Y_1_3_3_1_1_2"),
                                              createSymbol("Y_1_3_3_1_1_3", [
                                                createSymbol("Y_1_3_3_1_1_3_1"),
                                                createSymbol("Y_1_3_3_1_1_3_2"),
                                                createSymbol("Y_1_3_3_1_1_3_3"),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                      ]),
                                    ]),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
];
