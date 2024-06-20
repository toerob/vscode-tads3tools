
/* eslint-disable @typescript-eslint/no-var-requires */
import {expect} from '@jest/globals'
import { runCommand } from '../modules/run-command';

describe("TODO: client tests", () => {
  test("something", async ()=> {
		const x = await runCommand('ls');
		expect(x).not.toBeUndefined();
	})
});
