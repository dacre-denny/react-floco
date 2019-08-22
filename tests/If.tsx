import { assert } from "chai";
import { mount, CommonWrapper } from "enzyme";
import * as React from "react";
import Components from "../src/components";
import { Switch, Default, Case } from "../src/components/switch";
import * as API from "../src/index";
import * as sinon from "sinon";

describe("If", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("renders nothing if empty", () => {
    const wrapper = mount(<Switch value={1} />);

    assert.isEmpty(wrapper.children());
  });

  it("renders nothing if no case or default", () => {
    const wrapper = mount(
      <Switch value={1}>
        <div>foo</div>
        <p>bar</p>
      </Switch>
    );

    assert.isEmpty(wrapper.children());
  });
});
