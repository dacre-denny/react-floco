import { assert } from "chai";
import { mount, CommonWrapper } from "enzyme";
import * as React from "react";
import Components from "../src/components";
import { Switch, Default, Case } from "../src/components/switch";
import * as API from "../src/index";
import * as sinon from "sinon";

describe("Switch", () => {
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

  it("renders nothing if not matching case and no default", () => {
    const wrapper = mount(
      <Switch value={0}>
        <Case for={1}>case 1</Case>
        <Case for={2}>case 2</Case>
        <Case for={3}>case 2</Case>
      </Switch>
    );

    assert.isEmpty(wrapper.children());
  });

  it("renders matching case or default if no match", () => {
    const wrapper = mount(
      <Switch value={0}>
        <Case for={1}>case 1</Case>
        <Case for={2}>case 2</Case>
        <Default>default case</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).text(), "default case");

    wrapper.setProps({ value: 2 });

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).prop("for"), 2);
    assert.equal(wrapper.childAt(0).text(), "case 2");

    wrapper.setProps({ value: 1 });

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).prop("for"), 1);
    assert.equal(wrapper.childAt(0).text(), "case 1");
  });

  it("renders multiple matching cases or multiple defaults if no match", () => {
    const wrapper = mount(
      <Switch value={0}>
        <Case for={1}>first case 1</Case>
        <Default>first default case</Default>
        <Case for={2}>first case 2</Case>
        <Case for={2}>second case 2</Case>
        <Default>second default case</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "first default case");
    assert.equal(wrapper.childAt(1).text(), "second default case");

    wrapper.setProps({ value: 2 });

    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "first case 2");
    assert.equal(wrapper.childAt(1).text(), "second case 2");

    wrapper.setProps({ value: 1 });

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).text(), "first case 1");
  });

  it("renders nested case", () => {
    const NestedSwitches = (props: any) => (
      <Switch value={props.value}>
        <Case for={1}>
          <Switch value={props.nestedValue}>
            <Case for="a">case a</Case>
            <Case for="b">case b</Case>
            <Default>nested default</Default>
          </Switch>
        </Case>
        <Case for={2}>case 2</Case>
        <Default>default</Default>
      </Switch>
    );

    const wrapper = mount(<NestedSwitches />);

    wrapper.setProps({ value: 1, nestedValue: "a" });

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.text(), "case a");

    wrapper.setProps({ value: 1, nestedValue: "b" });

    assert.equal(wrapper.text(), "case b");

    wrapper.setProps({ value: 2 });

    assert.equal(wrapper.text(), "case 2");

    wrapper.setProps({ value: 3 });

    assert.equal(wrapper.text(), "default");
  });
});
