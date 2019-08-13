import * as assert from "assert";
import Lib from "../src/lib";
import * as api from "../src/index";

describe("Public API", () => {
  it("exports Floco as the default", () => {
    assert.strictEqual(api.default, Lib);
  });
});
