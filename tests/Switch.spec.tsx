import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Loading } from "../src/components/loading";
import { Case } from "../src/components/case";
import { Default } from "../src/components/default";
import { Switch } from "../src/components/switch";
import { deferred, tick } from "./async";

describe("The Switch component", () => {
  afterEach(function() {
    sinon.restore();
  });

  describe("When nothing is renderered", () => {
    it("Should render nothing if empty", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<Switch value={null} />);

      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.called);
    });

    it("Should render nothing and report warning if no supported children are present", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <div>foo</div>
          <p>bar</p>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.calledWith(`Switch: only Case or Default children are supported`));
    });

    it("Should render nothing and report warning if supported descendants are present", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <div>
            <Case for={1}>Case 1</Case>
          </div>
          <p>
            <Default>default case</Default>
          </p>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isTrue(warnStub.calledWith(`Switch: only Case or Default children are supported`));
    });

    it("Should render nothing if no Loading children present and async value is pending", async () => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if no Default children present and async value is rejected ", async () => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      await deferredValue.reject(new Error());
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if no matching Case or Default children present that match resolved async value", async () => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");

      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      await deferredValue.resolve(4);
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if no Case or Default children present that match value", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 2</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if Case or Default children present that match callback value", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={() => null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 2</Case>
        </Switch>
      );

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if undefined value and no Default children present", () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 2</Case>
        </Switch>
      );

      wrapper.setProps({ value: undefined });
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });
  });

  describe("When Default is renderered", () => {
    it("Should render Default children if no children of other child type present", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Default>foo</Default>
          <Default>bar</Default>
        </Switch>
      );

      assert.isTrue(wrapper.containsAllMatchingElements([<Default>foo</Default>, <Default>bar</Default>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render Default children for undefined value", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>foo</Case>
          <Default>bar</Default>
          <Default>foo</Default>
        </Switch>
      );

      wrapper.setProps({ value: undefined });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Default>foo</Default>, <Default>bar</Default>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render Default children if no Case children present that match value", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>foo</Case>
          <Case for={"bar"}>bar</Case>
          <Default>bar</Default>
          <Default>foo</Default>
        </Switch>
      );

      assert.isTrue(wrapper.containsAllMatchingElements([<Default>foo</Default>, <Default>bar</Default>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render Default children if no Case children present that match callback value", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={() => null}>
          <Case for={1}>foo</Case>
          <Case for={"bar"}>bar</Case>
          <Default>bar</Default>
          <Default>foo</Default>
        </Switch>
      );

      assert.isTrue(wrapper.containsAllMatchingElements([<Default>foo</Default>, <Default>bar</Default>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render Default children if async value rejected", async () => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={deferredValue.promiseFunction}>
          <Case for={null}>foo</Case>
          <Default>bar</Default>
          <Default>foo</Default>
        </Switch>
      );

      await deferredValue.reject(new Error());
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Default>foo</Default>, <Default>bar</Default>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });
  });

  describe("When Case is rendered", () => {
    it("Should render Case children that match value", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={1}>bar</Case>
        </Switch>
      );

      wrapper.setProps({ value: 1 });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Case for={1}>case 1</Case>, <Case for={1}>bar</Case>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render Case children that match resolved async value", async () => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={1}>bar</Case>
        </Switch>
      );

      wrapper.setProps({ value: deferredValue.promiseFunction });
      await deferredValue.resolve(1);
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Case for={1}>case 1</Case>, <Case for={1}>bar</Case>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render Case children that match callback value", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={1}>bar</Case>
          <Default>default case</Default>
        </Switch>
      );

      wrapper.setProps({ value: () => 2 });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Case for={2}>case 2</Case>]));
      assert.equal(wrapper.children().length, 1);
      assert.isFalse(warnStub.called);
    });

    it("Should render Case children that match mixed value types", async () => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={0}>
          <Case for={1}>case 1</Case>
          <Case for={true}>case true</Case>
          <Case for={"string"}>case string</Case>
          <Case for={null}>case null</Case>
        </Switch>
      );

      wrapper.setProps({ value: null });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Case for={null}>case null</Case>]));
      assert.equal(wrapper.children().length, 1);

      wrapper.setProps({ value: "string" });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Case for={"string"}>case string</Case>]));
      assert.equal(wrapper.children().length, 1);

      wrapper.setProps({ value: true });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Case for={true}>case true</Case>]));
      assert.equal(wrapper.children().length, 1);

      wrapper.setProps({ value: 1 });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Case for={1}>case 1</Case>]));
      assert.equal(wrapper.children().length, 1);

      assert.isFalse(warnStub.called);
    });

    it("Should render Case children that match updated value if prior async value not resolved", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      wrapper.setProps({ value: deferredValue.promiseFunction });
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      // Change value before promise resolved
      wrapper.setProps({ value: 3 });
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={3}>case 3</Case>));
      assert.equal(wrapper.children().length, 1);

      // Resolve promise after value prop updated
      await deferredValue.resolve(1);
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={3}>case 3</Case>));
      assert.equal(wrapper.children().length, 1);
    });

    it("Should render Case children that match updated value if prior async value not rejected", async () => {
      const warnStub = sinon.stub(console, "warn");
      const deferredValue = deferred();

      const wrapper = mount(
        <Switch value={null}>
          <Case for={1}>case 1</Case>
          <Case for={2}>case 2</Case>
          <Case for={3}>case 3</Case>
        </Switch>
      );

      wrapper.setProps({ value: deferredValue.promiseFunction });
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      // Change value before promise resolved
      wrapper.setProps({ value: 3 });
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={3}>case 3</Case>));
      assert.equal(wrapper.children().length, 1);

      // Reject promise after value prop updated
      await deferredValue.reject(new Error());
      wrapper.update();

      assert.isTrue(wrapper.containsMatchingElement(<Case for={3}>case 3</Case>));
      assert.equal(wrapper.children().length, 1);
    });
  });

  describe("When Loading is rendered", () => {
    it("Should render Loading children while async value pending", async () => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <Switch value={null}>
          <Loading>foo</Loading>
          <Loading>bar</Loading>
        </Switch>
      );

      wrapper.setProps({ value: deferredValue.promiseFunction });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Loading>foo</Loading>, <Loading>bar</Loading>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });
  });
});
