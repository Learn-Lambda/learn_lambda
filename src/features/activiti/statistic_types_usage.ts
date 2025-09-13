export interface StatisticTypesUsage {
  id: number;
  userId: number;
  jsonStatisticUsage: JSONStatisticUsage;
}

export interface JSONStatisticUsage {
  String: { [key: string]: StatisticUsage };
  Array: { [key: string]: StatisticUsage };
  Object: Object;
  Map: { [key: string]: StatisticUsage };
  Set: { [key: string]: StatisticUsage };
  Number: Number;
  Boolean: Boolean;
  RegExp: RegExp;
}

export interface StatisticUsage {
  usageSingly: number;
  aiUsage: number;
  usageTotal: number;
  target: number;
  importance: number;
}

export interface Boolean {}

export interface Number {
  toExponential: StatisticUsage;
  toFixed: StatisticUsage;
  toPrecision: StatisticUsage;
  parseFloat: StatisticUsage;
  parseInt: StatisticUsage;
  isFinite: StatisticUsage;
  isInteger: StatisticUsage;
  isNaN: StatisticUsage;
  constructorUsage: StatisticUsage;
}

export interface Object {
  assign: StatisticUsage;
  keys: StatisticUsage;
  entries: StatisticUsage;
  freeze: StatisticUsage;
  seal: StatisticUsage;
  hasOwn: StatisticUsage;
  parenthesisAccessOperator: StatisticUsage;
}

export interface RegExp {
  test: StatisticUsage;
  exec: StatisticUsage;
}
