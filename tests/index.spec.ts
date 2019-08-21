import { assert } from "chai";
import Components from "../src/components";
import { Switch, Case, Default } from "../src/components/switch";
import { Repeat } from "../src/components/repeat";
import { If } from "../src/components/if";
import * as API from "../src/index";

describe("Floco API", () => {
  it("exports Floco as the default", () => {
    assert.strictEqual(API.default, Components);
  });

  it("exports each component of Floco library", () => {
    assert.strictEqual(API.Default, Default);
    assert.strictEqual(API.Case, Case);
    assert.strictEqual(API.Switch, Switch);
    assert.strictEqual(API.If, If);
    assert.strictEqual(API.Repeat, Repeat);
  });
});
