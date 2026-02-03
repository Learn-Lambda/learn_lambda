import { Editor, Monaco } from "@monaco-editor/react";
import { observer } from "mobx-react-lite";
import { NavigateFunction } from "react-router-dom";
import { useStore } from "../../../core/helper/use_store";
import { FormState } from "../../../core/store/base_store";
import * as monaco from "monaco-editor";
import makeAutoObservable from "mobx-store-inheritance";
import { useEffect } from "react";

import { mergeRanges, rangesEqual, rangesIntersect } from "./range";
import { TextV2 } from "../../../core/ui/text/text";
import { Icon, IconType } from "../../../core/ui/icon/icon";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { message } from "antd";

export class SelectAllModel {}

export interface SelectRange {
  range: monaco.IRange;
  options: {
    className: string;
    isWholeLine: boolean;
    inlineClassName: string;
  };
}
type SelectRangeHelper = {
  range: SelectRange | never[];
  options: {
    className: string;
    isWholeLine: boolean;
    inlineClassName: string;
  };
}[];

export class SelectSectionModel {
  selectRange: SelectRangeHelper;
  status: string = "await";
  code: string;
  selection: monaco.Selection;
  ranges: monaco.editor.IModelDecoration[];
  decorators: string[];
  range: monaco.Range;
  isOk = false;
  id: string;
  constructor(
    selectRange: SelectRangeHelper,
    code: string,
    position: monaco.Selection,
    ranges: monaco.editor.IModelDecoration[],
    decorators: string[],
    range: monaco.Range,
  ) {
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    this.decorators = decorators;
    this.selection = position;
    this.code = code;
    this.selectRange = selectRange;
    this.ranges = ranges;
    this.range = range;
    makeAutoObservable(this);
  }
}

