import * as React from "react";
import { assert } from "chai";
import { isFunction, extractValue, isType } from "../src/helpers";

describe("The Helpers module", () => {
  describe("The isFunction helper", () => {
    it("Should return false if value is undefined", () => {
      assert.isFalse(isFunction(undefined));
    });

    it("Should return false if value is non-function", () => {
      assert.isFalse(isFunction(1));
      assert.isFalse(isFunction("foo"));
      assert.isFalse(isFunction({}));
      assert.isFalse(isFunction(null));
    });

    it("Should return true if value is function", () => {
      assert.isTrue(isFunction(Math.max));
    });
  });

  describe("The extractValue helper", () => {
    it("Should return false if value is undefined", () => {
      assert.isUndefined(extractValue(undefined));
    });

    it("Should return value if value is non-function", () => {
      const mockObject = {};

      assert.equal(extractValue(1), 1);
      assert.equal(extractValue("foo"), "foo");
      assert.equal(extractValue(mockObject), mockObject);
      assert.equal(extractValue(null), null);
      assert.equal(extractValue(true), true);
    });

    it("Should return result of function invocation if value is function", () => {
      const mockFunction = () => {};

      assert.equal(extractValue(() => 1), 1);
      assert.equal(extractValue(() => "foo"), "foo");
      assert.equal(extractValue(() => mockFunction), mockFunction);
    });
  });

  describe("The isType helper", () => {
    class MockComponentA extends React.Component {}
    class MockComponentB extends React.Component {}
    class MockComponentC extends React.Component {}

    it("Should return false if element undefined", () => {
      assert.isFalse(isType()(undefined));
      assert.isFalse(isType(MockComponentA)(undefined));
    });

    it("Should return false if no types specified", () => {
      const element = React.createElement(MockComponentA);
      assert.isFalse(isType()(element));
    });

    it("Should return false if no types specified match element", () => {
      const element = React.createElement(MockComponentA);
      assert.isFalse(isType(MockComponentB, MockComponentC)(element));
    });

    it("Should return true if types specified include element", () => {
      const element = React.createElement(MockComponentA);
      assert.isTrue(
        isType(MockComponentC, MockComponentA, MockComponentB)(element)
      );
    });
  });
});
