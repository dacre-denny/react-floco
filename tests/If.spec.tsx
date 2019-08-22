import { assert } from "chai";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { If, Else } from "../src/components/if";

describe("If", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("should render nothing if no content specified", () => {
    const assertNoChildren = () => {
      assert.isTrue(wrapper.isEmptyRender());
    };

    const wrapper = mount(<If condition={false} />);

    assertNoChildren();

    wrapper.setProps({ condition: () => false });

    assertNoChildren();

    wrapper.setProps({ condition: true });

    assertNoChildren();

    wrapper.setProps({ condition: () => true });

    assertNoChildren();
  });

  it("should render content when condition is true", () => {
    const assertNoChildren = () => {
      assert.isTrue(wrapper.isEmptyRender());
    };

    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
      </If>
    );

    assertNoChildren();

    wrapper.setProps({ condition: () => false });

    assertNoChildren();

    wrapper.setProps({ condition: true });

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.text(), "foo");

    wrapper.setProps({ condition: () => true });

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.text(), "foo");
  });

  it("should render children when condition is true", () => {
    const assertIfChildren = () => {
      const children = wrapper.children();
      assert.lengthOf(children, 2);
      assert.equal(children.at(0).text(), "foo");
      assert.equal(children.at(1).text(), "bar");
    };

    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
        <p>bar</p>
      </If>
    );

    wrapper.setProps({ condition: false });

    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: () => false });

    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: true });

    assertIfChildren();

    wrapper.setProps({ condition: () => true });

    assertIfChildren();
  });

  it("should render Else children if condition is false", () => {
    const assertElseChildren = () => {
      const children = wrapper.children();
      assert.lengthOf(children, 2);
      assert.equal(children.at(0).text(), "bar");
      assert.equal(children.at(1).text(), "was");
    };

    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
        <Else>bar</Else>
        <Else>was</Else>
        <p>here</p>
      </If>
    );

    assertElseChildren();

    wrapper.setProps({ condition: () => false });

    assertElseChildren();
  });

  it("should render non-Else children if condition is true", () => {
    const assertIfChildren = () => {
      const children = wrapper.children();

      assert.lengthOf(children, 2);
      assert.equal(children.at(0).text(), "foo");
      assert.equal(children.at(1).text(), "here");
    };

    const wrapper = mount(
      <If condition={true}>
        <p>foo</p>
        <Else>bar</Else>
        <Else>was</Else>
        <p>here</p>
      </If>
    );

    assertIfChildren();

    wrapper.setProps({ condition: () => true });

    assertIfChildren();
  });
});
