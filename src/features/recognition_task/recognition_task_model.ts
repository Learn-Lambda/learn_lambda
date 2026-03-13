import makeAutoObservable from "mobx-store-inheritance"
import * as monaco from "monaco-editor";

export class RecognitionTaskModel {
    constructor() {
        makeAutoObservable(this);
    }
    code: string
    comonCategory: string
    count: number
    helper: string
    index: number
    ranges: string
    subCategory: string
    taskDescription: string
    typeTask: string
    getTaskRanges = (): monaco.IRange[][] => {
        if (this.ranges === undefined) {
            return [];
        }
        const r = JSON.parse(this.ranges);
        if (r === undefined) {
            return []
        }
        // @ts-ignore
        return r?.map((el) => el.range);

    }
}
