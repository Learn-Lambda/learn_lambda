export interface Task {
  id: number;
  name: string;
  description: string;
  functionName: string;
  code: string;
  complexity: number;
  createDate: Date;
  testArguments: string;
  numberOfTimesSolved: number;
  isOpen: boolean;
  tags: any[];
  usersWhoSolvedTheTask:number[];
  usersWhoSolvedTaskAiHelp:number[];
}
