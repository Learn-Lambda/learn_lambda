import { Result } from "../helper/result";
import { ArrayExtensions } from "./array";
import { DateExtensions } from "./date";
import { MapExtensions } from "./map";
import { NumberExtensions } from "./number";
import { StringExtensions } from "./string";

export type CallBackVoidFunction = <T>(value: T) => void;

export type CallBackStringVoidFunction = (value: string) => void;
export type CallBackEventTarget = (value: EventTarget) => void;
export type OptionalProperties<T> = {
  [P in keyof T]?: T[P];
};

declare global {
  interface Array<T> {
    // @strict: The parameter is determined whether the arrays must be exactly the same in content and order of this relationship or simply follow the same requirements.
    equals(array: Array<T>, strict: boolean): boolean;
    lastElement(): T | undefined;
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    hasIncludeElement(element: T): boolean;
    repeat(quantity: number): Array<T>;
    rFind<T>(predicate: (value: T, index: number, obj: never[]) => boolean, thisArg?: any): Result<void, T>;
    maxLength(length: number): Array<T>;
    add(element: T): Array<T>;
    indexOfR(element: T): Result<void, Array<T>>;
    replacePropIndex(property: Partial<T>, index: number): T[];
    someR(predicate: (value: T) => boolean): Result<void, Array<T>>;
    updateAll(value: Partial<T>): Array<T>;
    atR(index: number | undefined): Result<void, T>;
    whereOne(predicate: (value: T) => boolean): Result<void, T>;
  }
  interface Date {
    formatDate(): string;
    fromUnixDate(unix: number): Date;
  }
  interface Number {
    fromArray(): number[];
    toPx(): string;
    unixFromDate(): string;
    isValid(str: string): boolean;
    randRange(min: number, max: number): number;
    isPositive(): boolean;
    isNegative(): boolean;
    isEven(): boolean;
    isOdd(): boolean;
    isEqualR(number: number): Result<void, void>;
  }

  interface String {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    isNotEmptyR(): Result<void, string>;
    replaceMany(searchValues: string[], replaceValue: string): string;
    isEqual(str: string): boolean;
    isEqualMany(str: string[]): boolean;
    hasPattern(pattern: string): boolean;
    hasNoPattern(pattern: string): boolean;
    divideByIndex(index: number): string[];
    isEqualR(str: string): Result<void, string>;
  }

  interface Map<K, V> {
    addValueOrMakeCallback(key: K, value: V, callBack: CallBackVoidFunction): void;
    getKeyFromValueIsExists(value: V): K | undefined;
    overrideValue(key: K, value: OptionalProperties<V>): void;
    keysToJson(): string;
    toArray(): V[];
    toArrayEntries(): { key: K; value: V }[];
    getPredicateKey(callBack: (value: V) => boolean): K[];
    incrementValue(key: K): void;
  }
  interface Boolean {
    r(): Result<void, void>;
  }
}
export const extensions = () => {
  StringExtensions();
  ArrayExtensions();
  NumberExtensions();
  MapExtensions();
  DateExtensions();
};
