/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-namespace */
 

function isAsyncFn(fn: Function) {
  return fn.constructor.name === "AsyncFunction";
}

function isResult(value: unknown): value is Result<any, any, any> {
  return value instanceof Ok || value instanceof Err;
}

interface SyncThenable {
  isSync: true;
  then<Fn extends () => Promise<any>>(cb: Fn): ReturnType<Fn>;
  then<Fn extends () => any>(cb: Fn): SyncThenable;
}

 
function syncThenable(): SyncThenable {
  function then<Fn extends () => Promise<any>>(cb: Fn): ReturnType<Fn>;
  function then<Fn extends () => any>(cb: Fn): SyncThenable;
  function then(cb: any) {
    const result = cb();
    if (result instanceof Promise) {
      return result;
    }

    return syncThenable();
  }

  return {
    isSync: true,
    then,
  };
}

function forEachValueThunkOrPromise<T>(
  items: unknown[],
  execFn: (value: T) => boolean,
  foldFn: () => unknown
) {
  let shouldBreak = false;

  const result: any = items.reduce((prev: { then: Function }, valueOrThunk) => {
    return prev.then(() => {
      if (shouldBreak) {
        return null;
      }

      function run(value: T) {
        const isSuccess = execFn(value);
        if (!isSuccess) {
          shouldBreak = true;
        }
      }

      const valueOrPromise =
        typeof valueOrThunk === "function" ? valueOrThunk() : valueOrThunk;

      if (valueOrPromise instanceof Promise) {
        return valueOrPromise.then(run);
      }

      return run(valueOrPromise);
    });
  }, syncThenable());

  if ((result as SyncThenable).isSync) {
    return foldFn();
  }

  return result.then(() => {
    return foldFn();
  });
}

export type Result<
  ErrorType,
  OkType,
  RollbackFn extends RollbackFunction = any
> = Ok<ErrorType, OkType, RollbackFn> | Err<ErrorType, OkType, RollbackFn>;

interface IResult<ErrorType, OkType> {
  isSuccess(): this is Ok<ErrorType, OkType, any>;

  isFailure(): this is Err<ErrorType, OkType, any>;

  getOrNull(): OkType | null;

  toString(): string;

  inspect(): string;

  fold<R>(
    onSuccess: (value: OkType) => R,
    onFailure: (error: ErrorType) => R
  ): R;
  fold<R>(
    onSuccess: (value: OkType) => Promise<R>,
    onFailure: (error: ErrorType) => Promise<R>
  ): Promise<R>;

  getOrDefault(defaultValue: OkType): OkType;

  getOrElse(onFailure: (error: ErrorType) => OkType): OkType;
  getOrElse(onFailure: (error: ErrorType) => Promise<OkType>): Promise<OkType>;

  getOrThrow(): OkType;

  map<T>(
    fn: (value: OkType) => Promise<T>
  ): Promise<
    JoinErrorTypes<
      ErrorType,
      T extends Result<any, any, any> ? T : Result<Error, T, any>
    >
  >;
  map<T>(
    fn: (value: OkType) => T
  ): JoinErrorTypes<
    ErrorType,
    T extends Result<any, any, any> ? T : Result<Error, T, any>
  >;

  rollback(): Result<Error, void> | Promise<Result<Error, void>>;
}

type InferErrorType<T extends Result<any, any, any>> = T extends Result<
  infer Errortype,
  any,
  any
>
  ? Errortype
  : never;

type InferOkType<T extends Result<any, any, any>> = T extends Result<
  any,
  infer OkType,
  any
>
  ? OkType
  : never;

type JoinErrorTypes<ErrorType, B extends Result<any, any, any>> = Result<
  ErrorType | InferErrorType<B>,
  InferOkType<B>,
  any
>;

type ExtractErrorTypes<Tuple extends any[]> = {
  [Index in keyof Tuple]: Tuple[Index] extends Result<any, any, any>
    ? InferErrorType<Tuple[Index]>
    : never;
}[number];

type MapResultTupleToOkTypeTuple<Tuple extends any[]> = {
  [Index in keyof Tuple]: Tuple[Index] extends Result<any, any, any>
    ? InferOkType<Tuple[Index]>
    : never;
};

type RollbackFunction = (() => void) | (() => Promise<void>);

type HasAsyncRollbackFunction<T extends any[]> = {
  [Index in keyof T]: T[Index] extends () => Promise<infer U> | infer U
    ? U extends Result<any, any, () => Promise<void>>
      ? true
      : false
    : false;
}[number] extends false
  ? false
  : true;

type UnwrapThunks<T extends any[]> = {
  [Index in keyof T]: T[Index] extends () => Promise<infer U>
    ? U
    : T[Index] extends () => infer U
    ? U
    : T[Index];
};

