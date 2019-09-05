import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Repeat } from "../src/components/repeat";

describe("Repeat", () => {
  afterEach(function() {
    sinon.restore();
  });

  describe("When nothing is renderered", () => {
    it("Should render nothing if no children render function provided", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Repeat times={1} />);

      wrapper.setProps({ times: null });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);

      wrapper.setProps({ times: undefined });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);

      wrapper.setProps({ times: "foo" });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);
    });

    it("Should render nothing if invalid times value type provide", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Repeat times={1}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

      wrapper.setProps({ times: null });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);

      wrapper.setProps({ times: undefined });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);

      wrapper.setProps({ times: "foo" });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);
    });

    it("should render no children for zero times prop", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Repeat times={0}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("should render no children for negative times prop", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Repeat times={-15}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);
    });
  });

  it("should render number of children matching times prop", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(<Repeat times={7}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

    assert.lengthOf(wrapper.children(), 7);
    assert.isFalse(warnStub.called);

    wrapper.children().forEach(child => {
      assert.strictEqual(child.text(), "foo");
      assert.strictEqual(child.type(), "p");
    });
  });

  it("should pass props through to rendered children", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Repeat foo={"bar"} was={1} here={null} times={5}>
        {(props): React.ReactElement => <p {...props}>{props.foo}</p>}
      </Repeat>
    );

    assert.lengthOf(wrapper.children(), 5);
    assert.isFalse(warnStub.called);

    wrapper.children().forEach(child => {
      assert.strictEqual(child.text(), "bar");
      assert.strictEqual(child.type(), "p");
      assert.strictEqual(child.prop("foo"), "bar");
      assert.strictEqual(child.prop("was"), 1);
      assert.strictEqual(child.prop("here"), null);
    });
  });
});
