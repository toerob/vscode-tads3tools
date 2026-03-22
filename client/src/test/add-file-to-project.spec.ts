/* eslint-disable @typescript-eslint/no-var-requires */
import { readTemplateFileToSnippetString } from "../modules/commands/add-file-to-project";
import { expect, describe } from "@jest/globals";

describe("readTemplateFileToSnippetString", () => {
  it("throws when the templateFileBaseUri is faulty", async () => {
    const useAdv3Lite = true;
    const langCode = "en_us";
    const baseUri: any = undefined;
    expect(() => readTemplateFileToSnippetString(useAdv3Lite, langCode, baseUri)).toThrow();
  });
});