type HasAsyncThunk<T extends any[]> = {
  [Index in keyof T]: T[Index] extends () => Promise<any> ? true : false;
}[number] extends false
  ? false
  : true;

type PromiseReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : never;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace Result {
  export function ok<
    ErrorType extends unknown,
    OkType,
    RollbackFn extends RollbackFunction = any
  >(
    value?: OkType,
    rollbackFn?: RollbackFn
  ): Result<ErrorType, OkType, RollbackFn> {
    return new Ok<ErrorType, OkType, RollbackFn>(
      value || null!,
      rollbackFn
    ) as any;
  }

  export function error<
    ErrorType extends unknown,
    OkType extends unknown,
    RollbackFn extends RollbackFunction = any
  >(
    error: ErrorType,
    rollbackFn?: RollbackFn
  ): Result<ErrorType, OkType, RollbackFn> {
    return new Err<ErrorType, OkType, RollbackFn>(error, rollbackFn);
  }

  type SafeReturnType<E, T> = T extends Result<any, any, any>
    ? Result<E | InferErrorType<T>, InferOkType<T>, never>
    : Result<E, T, never>;

  export function safe<T>(
    fn: () => Promise<T>
  ): Promise<SafeReturnType<Error, T>>;
  export function safe<T>(fn: () => T): SafeReturnType<Error, T>;
  export function safe<ErrorType, T>(
    err: ErrorType | (new (...args: any[]) => ErrorType),
    fn: () => Promise<T>
  ): Promise<SafeReturnType<ErrorType, T>>;
  export function safe<ErrorType, T>(
    err: ErrorType | (new (...args: any[]) => ErrorType),
    fn: () => T
  ): SafeReturnType<ErrorType, T>;
  export function safe(errOrFn: any, fn?: any) {
    const hasCustomError = fn !== undefined;

    const execute = hasCustomError ? fn : errOrFn;

    function getError(caughtError: Error) {
      if (!hasCustomError) {
        return caughtError;
      }

      if (typeof errOrFn === "function") {
        return new errOrFn(caughtError);
      }

      return errOrFn;
    }

    try {
      const resultOrPromise = execute();

      if (resultOrPromise instanceof Promise) {
        return resultOrPromise
          .then((okValue) => {
            return isResult(okValue) ? okValue : Result.ok(okValue);
          })
          .catch((caughtError) => error(getError(caughtError)));
      }

      return isResult(resultOrPromise)
        ? resultOrPromise
        : Result.ok(resultOrPromise);
    } catch (caughtError) {
      return error(getError(caughtError as Error));
    }
  }

  type CombineResult<
    T extends (unknown | (() => unknown) | (() => Promise<unknown>))[]
  > = Result<
    ExtractErrorTypes<UnwrapThunks<T>>,
    MapResultTupleToOkTypeTuple<UnwrapThunks<T>>,
    HasAsyncRollbackFunction<T> extends true ? () => Promise<void> : () => void
  >;

  export function combine<
    T extends (unknown | (() => unknown) | (() => Promise<unknown>))[]
  >(
    ...items: T
  ): HasAsyncThunk<T> extends true
    ? Promise<CombineResult<T>>
    : CombineResult<T> {
    if (!items.length) {
      throw new Error("Expected at least 1 argument");
    }

    const values: unknown[] = [];
    const rollbacks: RollbackFunction[] = [];
    let error: Err<unknown, unknown, any> | null = null;

    function rollback() {
      const reversedRollbacks = rollbacks.reverse();
      const wrappedRollbackFns = reversedRollbacks.map((fn) => Result.wrap(fn));

      let error: Err<unknown, unknown, any> | null = null;

      return forEachValueThunkOrPromise(
        wrappedRollbackFns,
        (result: Result<unknown, unknown>) => {
          if (result.isFailure()) {
            error = Result.error<unknown, unknown, any>(result.error) as any;
            return false;
          }

          return true;
        },
        () => error || ok()
      );
    }

    return forEachValueThunkOrPromise(
      items,
      (result: Result<unknown, unknown>) => {
        if (result.isFailure()) {
          error = Result.error<unknown, unknown>(result.error, rollback) as any;
          return false;
        }

        values.push(result.value);
        rollbacks.push(() => result.rollback());
        return true;
      },
      () => error || ok(values, rollback)
    );
  }

  export function wrap<Fn extends (...args: any) => Promise<any>>(
    fn: Fn
  ): (
    ...args: Parameters<Fn>
  ) => Promise<Result<Error, PromiseReturnType<Fn>, never>>;
  export function wrap<Fn extends (...args: any) => any>(
    fn: Fn
  ): (...args: Parameters<Fn>) => Result<Error, ReturnType<Fn>, never>;
  export function wrap(fn: any) {
    return function wrapped(...args: any) {
      try {
        const resultOrPromise = fn(...args);

        if (resultOrPromise instanceof Promise) {
          return resultOrPromise
            .then((okValue) => Result.ok(okValue))
            .catch((err) => error(err));
        }

        return ok(resultOrPromise);
      } catch (err) {
        return error(err);
      }
    };
  }
}

