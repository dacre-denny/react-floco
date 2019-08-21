import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import Components from "../src/components";
import { Switch, Default, Case } from "../src/components/switch";
import * as API from "../src/index";
import * as sinon from "sinon";

describe("Switch", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("renders no children", () => {
    const wrapper = mount(<Switch value={1} />);

    assert.isEmpty(wrapper.children());
  });

  it("renders no children", () => {
    let warnSpy = sinon.stub(console, "warn");

    const wrapper = mount(
      <Switch value={1}>
        <div>foo</div>
        <p>bar</p>
      </Switch>
    );

    assert.isTrue(warnSpy.calledTwice);
    assert.isEmpty(wrapper.children());
  });

  it("renders matching case", () => {
    const wrapper = mount(
      <Switch value={1}>
        <Case for={1}>case 1</Case>
        <Case for={2}>case 2</Case>
        <Default>default first</Default>
        <Default>default second</Default>
      </Switch>
    );

    assert.equal(wrapper.text(), "case 1");

    wrapper.setProps({ value: 2 });

    assert.equal(wrapper.text(), "case 2");

    wrapper.setProps({ value: 3 });

    assert.equal(wrapper.text(), "default first");
  });

  it("renders nested case", () => {
    const wrapper = mount(
      <Switch value={1}>
        <Case for={1}>
          <Switch value="a">
            <Case for="a">case a</Case>
            <Case for="b">case b</Case>
            <Default>nested default</Default>
          </Switch>
        </Case>
        <Case for={2}>case 2</Case>
        <Default>default</Default>
      </Switch>
    );

    assert.equal(wrapper.text(), "case a");

    wrapper.setProps({ value: 2 });

    assert.equal(wrapper.text(), "case 2");

    wrapper.setProps({ value: 3 });

    assert.equal(wrapper.text(), "default");
  });
});
