import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Repeat } from "../src/components/repeat";

describe("Repeat", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("should render nothing if no content specified", () => {
    const assertNoChildren = () => {
      assert.isTrue(wrapper.isEmptyRender());
    };

    const wrapper = mount(<Repeat times={5} />);

    assertNoChildren();

    wrapper.setProps({ times: 1 });

    assertNoChildren();

    wrapper.setProps({ times: 41 });

    assertNoChildren();

    wrapper.setProps({ times: 22 });

    assertNoChildren();
  });

  it("should render number of children matching times prop", () => {
    const assertNoChildren = (count: number) => {
      assert.lengthOf(wrapper.children(), count);
      assert.isTrue(wrapper.children().everyWhere(child => child.text() === "foo"));
    };

    const wrapper = mount(<Repeat times={5}>foo</Repeat>);

    assertNoChildren(5);

    wrapper.setProps({ times: 1 });

    assertNoChildren(1);

    wrapper.setProps({ times: 11 });

    assertNoChildren(11);

    wrapper.setProps({ times: 3 });

    assertNoChildren(3);
  });

  it("should render no children for zero times prop", () => {
    const assertNoChildren = () => {
      assert.isTrue(wrapper.isEmptyRender());
    };

    const wrapper = mount(<Repeat times={0}>foo</Repeat>);

    assertNoChildren();
  });

  it("should render no children for negative times prop", () => {
    const assertNoChildren = () => {
      assert.isTrue(wrapper.isEmptyRender());
    };

    const wrapper = mount(<Repeat times={-15}>foo</Repeat>);

    assertNoChildren();

    wrapper.setProps({ times: -1 });

    assertNoChildren();

    wrapper.setProps({ times: -7 });

    assertNoChildren();
  });
});
