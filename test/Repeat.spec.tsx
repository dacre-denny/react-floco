import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Repeat } from "../src/components/repeat";

describe("The Repeat component", (): void => {
  afterEach((): void => {
    sinon.restore();
  });

  describe("When nothing is renderered", (): void => {
    it("Should render nothing if no children render function provided", (): void => {
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
      assert.isTrue(warnStub.calledWith(`Repeat: children prop must be valid function`));
    });

    it("Should render nothing if invalid times value type provide", (): void => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Repeat times={1}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

      wrapper.setProps({ times: null });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.calledWith(`Repeat: times prop must be valid number`));
      warnStub.resetHistory();

      wrapper.setProps({ times: undefined });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.calledWith(`Repeat: times prop must be valid number`));
      warnStub.resetHistory();

      wrapper.setProps({ times: "foo" });
      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.calledWith(`Repeat: times prop must be valid number`));
      warnStub.resetHistory();
    });

    it("should render no children for zero times prop", (): void => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Repeat times={0}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("should render no children for negative times prop", (): void => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Repeat times={-15}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.calledWith(`Repeat: times prop must non-negative`));
    });
  });

  it("should render number of children matching times prop", (): void => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(<Repeat times={7}>{(props): React.ReactElement => <p {...props}>foo</p>}</Repeat>);

    assert.isTrue(wrapper.containsAllMatchingElements([<p>foo</p>]));
    assert.lengthOf(wrapper.children(), 7);
    assert.isFalse(warnStub.called);
  });

  it("should pass props through to rendered children", (): void => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Repeat foo={"bar"} was={1} here={null} times={5}>
        {(props): React.ReactElement => <p {...props}>{props.foo}</p>}
      </Repeat>
    );

    const mockProps = { foo: "bar", was: 1, here: null };
    assert.isTrue(wrapper.containsAllMatchingElements([<p {...mockProps}>bar</p>]));
    assert.lengthOf(wrapper.children(), 5);
    assert.isFalse(warnStub.called);
  });
});
