import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Repeat } from "../src/components/repeat";

describe("Repeat", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("should render number of children matching times prop", () => {
    const assertChildren = (count: number) => {
      assert.lengthOf(wrapper.children(), count);

      wrapper.children().forEach(child => {
        assert.strictEqual(child.text(), "foo");
        assert.strictEqual(child.type(), "p");
      });
    };

    const wrapper = mount(<Repeat times={5}>{props => <p {...props}>foo</p>}</Repeat>);

    assertChildren(5);

    wrapper.setProps({ times: 1 });

    assertChildren(1);

    wrapper.setProps({ times: 11 });

    assertChildren(11);

    wrapper.setProps({ times: 3 });

    assertChildren(3);
  });

  it("should render no children for zero times prop", () => {
    const assertNoChildren = () => {
      assert.isTrue(wrapper.isEmptyRender());
    };

    const wrapper = mount(<Repeat times={0}>{props => <p {...props}>foo</p>}</Repeat>);

    assertNoChildren();
  });

  it("should render no children for negative times prop", () => {
    const assertNoChildren = () => {
      assert.isTrue(wrapper.isEmptyRender());
    };

    const wrapper = mount(<Repeat times={-15}>{props => <p {...props}>foo</p>}</Repeat>);

    assertNoChildren();
  });

  it("should pass props through to rendered children", () => {
    const assertChildren = (count: number) => {
      assert.lengthOf(wrapper.children(), count);

      wrapper.children().forEach(child => {
        assert.strictEqual(child.text(), "bar");
        assert.strictEqual(child.type(), "p");
        assert.strictEqual(child.prop("foo"), "bar");
        assert.strictEqual(child.prop("was"), 1);
        assert.strictEqual(child.prop("here"), null);
      });
    };

    const wrapper = mount(
      <Repeat foo={"bar"} was={1} here={null} times={5}>
        {props => <p {...props}>{props.foo}</p>}
      </Repeat>
    );

    assertChildren(5);

    wrapper.setProps({ times: 7 });

    assertChildren(7);

    wrapper.setProps({ times: 21 });

    assertChildren(21);
  });
});
