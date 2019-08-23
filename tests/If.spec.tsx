import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Else, If } from "../src/components/if";

describe("If", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("should render nothing if no content specified", () => {
    const wrapper = mount(<If condition={false} />);

    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: () => false });
    {
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: true });
    {
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: () => true });
    {
      assert.isTrue(wrapper.isEmptyRender());
    }
  });

  it("should only render children when condition has value of true", () => {
    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
      </If>
    );

    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: true });
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }

    wrapper.setProps({ condition: false });
    {
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: true });
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }
  });

  it("should only render children when condition as function evaluates true", () => {
    const wrapper = mount(
      <If condition={() => false}>
        <p>foo</p>
      </If>
    );

    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: () => true });
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }

    wrapper.setProps({ condition: () => false });
    {
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: () => true });
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }
  });

  it("should only render children of Else if condition is false", () => {
    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
        <Else>bar</Else>
        <Else>was</Else>
        <p>here</p>
      </If>
    );

    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "bar");
    assert.equal(wrapper.childAt(1).text(), "was");

    wrapper.setProps({ condition: () => false });

    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "bar");
    assert.equal(wrapper.childAt(1).text(), "was");
  });

  it("should only render children of non-Else if condition is true", () => {
    const wrapper = mount(
      <If condition={true}>
        <p>foo</p>
        <Else>bar</Else>
        <Else>was</Else>
        <p>here</p>
      </If>
    );

    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "foo");
    assert.equal(wrapper.childAt(1).text(), "here");

    wrapper.setProps({ condition: () => true });

    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "foo");
    assert.equal(wrapper.childAt(1).text(), "here");
  });
});
