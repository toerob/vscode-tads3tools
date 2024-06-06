import { DocumentSymbol } from "vscode-languageserver";
import {
  addIterativelyDFS,
  addIterativelyDFS2,
  addRecursivelyDFS,
} from "../../src/modules/symbol-manager";
import { Suite } from "benchmark";
import { test } from "@jest/globals";
import { symbolHierarchy2 } from "./symbols-for-test";

describe("TadsSymbolManager", () => {
  const TIMES = 100;
  test.each(Array(3).fill(null))("addRecursively vs addIteratively mean time", () => {
    let meanTimeRecursively = 0;
    {
      let resultMs: number = 0;
      for (let time = 0; time < TIMES; time++) {
        const startTime = Date.now();
        let collection: DocumentSymbol[] = [];
        addRecursivelyDFS(symbolHierarchy2, collection);
        const elapsedTime = Date.now() - startTime;
        resultMs += elapsedTime;
      }
      meanTimeRecursively = resultMs / TIMES;
    }

    let meanTimeIteratively = 0;
    {
      let resultMs: number = 0;
      for (let time = 0; time < TIMES; time++) {
        const startTime = Date.now();
        addIterativelyDFS(symbolHierarchy2);
        const elapsedTime = Date.now() - startTime;
        resultMs += elapsedTime;
      }
      meanTimeIteratively = resultMs / TIMES;
    }

    console.log(
      `addRecursively mean time: ${meanTimeRecursively}ms vs\naddIteratively mean time: ${meanTimeIteratively}ms`,
    );
  });

  it("benchmark", () => {
    const result = new Suite()
      .add("Using addRecursivelyDFS mmethod", () => {
        addRecursivelyDFS(symbolHierarchy2, []);
      })
      .add("Using addIterativelyDFS method", () => {
        addIterativelyDFS(symbolHierarchy2);
      })
      .add("Using addIterativelyDFS2 method", () => {
        addIterativelyDFS2(symbolHierarchy2);
      })
      .on("cycle", (event: any) => {
        console.log(String(event.target));
      })
      .on("complete", () => {
        console.log(`Comparison done`);
      })
      .run({ async: false });

    console.log(`Fastest is ***${result.filter("fastest").map("name")}***`);
  });


  /*
  const TIMES = 100;
  test.each(Array(3).fill(null))("addRecursively vs addIteratively mean time", () => {
    let meanTimeRecursively = 0;
    {
      let resultMs: number = 0;
      for (let time = 0; time < TIMES; time++) {
        const startTime = Date.now();
        let collection: DocumentSymbol[] = [];
        addRecursivelyDFS(symbolHierarchy2, collection);
        const elapsedTime = Date.now() - startTime;
        resultMs += elapsedTime;
      }
      meanTimeRecursively = resultMs / TIMES;
    }

    let meanTimeIteratively = 0;
    {
      let resultMs: number = 0;
      for (let time = 0; time < TIMES; time++) {
        const startTime = Date.now();
        addIterativelyDFS(symbolHierarchy2);
        const elapsedTime = Date.now() - startTime;
        resultMs += elapsedTime;
      }
      meanTimeIteratively = resultMs / TIMES;
    }

    console.log(
      `addRecursively mean time: ${meanTimeRecursively}ms vs\naddIteratively mean time: ${meanTimeIteratively}ms`,
    );
  });*/
});
