import { Result } from "../helper/result";

export const NumberExtensions = () => {
  if (Number().fromArray === undefined) {
    Number.prototype.fromArray = function () {
      return Array.from(this.toString()).map((el) => Number(el));
    };
  }
  if (Number().toPx === undefined) {
    Number.prototype.toPx = function () {
      return String(this) + "px";
    };
  }
  if (Number().unixFromDate === undefined) {
    Number.prototype.unixFromDate = function () {
      const date = new Date(Number(this) * 1000);
      return `${date.getUTCFullYear()}.${date.getMonth()}.${date.getDay()}  ${date.getHours()}:${date.getMinutes()}`;
    };
  }
  if (Number().isEqualR === undefined) {
    Number.prototype.isEqualR = function (num) {
      if(this === num) {
        return Result.ok(undefined)
      }
      return Result.error(undefined)
    };
  }
  if (Number().isValid === undefined) {
    Number.prototype.isValid = function (str: string) {
      return !isNaN(Number(str));
    };
  }
  if (Number().randRange === undefined) {
    Number.prototype.randRange = function (min, max) {
      return Math.random() * (max - min) + min;
    };
  }
  if (Number().isPositive === undefined) {
    Number.prototype.isPositive = function () {
      return Math.sign(Number(this)) === 1;
    };
  }
  if (Number().isNegative === undefined) {
    Number.prototype.isNegative = function () {
      return !this.isPositive();
    };
  }
  if (Number().isEven === undefined) {
    Number.prototype.isEven = function () {
      return Number(this) % 2 === 0;
    };
  }
  if (Number().isOdd === undefined) {
    Number.prototype.isOdd = function () {
      return !this.isEven();
    };
  }
};
