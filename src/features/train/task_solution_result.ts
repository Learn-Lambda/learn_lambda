export interface TaskSolutionResult {
  value: Value;
}

export interface Value {
  functionName: string;
  wasLaunchedWithArguments: number[];
  theResultWasObtained: number;
  theResultWasExpected: number;
  status: boolean;
}
