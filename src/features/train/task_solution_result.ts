export interface TaskSolutionResult {
  value: Value;
}

export interface Value {
  functionName: string;
  wasLaunchedWithArguments: any;
  theResultWasObtained: any;
  theResultWasExpected: any;
  status: boolean;
}
