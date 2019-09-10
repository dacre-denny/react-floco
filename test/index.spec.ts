import { assert } from "chai";
import Components from "../src/components";
import { Switch } from "../src/components/switch";
import { Default } from "../src/components/default";
import { Case } from "../src/components/case";
import { Repeat } from "../src/components/repeat";
import { If } from "../src/components/if";
import { Else } from "../src/components/else";
import { Loading } from "../src/components/loading";
import * as API from "../src/index";

describe("Floco API", (): void => {
  it("exports Floco as the default", (): void => {
    assert.strictEqual(API.default, Components);
  });

  it("exports each component of Floco library", (): void => {
    assert.strictEqual(API.Default, Default);
    assert.strictEqual(API.Case, Case);
    assert.strictEqual(API.Switch, Switch);
    assert.strictEqual(API.If, If);
    assert.strictEqual(API.Else, Else);
    assert.strictEqual(API.Repeat, Repeat);
    assert.strictEqual(API.Loading, Loading);
  });
});
