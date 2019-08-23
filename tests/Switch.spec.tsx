import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Case, Default, Switch } from "../src/components/switch";

describe("Switch", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("should render nothing if empty", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(<Switch value={1} />);

    assert.isEmpty(wrapper.children());
    assert.isFalse(warnStub.called);
  });

  it("should render nothing if no case or default", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={1}>
        <div>foo</div>
        <p>bar</p>
      </Switch>
    );

    assert.isEmpty(wrapper.children());
    assert.isTrue(warnStub.called);
  });

  it("should render nothing if no matching case and no default", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={0}>
        <Case for={1}>case 1</Case>
        <Case for={2}>case 2</Case>
        <Case for={3}>case 2</Case>
      </Switch>
    );

    assert.isEmpty(wrapper.children());
    assert.isFalse(warnStub.called);
  });

  it("should render matching case or default if no match", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={0}>
        <Case for={1}>case 1</Case>
        <Case for={2}>case 2</Case>
        <Default>default case</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).text(), "default case");
    assert.isFalse(warnStub.called);

    wrapper.setProps({ value: 2 });
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).prop("for"), 2);
      assert.equal(wrapper.childAt(0).text(), "case 2");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 1 });
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).prop("for"), 1);
      assert.equal(wrapper.childAt(0).text(), "case 1");
      assert.isFalse(warnStub.called);
    }
  });

  it("should render multiple matching cases or multiple defaults if no match", () => {
    const warnStub = sinon.stub(console, "warn");
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
    assert.isFalse(warnStub.called);

    wrapper.setProps({ value: 2 });
    {
      assert.lengthOf(wrapper.children(), 2);
      assert.equal(wrapper.childAt(0).text(), "first case 2");
      assert.equal(wrapper.childAt(1).text(), "second case 2");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 1 });
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "first case 1");
      assert.isFalse(warnStub.called);
    }
  });

  it("should render nested case", () => {
    const warnStub = sinon.stub(console, "warn");
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
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.text(), "case a");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 1, nestedValue: "b" });
    {
      assert.equal(wrapper.text(), "case b");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 2 });
    {
      assert.equal(wrapper.text(), "case 2");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 3 });
    {
      assert.equal(wrapper.text(), "default");
      assert.isFalse(warnStub.called);
    }
  });
});