abstract class Base<
  ErrorType extends unknown,
  OkType extends unknown,
  RollbackFn extends RollbackFunction
> implements IResult<ErrorType, OkType>
{
  constructor(protected readonly rollbackFn?: RollbackFn) {}

  errorOrNull(): ErrorType | null {
    if (this.isSuccess()) {
      return null;
    }

    return (this as any).error as ErrorType;
  }

  getOrNull(): OkType | null {
    if (this.isFailure()) {
      return null;
    }

    return (this as any).value as OkType;
  }

  toString(): string {
    throw new Error("Method not implemented.");
  }
  inspect(): string {
    return this.toString();
  }

  fold<R>(
    onSuccess: (value: OkType) => R,
    onFailure: (error: ErrorType) => R
  ): R;

  fold<R>(
    onSuccess: (value: OkType) => Promise<R>,
    onFailure: (error: ErrorType) => Promise<R>
  ): Promise<R>;
  fold(onSuccess: any, onFailure: any) {
    if (this.isFailure()) {
      return onFailure(this.error);
    }

    return onSuccess((this as any).value as OkType);
  }

  getOrDefault(defaultValue: OkType): OkType {
    if (this.isSuccess()) {
      return this.value;
    }

    return defaultValue;
  }

  getOrElse(onFailure: (error: ErrorType) => OkType): OkType;
  getOrElse(onFailure: (error: ErrorType) => Promise<OkType>): Promise<OkType>;
  getOrElse(onFailure: any) {
    if (this.isSuccess()) {
      return isAsyncFn(onFailure) ? Promise.resolve(this.value) : this.value;
    }

    return onFailure((this as any).error as ErrorType);
  }

  getOrThrow(): OkType {
    if (this.isFailure()) {
      throw this.error;
    }

    return (this as any).value as OkType;
  }

  isSuccess(): this is Ok<ErrorType, OkType, RollbackFn> {
    throw new Error("Method not implemented.");
  }
  isFailure(): this is Err<ErrorType, OkType, RollbackFn> {
    throw new Error("Method not implemented.");
  }

  map<T>(
    fn: (value: OkType) => Promise<T>
  ): Promise<
    JoinErrorTypes<
      ErrorType,
      T extends Result<any, any, any> ? T : Result<Error, T, any>
    >
  >;
  map<T>(
    fn: (value: OkType) => T
  ): JoinErrorTypes<
    ErrorType,
    T extends Result<any, any, any> ? T : Result<Error, T, any>
  >;
  map(fn: any) {
    if (this.isFailure()) {
      return isAsyncFn(fn) ? Promise.resolve(this) : this;
    }

    const result = Result.safe(() => fn((this as any).value) as any);

    return result as any;
  }

  rollback(): RollbackFn extends RollbackFunction
    ? RollbackFn extends () => Promise<void>
      ? Promise<Result<Error, void>>
      : Result<Error, void>
    : void {
    if (this.rollbackFn) {
      return this.rollbackFn() as any;
    }

    return null as any;
  }
}

class Ok<
  ErrorType extends unknown,
  OkType extends unknown,
  RollbackFn extends RollbackFunction
> extends Base<ErrorType, OkType, RollbackFn> {
  public readonly value: OkType;

  constructor(val: OkType, rollbackFn?: RollbackFn) {
    super(rollbackFn);
    this.value = val;
  }

  isSuccess(): this is Ok<ErrorType, OkType, RollbackFn> {
    return true;
  }

  isFailure(): this is Err<ErrorType, OkType, RollbackFn> {
    return false;
  }

  toString(): string {
    return `Result.Ok(${this.value})`;
  }

  forward(): Result<any, OkType, RollbackFn> {
    return Result.ok(this.value);
  }
}

class Err<
  ErrorType extends unknown,
  OkType extends unknown,
  RollbackFn extends RollbackFunction
> extends Base<ErrorType, OkType, RollbackFn> {
  public readonly error: ErrorType;

  constructor(err: ErrorType, rollbackFn?: RollbackFn) {
    super(rollbackFn);
    this.error = err;
  }

  isSuccess(): this is Ok<ErrorType, OkType, RollbackFn> {
    return false;
  }

  isFailure(): this is Err<ErrorType, OkType, RollbackFn> {
    return true;
  }

  toString(): string {
    return `Result.Error(${this.error})`;
  }

  forward(): Result<ErrorType, any, RollbackFn> {
    return Result.error(this.error);
  }
}
