import { Result } from "../helper/result";

/* eslint-disable @typescript-eslint/no-this-alias */
export const ArrayExtensions = () => {
  if ([].indexOfR === undefined) {
    Array.prototype.indexOfR = function (element) {
      if (this.indexOf(element) === -1) {
        return Result.error(undefined);
      }
      return Result.ok(this);
    };
  }
  if ([].whereOne === undefined) {
    Array.prototype.whereOne = function (predicate) {
      return this.filter(predicate).atR(0);
    }
  }
  if ([].atR === undefined) {
    Array.prototype.atR = function (index) {
      if (index === undefined) {
        return Result.error(undefined);
      }
      const result = this.at(index);
      if (result) {
        return Result.ok(result);
      }
      return Result.error(undefined);
    };
  }
  if ([].equals === undefined) {
    Array.prototype.equals = function (array, strict = true) {
      if (!array) return false;

      if (arguments.length === 1) strict = true;

      if (this.length !== array.length) return false;

      for (let i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
          if (!this[i].equals(array[i], strict)) return false;
        } else if (strict && this[i] !== array[i]) {
          return false;
        } else if (!strict) {
          return this.sort().equals(array.sort(), true);
        }
      }
      return true;
    };
  }
  if ([].replacePropIndex === undefined) {
    Array.prototype.replacePropIndex = function (property, index) {
      return this.map((element, i) => {
        if (i === index) {
          element = Object.assign(element, property);
        }
        return element;
      });
    };
  }
  if ([].someR === undefined) {
    Array.prototype.someR = function (predicate) {
      if (this.some(predicate)) {
        return Result.error(undefined);
      }
      return Result.ok(this);
    };
  }
  if ([].lastElement === undefined) {
    Array.prototype.lastElement = function () {
      const instanceCheck = this;
      if (instanceCheck === undefined) {
        return undefined;
      } else {
        const instance = instanceCheck as [];
        return instance[instance.length - 1];
      }
    };
  }
  if ([].isEmpty === undefined) {
    Array.prototype.isEmpty = function () {
      return this.length === 0;
    };
  }
  if ([].isNotEmpty === undefined) {
    Array.prototype.isNotEmpty = function () {
      return this.length !== 0;
    };
  }
  if ([].hasIncludeElement === undefined) {
    Array.prototype.hasIncludeElement = function (element) {
      return this.indexOf(element) !== -1;
    };
  }
  if ([].repeat === undefined) {
    Array.prototype.repeat = function (quantity) {
      return Array(quantity).fill(this).flat(1);
    };
  }
  if ([].rFind === undefined) {
    Array.prototype.rFind = function (predicate) {
      const result = this.find(predicate as any);
      if (result === undefined) {
        return Result.error(undefined);
      }
      return Result.ok(result);
    };
  }
  if ([].maxLength === undefined) {
    Array.prototype.maxLength = function (length) {
      if (this.length > length) {
        return this;
      } else {
        return this.slice(0, length);
      }
    };
  }
  if ([].add === undefined) {
    Array.prototype.add = function (element) {
      this.push(element);
      return this;
    };
  }
  if ([].updateAll === undefined) {
    Array.prototype.updateAll = function (element) {
      return this.map((el) => Object.assign(el, element));
    };
  }
};
