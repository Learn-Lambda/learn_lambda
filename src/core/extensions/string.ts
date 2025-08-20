import { Result } from "../helper/result";

/* eslint-disable no-extend-native */
export const StringExtensions = () => {
  if ("".isEmpty === undefined) {
    String.prototype.isEmpty = function () {
      return this.length === 0;
    };
  }
  if ("".isNotEmpty === undefined) {
    String.prototype.isNotEmpty = function () {
      return this.length !== 0;
    };
  }
  if ("".isNotEmptyR === undefined) {
    String.prototype.isNotEmptyR = function () {
      if (this.isEmpty()) {
        return Result.error(undefined);
      }
      return Result.ok(String(this));
    };
  }
  if ("".isEqualR === undefined) {
    String.prototype.isEqualR = function (str) {
      if (this === str) {
        return Result.ok(String(this));
      }
      return Result.error(undefined);
    };
  }
  if ("".replaceMany === undefined) {
    String.prototype.replaceMany = function (searchValues: string[], replaceValue: string) {
      let result = this as string;
      searchValues.forEach((el) => {
        result = result.replaceAll(el, replaceValue);
      });
      return result;
    };
  }
  if ("".isEqual === undefined) {
    String.prototype.isEqual = function (str: string) {
      return this === str;
    };
  }
  if ("".isEqualMany === undefined) {
    String.prototype.isEqualMany = function (str: string[]) {
      for (const el of str) {
        if (el === this) {
          return true;
        }
      }
      return false;
    };
  }
  if ("".hasPattern === undefined) {
    String.prototype.hasPattern = function (pattern) {
      return new RegExp(pattern).test(this as string);
    };
  }
  if ("".hasNoPattern === undefined) {
    String.prototype.hasNoPattern = function (pattern) {
      return !this.hasPattern(pattern);
    };
  }
  if ("".divideByIndex === undefined) {
    String.prototype.divideByIndex = function (index) {
      if (this.at(index) === undefined) {
        return [];
      }

      return [this.slice(0, index), this.slice(index + 1, this.length)];
    };
  }
};
