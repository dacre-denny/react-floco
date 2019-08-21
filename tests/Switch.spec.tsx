import * as React from "react";
import * as assert from "assert";
import { mount } from "enzyme";
import Components from "../src/components";
import { Switch, Case, Default } from "../src/components/switch";
import { Repeat } from "../src/components/repeat";
import { If } from "../src/components/if";
import * as API from "../src/index";

describe("Switch", () => {
  it("exports Floco as the default", () => {
    const wrapper = mount(
      <Switch value={1}>
        <div>foo</div>
      </Switch>
    );
    assert.strictEqual(API.default, Components);
  });
});
