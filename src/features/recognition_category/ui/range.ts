import * as monaco from "monaco-editor";

export function rangesIntersect(a: monaco.IRange, b: monaco.IRange): boolean {
  if (a.startLineNumber !== b.startLineNumber) {
    return false;
  }
  if (
    a.endLineNumber < b.startLineNumber ||
    (a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn)
  ) {
    return false;
  }
  if (
    a.startLineNumber > b.endLineNumber ||
    (a.startLineNumber === b.endLineNumber && a.startColumn > b.endColumn)
  ) {
    return false;
  }
  return true;
}
export function mergeRanges(ranges: monaco.IRange[]): monaco.IRange {
  let startLineNumber = ranges[0].startLineNumber;
  let startColumn = ranges[0].startColumn;
  let endLineNumber = ranges[0].endLineNumber;
  let endColumn = ranges[0].endColumn;

  for (const range of ranges) {
    // Обновляем начальную позицию
    if (
      range.startLineNumber < startLineNumber ||
      (range.startLineNumber === startLineNumber &&
        range.startColumn < startColumn)
    ) {
      startLineNumber = range.startLineNumber;
      startColumn = range.startColumn;
    }

    // Обновляем конечную позицию
    if (
      range.endLineNumber > endLineNumber ||
      (range.endLineNumber === endLineNumber && range.endColumn > endColumn)
    ) {
      endLineNumber = range.endLineNumber;
      endColumn = range.endColumn;
    }
  }

  return { startLineNumber, startColumn, endLineNumber, endColumn };
}

export function rangesEqual(r1: monaco.IRange, r2: monaco.IRange): boolean {
  return (
    r1.startLineNumber === r2.startLineNumber &&
    r1.startColumn === r2.startColumn &&
    r1.endLineNumber === r2.endLineNumber &&
    r1.endColumn === r2.endColumn
  );
}
