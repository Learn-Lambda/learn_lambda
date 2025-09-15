export class OtherSolutionModel {}
export interface ITaskSolution {
  id: number;
  authors: any[];
  taskId: number;
  hash: string;
  code: string;
  createDate: Date;
}