export enum JobTypes {
  highlightTheAreasOfTheQuestion = "Выделить зоны вопроса",
  userInput = "Пользовательский ввод",
}
export class SelectAllStore extends FormState<SelectAllModel> {
  getType = () => "Тренировка";
  rangesNeedToChose?: { range: monaco.IRange[]; isSelected: boolean }[] =
    undefined;
  lastSection?: SelectRange = undefined;
  editor?: monaco.editor.IStandaloneCodeEditor = undefined;
  viewModel: SelectAllModel;
  indexed: boolean[] = [];
  selectSectionModels: SelectSectionModel[] = [];
  decorators: monaco.IRange[] = [];
  isValid = false;
  rangesIsValidCount = 0;
  rangesIsErrorCount = 0;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  reset = (): void => {
    this.isValid = false;
    this.selectSectionModels.forEach((el) => {
      this.deleteSectionInId(el.id);
    });
    this.decorators.forEach((el) => {
      const decorations = this.editor!.getDecorationsInRange(el as any);
      if (decorations === null) {
        return;
      }
      // Если есть хотя бы одна декорация, удаляем её
      if (decorations.length > 0) {
        const decorationIdsToRemove = decorations.map((d) => d.id); // массив id декораций для удаления

        // Удаляем указанные декорации
        this.editor!.deltaDecorations(decorationIdsToRemove, []);
      }
    });
  };
  validationDecorators = (): void => {
    this.isValid = true;
    this.selectSectionModels?.forEach((el) => {
      el.isOk = false;
    });

    this.rangesNeedToChose?.map((el, index) => {
      const range = mergeRanges(el.range);
      this.selectSectionModels
        .rFind<SelectSectionModel>((selectionModels) =>
          rangesEqual(range, selectionModels.range),
        )
        .map((selectionModels) => {
          el.isSelected = true;
          selectionModels.isOk = true;
        });
    });

    this.selectSectionModels?.forEach((el) => {
      if (el.isOk === false) {
        el.status = "Error";
        this.decorators.push(el.range);
        this.rangesIsErrorCount += 1;
        this.applyDecorators(el.range, "error-box");
      }
      if (el.isOk) {
        el.status = "Ok";
        this.decorators.push(el.range);
        this.rangesIsValidCount += 1;
        this.applyDecorators(el.range, "ok-box");
      }
    });
    this.rangesNeedToChose?.forEach((el) => {
      if (el.isSelected === false) {
        this.decorators.push(mergeRanges(el.range));
        this.applyDecorators(mergeRanges(el.range), "error-box");
      }
    });
  };
  applyDecorators = (range: monaco.Range | monaco.IRange, cssClass: string) => {
    this.editor!.deltaDecorations(
      [],
      [
        {
          range: range,
          options: {
            inlineClassName: cssClass,
          },
        },
      ],
    );
  };
  setDecorators = (): void => {
    this.rangesNeedToChose = [];
    this.selectSectionModels.forEach((el, i) => {
      this.rangesNeedToChose?.push({ range: [el.range], isSelected: false });
      this.deleteSectionInId(el.id);
    });
  };
  getJobTypes = () => {
    return Object.entries(JobTypes).map((el) => el[1]);
  };
  visibleDecorators = (): void => {
    this.rangesNeedToChose!.forEach((ranges) => {
      const decorations: monaco.editor.IModelDeltaDecoration[] =
        ranges.range.map((range) => ({
          range,
          options: {
            className: "myDecorationClass",
            isWholeLine: false,
            inlineClassName: "myInlineDecoration",
          },
        }));

      this.editor?.deltaDecorations([], decorations);
    });
  };
  dependencyInit(rangesNeedToChose: monaco.IRange[][]) {
    this.rangesNeedToChose = rangesNeedToChose.map((el) => {
      return {
        range: el,
        isSelected: false,
      };
    });
  }
  copySelectFragments = (): void => {
    console.log(
      JSON.stringify(
        this.selectSectionModels.map((el) => {
          return el.ranges.map((element) => {
            return element.range;
          });
        }),
      ),
    );
  };
  deleteSectionInId = (id: string): void => {
    const selection = this.selectSectionModels.find((el, i) => el.id === id);
    this.selectSectionModels = this.selectSectionModels.filter(
      (el) => el.id !== id,
    );
    this.addDecoratos(selection?.decorators);
  };
  deleteSection = (index: number): void => {
    const selection = this.selectSectionModels.find((_, i) => i === index);

    this.selectSectionModels = this.selectSectionModels.filter(
      (_, i) => index !== i,
    );

    this.addDecoratos(selection?.decorators);
  };
  addDecoratos = (decorators: string[] | undefined) =>
    this.editor?.deltaDecorations(decorators ?? [], []);
  getLastSection = (): SelectRangeHelper => [
    {
      range: this.lastSection ?? [],

      options: {
        className: "my-square-decoration",
        isWholeLine: false,
        inlineClassName: "waiting-box",
      },
    },
  ];

  updateLastSection = (selection: monaco.Selection) => {
    this.lastSection = selection as unknown as SelectRange;
  };

  async init(navigate?: NavigateFunction): Promise<any> {
    window.addEventListener("keydown", this.onCtrlKey);
  }

  onCtrlKey = (event: KeyboardEvent) => {
    if (event.key === "Control") {
      if (this.isValid) {
        message.error("Сбросте изменения");
        return;
      }
      const currentValueEditor = this.editor
        ?.getModel()
        ?.getValueInRange(this.lastSection as any) as string;
      if (currentValueEditor.trim() === "") {
        return;
      }

      const selection = this.editor!.getSelection()!;
      const range: monaco.Range = new monaco.Range(
        selection.startLineNumber,
        selection.startColumn,
        selection.endLineNumber,
        selection.endColumn,
      );
      this.selectSectionModels.forEach((el, i) => {
        if (rangesIntersect(el.range, range)) {
          this.deleteSection(i);
        }
      });
      const decorators = this.editor?.deltaDecorations(
        [],
        this.getLastSection() as unknown as monaco.editor.IModelDeltaDecoration[],
      ) as string[];

      this.selectSectionModels.push(
        new SelectSectionModel(
          this.getLastSection(),
          this.editor
            ?.getModel()
            ?.getValueInRange(this.lastSection as any) as string,
          this.editor!.getSelection() as unknown as monaco.Selection,
          this.editor?.getDecorationsInRange(range)!,
          decorators,
          range,
        ),
      );
    }
  };
  updateEditor(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
    editor.updateOptions({ readOnly: true });
  }

