import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Loading } from "../src/components/loading";
import { Case } from "../src/components/case";
import { Default } from "../src/components/default";
import { Switch } from "../src/components/switch";
import { deferred, tick } from "./async";

describe("Switch", () => {
  afterEach(function() {
    sinon.restore();
  });

  describe("When nothing is rendered", () => {
    it("Should render nothing if no valid children", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={1}>
          <div>foo</div>
          <p>bar</p>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);
    });

    it("Should render nothing if undefined value", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={1}>
          <Loading>loading</Loading>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
        </Switch>
      );

      wrapper.setProps({ value: undefined });
      assert.isEmpty(wrapper.children());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if null value", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={1}>
          <Loading>loading</Loading>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
        </Switch>
      );

      wrapper.setProps({ value: null });
      console.log("4444444");

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render Default if present on undefined value prop", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={true}>
          <Default>default case</Default>
        </Switch>
      );

      wrapper.setProps({ value: undefined });
      assert.equal(wrapper.text(), "default case");
      assert.equal(wrapper.childAt(0).text(), "default case");
      assert.isFalse(warnStub.called);
    });

    it("Should render Default if present on null value prop", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={true}>
          <Default>default case</Default>
        </Switch>
      );

      wrapper.setProps({ value: null });
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "default case");
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if no matching Case and no Default", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={0}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 2</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if empty", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Switch value={1} />);

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing while promise in pending state", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      await deferredValue.resolve(1);
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={1}>case 1</Case>));
      assert.equal(wrapper.children().length, 1);
    });

    it("Should render nothing if no Default and promise rejected", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      await deferredValue.reject(new Error());
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if no matching Case and promise resolved", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      await deferredValue.resolve(1);
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });
  });

  describe("When Case is rendered", () => {});

  describe("When Default is rendered", () => {
    it("Should render Default if no Case match on value prop", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={3}>
          <Loading>loading</Loading>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Default>default case</Default>
        </Switch>
      );

      assert.isTrue(wrapper.containsMatchingElement(<Default>default case</Default>));
      assert.equal(wrapper.children().length, 1);
      assert.isFalse(warnStub.called);
    });

    it("Should render Default children if no Case match on value prop", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={3}>
          <Loading>loading</Loading>
          <Default>default case 1</Default>
          <Case for={1}>case 1</Case>
          <Default>default case 2</Default>
          <Case for={2}>case 2</Case>
          <Default>default case 3</Default>
        </Switch>
      );

      assert.isTrue(wrapper.containsAllMatchingElements([<Default>default case 1</Default>, <Default>default case 2</Default>, <Default>default case 3</Default>]));
      assert.equal(wrapper.children().length, 3);
      assert.isFalse(warnStub.called);
    });
  });

  describe("Edge cases for async value prop", () => {
    it("Value changes before promise resolves do not interrupt rendering", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      wrapper.setProps({ value: 3 });
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={3}>case 3</Case>));
      assert.equal(wrapper.children().length, 1);

      /* Resolve promise after value prop updated */
      await deferredValue.resolve(1);
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={3}>case 3</Case>));
      assert.equal(wrapper.children().length, 1);
    });

    it("Should render Loading if present while promise in pending state", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Loading>loading</Loading>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 2</Case>
        </Switch>
      );

      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Loading>loading</Loading>));
      assert.isFalse(warnStub.called);

      await deferredValue.resolve(1);
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={1}>case 1</Case>));
      assert.equal(wrapper.children().length, 1);
    });

    it("Should render Default if promise rejected", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 2</Case>
          <Default>default</Default>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      await deferredValue.reject(new Error());
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Default>default</Default>));
      assert.equal(wrapper.children().length, 1);
    });

    it("Should render matching Case after promise resolved", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 2</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      await deferredValue.resolve(1);
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={1}>case 1</Case>));
      assert.equal(wrapper.children().length, 1);
    });
  });

  describe("Case matching behavior", () => {
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
      wrapper.update();
      {
        assert.lengthOf(wrapper.children(), 1);
        assert.equal(wrapper.childAt(0).prop("for"), 2);
        assert.equal(wrapper.childAt(0).text(), "case 2");
        assert.isFalse(warnStub.called);
      }

      wrapper.setProps({ value: 1 });
      wrapper.update();
      {
        assert.lengthOf(wrapper.children(), 1);
        assert.equal(wrapper.childAt(0).prop("for"), 1);
        assert.equal(wrapper.childAt(0).text(), "case 1");
        assert.isFalse(warnStub.called);
      }
    });
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
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 2);
      assert.equal(wrapper.childAt(0).text(), "first case 2");
      assert.equal(wrapper.childAt(1).text(), "second case 2");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 1 });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "first case 1");
      assert.isFalse(warnStub.called);
    }
  });

  it("should render matching case for boolean value", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={true}>
        <Case for={true}>case true</Case>
        <Case for={false}>case false</Case>
        <Default>default case</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).text(), "case true");
    assert.isFalse(warnStub.called);

    wrapper.setProps({ value: false });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "case false");
      assert.isFalse(warnStub.called);
    }
  });

  it("should render default if no boolean value match", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={true}>
        <Case for={false}>case false</Case>
        <Default>default case</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).text(), "default case");
    assert.isFalse(warnStub.called);
  });

  it("should render matching case for string value", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={"foo"}>
        <Case for={"foo"}>case foo</Case>
        <Case for={"bar"}>case bar</Case>
        <Default>default case</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).text(), "case foo");
    assert.isFalse(warnStub.called);

    wrapper.setProps({ value: "bar" });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "case bar");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: false });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "default case");
      assert.isFalse(warnStub.called);
    }
  });

  it("should render matching case for mixed value types", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <Switch value={1}>
        <Case for={"foo"}>case foo</Case>
        <Case for={2}>case 2</Case>
        <Case for={false}>case false</Case>
        <Default>default case</Default>
      </Switch>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.equal(wrapper.childAt(0).text(), "default case");
    assert.isFalse(warnStub.called);

    wrapper.setProps({ value: "foo" });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "case foo");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 2 });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "case 2");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: false });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "case false");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: {} });
    wrapper.update();
    {
      assert.lengthOf(wrapper.children(), 1);
      assert.equal(wrapper.childAt(0).text(), "default case");
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
    wrapper.update();
    {
      assert.equal(wrapper.text(), "case 2");
      assert.isFalse(warnStub.called);
    }

    wrapper.setProps({ value: 3 });
    wrapper.update();
    {
      assert.equal(wrapper.text(), "default");
      assert.isFalse(warnStub.called);
    }
  });
});
