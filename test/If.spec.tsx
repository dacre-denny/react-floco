import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { Else } from "../src/components/else";
import { If } from "../src/components/if";
import { Loading } from "../src/components/loading";
import { deferred } from "./async";

describe("The If component", (): void => {
  afterEach((): void => {
    sinon.restore();
  });

  describe("When nothing is renderered", (): void => {
    it("Should render nothing if empty", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(<If condition={null} />);

      wrapper.setProps({ condition: false });
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);

      wrapper.setProps({ condition: true });
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if condition false and no Else children present", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <div>foo</div>
          <div>barr</div>
        </If>
      );

      wrapper.setProps({ condition: false });
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if condition true and only Else children present ", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <Else>foo</Else>
          <Else>bar</Else>
        </If>
      );

      wrapper.setProps({ condition: true });
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });

    it("Should render nothing if condition not pending and only Loading children present ", async (): Promise<void> => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <Loading>foo</Loading>
          <Loading>bar</Loading>
        </If>
      );

      wrapper.setProps({ condition: deferredValue.promise });
      await deferredValue.resolve(true);
      wrapper.update();

      assert.isTrue(wrapper.isEmptyRender());
      assert.isFalse(warnStub.called);
    });
  });

  describe("When Else is rendered", (): void => {
    it("Should render Else children if condition is false", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <p>foo</p>
          <Else>bar</Else>
          <Else>was</Else>
          <p>here</p>
        </If>
      );

      wrapper.setProps({ condition: false });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Else>bar</Else>, <Else>was</Else>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render Else children when async condition resolved to false", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const asyncDeferred = deferred<boolean>();
      const wrapper = mount(
        <If condition={asyncDeferred.promiseFunction}>
          <Loading>loading</Loading>
          <Else>bar</Else>
          <p>foo</p>
        </If>
      );

      await asyncDeferred.resolve(false);
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Else>bar</Else>]));
      assert.lengthOf(wrapper.children(), 1);
      assert.isFalse(warnStub.called);
    });

    it("Should render Else children when async condition rejected", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const asyncDeferred = deferred<boolean>();
      const wrapper = mount(
        <If condition={asyncDeferred.promiseFunction}>
          <Loading>loading</Loading>
          <Else>bar</Else>
          <p>foo</p>
        </If>
      );

      await asyncDeferred.reject(new Error());
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Else>bar</Else>]));
      assert.lengthOf(wrapper.children(), 1);
      assert.isFalse(warnStub.called);
    });
  });

  describe("When Loading is rendered", (): void => {
    it("Should render Loading children while async condition pending", async (): Promise<void> => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <Loading>foo</Loading>
          <Loading>bar</Loading>
        </If>
      );

      wrapper.setProps({ condition: deferredValue.promiseFunction });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<Loading>foo</Loading>, <Loading>bar</Loading>]));
      assert.equal(wrapper.children().length, 2);
      assert.isFalse(warnStub.called);
    });
  });

  describe("When non Else and non Loading children are rendered", (): void => {
    it("Should render non-Else children when condition has value of true", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <p>foo</p>
          <div>bar</div>
        </If>
      );

      wrapper.setProps({ condition: true });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<p>foo</p>, <div>bar</div>]));
      assert.lengthOf(wrapper.children(), 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render non-Else children when condition has callback value of true", async (): Promise<void> => {
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <p>foo</p>
          <div>bar</div>
        </If>
      );

      wrapper.setProps({ condition: (): boolean => true });
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<p>foo</p>, <div>bar</div>]));
      assert.lengthOf(wrapper.children(), 2);
      assert.isFalse(warnStub.called);
    });

    it("Should render non-Else children when async condition resolves true", async (): Promise<void> => {
      const deferredValue = deferred();
      const warnStub = sinon.stub(console, "warn");
      const wrapper = mount(
        <If condition={null}>
          <p>foo</p>
          <div>bar</div>
        </If>
      );

      wrapper.setProps({ condition: deferredValue.promiseFunction });
      wrapper.update();

      await deferredValue.resolve(true);
      wrapper.update();

      assert.isTrue(wrapper.containsAllMatchingElements([<p>foo</p>, <div>bar</div>]));
      assert.lengthOf(wrapper.children(), 2);
      assert.isFalse(warnStub.called);
    });
  });
});
