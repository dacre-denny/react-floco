import { assert } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { deferred, tick } from "./async";
import { If } from "../src/components/if";
import { Else } from "../src/components/else";
import { Loading } from "../src/components/loading";

describe("If", () => {
  afterEach(function() {
    sinon.restore();
  });

  it("should render nothing if no content specified", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(<If condition={false} />);

    assert.isFalse(warnStub.called);
    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: () => false });
    {
      assert.isFalse(warnStub.called);
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: true });
    {
      assert.isFalse(warnStub.called);
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: () => true });
    {
      assert.isFalse(warnStub.called);
      assert.isTrue(wrapper.isEmptyRender());
    }
  });

  it("should render nothing if null or undefined condition specified", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
      </If>
    );

    wrapper.setProps({ condition: null });
    {
      assert.isTrue(warnStub.called);
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: undefined });
    {
      assert.isTrue(warnStub.called);
      assert.isTrue(wrapper.isEmptyRender());
    }
  });

  it("should only render children when condition has value of true", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
      </If>
    );
    assert.isFalse(warnStub.called);
    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: true });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }
    wrapper.setProps({ condition: false });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.isTrue(wrapper.isEmptyRender());
    }
    wrapper.setProps({ condition: true });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }
  });

  it("should only render children when condition as function evaluates true", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <If condition={(): boolean => false}>
        <p>foo</p>
      </If>
    );

    assert.isFalse(warnStub.called);
    assert.isTrue(wrapper.isEmptyRender());

    wrapper.setProps({ condition: () => true });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }

    wrapper.setProps({ condition: () => false });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.isTrue(wrapper.isEmptyRender());
    }

    wrapper.setProps({ condition: () => true });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.lengthOf(wrapper.children(), 1);
      assert.strictEqual(wrapper.childAt(0).text(), "foo");
    }
  });

  it("should only render children of Else component(s) if condition is false", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <If condition={false}>
        <p>foo</p>
        <Else>bar</Else>
        <Else>was</Else>
        <p>here</p>
      </If>
    );

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "bar");
    assert.equal(wrapper.childAt(1).text(), "was");

    wrapper.setProps({ condition: false });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.lengthOf(wrapper.children(), 2);
      assert.equal(wrapper.childAt(0).text(), "bar");
      assert.equal(wrapper.childAt(1).text(), "was");
    }
  });

  it("should only render non-Else children if condition is true", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <If condition={true}>
        <p>foo</p>
        <Else>bar</Else>
        <Else>was</Else>
        <p>here</p>
      </If>
    );

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 2);
    assert.equal(wrapper.childAt(0).text(), "foo");
    assert.equal(wrapper.childAt(1).text(), "here");

    wrapper.setProps({ condition: true });
    wrapper.update();
    {
      assert.isFalse(warnStub.called);
      assert.lengthOf(wrapper.children(), 2);
      assert.equal(wrapper.childAt(0).text(), "foo");
      assert.equal(wrapper.childAt(1).text(), "here");
    }
  });

  it("should not affect rendering content in Else components that are not direct children", () => {
    const warnStub = sinon.stub(console, "warn");
    const wrapper = mount(
      <If condition={true}>
        <div>
          <p>foo</p>
          <Else>
            <p>bar</p>
            <Else>was</Else>
          </Else>
          <p>here</p>
        </div>
      </If>
    );

    assert.isFalse(warnStub.called);
    assert.strictEqual(wrapper.text(), "foobarwashere");
  });

  it("should render children when async condition resolved to true", async () => {
    const warnStub = sinon.stub(console, "warn");
    const asyncDeferred = deferred<boolean>();

    const wrapper = mount(
      <If condition={() => asyncDeferred.promise}>
        <Loading>loading</Loading>
        <p>foo</p>
      </If>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "loading");

    await asyncDeferred.resolve(true);

    wrapper.update();

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "foo");
  });

  it("should render children when async condition resolved to false", async () => {
    const warnStub = sinon.stub(console, "warn");
    const asyncDeferred = deferred<boolean>();

    const wrapper = mount(
      <If condition={() => asyncDeferred.promise}>
        <Loading>loading</Loading>
        <Else>bar</Else>
        <p>foo</p>
      </If>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "loading");

    await asyncDeferred.resolve(false);
    wrapper.update();

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "bar");
  });

  it("should render different result when async condition changed and resolved to true", async () => {
    const warnStub = sinon.stub(console, "warn");
    const asyncDeferredTrue = deferred<boolean>();
    const asyncDeferredFalse = deferred<boolean>();

    const wrapper = mount(
      <If condition={() => asyncDeferredTrue.promise}>
        <Loading>loading</Loading>
        <Else>bar</Else>
        <p>foo</p>
      </If>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "loading");

    await asyncDeferredTrue.resolve(true);
    wrapper.update();

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "foo");

    wrapper.setProps({ condition: () => asyncDeferredFalse.promise });
    wrapper.update();

    await tick();

    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "loading");

    await asyncDeferredFalse.resolve(false);
    wrapper.update();

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "bar");
  });

  it("should render different result when async condition changed to value true", async () => {
    const warnStub = sinon.stub(console, "warn");
    const asyncDeferred = deferred<boolean>();

    const wrapper = mount(
      <If condition={() => asyncDeferred.promise}>
        <Loading>loading</Loading>
        <Else>bar</Else>
        <p>foo</p>
      </If>
    );

    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "loading");

    await asyncDeferred.resolve(true);
    wrapper.update();

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "foo");

    wrapper.setProps({ condition: false });
    wrapper.update();

    assert.isFalse(warnStub.called);
    assert.lengthOf(wrapper.children(), 1);
    assert.strictEqual(wrapper.childAt(0).text(), "bar");
  });
});
