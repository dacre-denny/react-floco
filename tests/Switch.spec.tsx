import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Switch } from "../src/components/switch";
import { Default } from "../src/components/default";
import { Case } from "../src/components/case";

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

  it("should not affect rendering content in Case or Default components that are not direct children", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={1}>
        <Case for={1}>
          <Case for="a">
            <p>case a</p>
            <Case for="b">case b</Case>
            <Default>nested default</Default>
          </Case>
        </Case>
        <Case for={2}>case 2</Case>
        <Default>default</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.text(), "case acase bnested default");
    assert.isFalse(warnStub.called);

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