  dispose(): void {
    window.removeEventListener("keydown", this.onCtrlKey);
  }
}

export const SelectAll: React.FC<{
  selectAllModel: { code: string; ranges: monaco.IRange[][] };
}> = observer(({ selectAllModel }) => {
  const store = useStore(SelectAllStore);
  useEffect(() => {
    store.dependencyInit(selectAllModel.ranges ?? []);
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <TextV2
          style={{ height: 30, fontSize: 26 }}
          text={`Функции / ${store.getType()}`}
        />
        <div style={{ width: 20 }} />
        <div style={{ cursor: "pointer" }} onClick={() => store.reset()}>
          <Icon type={IconType.reset} />
        </div>
        <div style={{ width: 20 }} />
        <div
          onClick={() => store.validationDecorators()}
          style={{ cursor: "pointer" }}
        >
          <Icon type={IconType.okV2} />
        </div>
      </div>
      <div>
        <TextV2 text="Задание: Выделите все аргументы функций" />
      </div>
      <div style={{ height: 5 }} />
      <div style={{ display: "flex", height: "100%" }}>
        <div></div>
        <Editor
          height="100%"
          defaultLanguage="typescript"
          defaultValue={selectAllModel.code}
          onMount={(editor: monaco.editor.IStandaloneCodeEditor, _) => {
            store.updateEditor(editor);
            editor.onDidChangeCursorSelection((_) => {
              store.updateLastSection(editor.getSelection()!);
            });
          }}
        />

        <div style={{ height: "100%", width: 500, overflow: "auto" }}>
          {store.isValid ? (
            <>
              <TextV2
                text={`Всего надо было выделить: ${store.rangesNeedToChose?.length} `}
                style={{ marginLeft: 20, fontSize: 21 }}
              />

              <TextV2
                text={`Правильно было выделно: ${store.rangesIsValidCount} `}
                style={{ marginLeft: 20, fontSize: 21 }}
              />
              <TextV2
                text={`Неправильно было выделено: ${store.rangesIsErrorCount} `}
                style={{ marginLeft: 20, fontSize: 21 }}
              />
            </>
          ) : (
            <>
              <TextV2
                text={`Выделенные фрагменты`}
                style={{ marginLeft: 20, fontSize: 21 }}
              />
            </>
          )}

          <div>
            {store.selectSectionModels.map((el, index) => (
              <div>
                <div
                  style={{
                    backgroundColor:
                      el.status === "await"
                        ? undefined
                        : el.status === "Error"
                          ? "red"
                          : el.status === "Ok"
                            ? "green"
                            : undefined,

                    border:
                      el.status === "await"
                        ? "1px solid black"
                        : el.status === "Error"
                          ? "1px solid white"
                          : el.status === "Ok"
                            ? "1px solid white"
                            : "1px solid black",
                    borderRadius: 4,
                    padding: 10,
                    margin: 20,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: 12 }}>
                      <div
                        onClick={() => store.deleteSection(index)}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          bottom: 3,
                        }}
                      >
                        {el.status === "await" ? (
                          <Icon size={25} color="red" type={IconType.backet} />
                        ) : undefined}
                      </div>
                    </div>
                  </div>
                  <div>
                    {el.code.split("\n").map((element) => (
                      <div
                        style={{
                          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                          color:
                            el.status === "await"
                              ? undefined
                              : el.status === "Error"
                                ? "white"
                                : el.status === "Ok"
                                  ? "white"
                                  : undefined,
                        }}
                      >
                        {element}
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div style={{ height: 20 }} /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          .myDecorationClass {
            background-color: rgba(255, 0, 0, 0.3);
          }
          .myInlineDecoration {
            border-bottom: 1px solid red;
          }
          .waiting-box {
            background-color: #ecf719c0;            
          }
          .ok-box{
            background-color: #19f72bc0;       
          }
          .error-box{
            background-color: #f71919c0;       
          }
        `}
      </style>
    </>
  );
});
