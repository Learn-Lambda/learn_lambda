import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { TrainStore } from "./train_store";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { Icon, IconType } from "../../core/ui/icon/icon";
import { Complexity } from "../../core/ui/complexity/complexity";
import { useEffect, useRef } from "react";
import { InputV2 } from "../../core/ui/input/input_v2";
import { Editor } from "@monaco-editor/react";
import { Value } from "./task_solution_result";
import { useNavigate } from "react-router-dom";
import { ViewOtherSolutionPath } from "../view_other_solutions/view_other_solutions";

export const TrainPath = "/train/last/task";

export const Train = observer(() => {
  const store = useStore(TrainStore);
  const ref = useRef<HTMLDivElement>(null);
  const refV2 = useRef<HTMLDivElement>(null);
  const refV3 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (refV3.current !== null) {
      refV3.current.style.width = `${
        Number(refV2.current!.clientWidth) - Number(ref.current!.clientWidth)
      }px`;
      store.loadTags = true;
    }
  }, []);

  return (
    <>
      <Page
        pageStore={store}
        children={
          <>
            <div
              className="3"
              style={{
                display: "flex",
                width: "100%",
                height: "calc(100% - 73px)",
                padding: "10px 40px 10px 40px",
              }}
            >
              <>
                <div style={{ height: "100%", width: "100%" }}>
                  <div
                    className="1"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextV2
                      text="Тренировка"
                      style={{ fontSize: 26, fontWeight: 700 }}
                    />
                    <div
                      className="4"
                      ref={refV2}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div></div>
                      <div
                        className="2"
                        ref={ref}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          ref={refV3}
                          className="scrollable"
                          style={{ display: "flex", overflow: "auto" }}
                        >
                          {store.loadTags ? (
                            <div style={{ display: "flex" }}>
                              {store.task?.tags.map((el) => (
                                <div
                                  style={{
                                    backgroundColor: "#E2E8F0",
                                    paddingBottom: 4,
                                    paddingTop: 4,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    marginLeft: 5,
                                    height: "min-content",
                                    width: "max-content",
                                  }}
                                >
                                  <TextV2 text={el} color="#64748B" />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div style={{ width: 8 }} />
                        <Complexity complexity={store.task?.complexity ?? 1} />
                        <div style={{ width: 8 }} />
                        <div
                          style={{
                            width: 29,
                            height: 29,
                            backgroundColor: "#E2E8F0",
                            borderRadius: 90,
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div>
                            <Icon
                              type={IconType.ok}
                              color={true ? "#8A99AF" : undefined}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      height: 1,
                      backgroundColor: "#E2E8F0",
                      width: "100% ",
                    }}
                  />
                  <div
                    style={{
                      height: "calc(100%)",
                      width: "100%",
                      marginLeft: 15,
                      marginTop: 15,
                      backgroundColor: "white",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
                      borderRadius: 2,
                      display: "flex",
                    }}
                  >
                    <PanelGroup
                      direction="horizontal"
                      style={{ width: "100%" }}
                    >
                      <Panel>
                        <PanelGroup
                          direction="vertical"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <Panel onResize={(size) => console.log()}>
                            <div style={{ width: "100%", height: 51 }}>
                              <div style={{ height: 10 }} />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ width: 10 }} />
                                <Icon type={IconType.group} color="#212B36" />
                                <div style={{ width: 10 }} />
                                <TextV2 text="Описание задачи" size={16} />
                                <div style={{ height: 27 }} />
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  height: 1,
                                  backgroundColor: "#E2E8F0",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                width: "calc(100% - 30px)",
                                height: "calc(100% - 60px)",
                                background: "rgb(239, 244, 251)",
                                borderRadius: 5,
                                marginLeft: 15,
                                marginRight: 15,
                                marginBottom: 15,
                                padding: 5,
                              }}
                            >
                              {store.task?.description}
                            </div>
                          </Panel>
                          <PanelResizeHandle>
                            <div
                              style={{
                                height: 2,
                                width: "100%",
                                backgroundColor: "#E2E8F0",
                              }}
                            ></div>
                          </PanelResizeHandle>
                          <Panel>
                            <div style={{ width: "100%", height: 51 }}>
                              <div style={{ height: 10 }} />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ width: 10 }} />
                                <Icon type={IconType.aiSmall} color="#212B36" />
                                <div style={{ width: 10 }} />
                                <TextV2 text="Чат с ии" size={16} />
                              </div>

                              <div
                                style={{
                                  width: "100%",
                                  height: 1,
                                  backgroundColor: "#E2E8F0",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                height: `calc(100% -  ${store.inputHeight}px - 51px)`,
                              }}
                            ></div>
                            <div
                              style={{
                                height: 40,
                                width: "100%",
                                display: "flex",
                              }}
                            >
                              <div
                                style={{
                                  width: `calc(100% - 40px)`,
                                }}
                              >
                                <InputV2
                                  height={store.inputHeight}
                                  bgColor="white"
                                  fontSize={15}
                                  onChange={(text) => {
                                    store.inputHelper(text);
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  backgroundColor: "#3C50E0",
                                  height: 40,
                                  width: 40,
                                  borderRadius: 4,
                                  textAlign: "center",
                                }}
                              >
                                <div style={{ position: "relative", top: 8 }}>
                                  <Icon size={25} type={IconType.send} />
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </PanelGroup>
                      </Panel>
                      <PanelResizeHandle>
                        <div
                          style={{
                            width: 2,
                            height: "100%",
                            backgroundColor: "#E2E8F0",
                          }}
                        ></div>
                      </PanelResizeHandle>
                      <Panel>
                        <PanelGroup
                          direction="vertical"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <Code store={store} />
                          <PanelResizeHandle>
                            <div
                              style={{
                                height: 2,
                                width: "100%",
                                backgroundColor: "#E2E8F0",
                              }}
                            ></div>
                          </PanelResizeHandle>
                          {store.isViewResultTest ? (
                            <>
                              <ResultTest store={store} />
                            </>
                          ) : (
                            <></>
                          )}
                        </PanelGroup>
                      </Panel>
                    </PanelGroup>
                  </div>
                </div>
              </>
            </div>
          </>
        }
      />
    </>
  );
});

export const Code: React.FC<{ store: TrainStore }> = observer(({ store }) => {
  const n = useNavigate();
  return (
    <>
      <Panel>
        <div style={{ width: "100%", height: 51 }}>
          <div style={{ height: 10 }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 10 }} />
                <TextV2 text="</>" size={16} />
                <div style={{ width: 10 }} />
                <TextV2 text="Код" size={16} />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <TextV2
                onClick={() => store.sendSolutions()}
                text="Отправить Решение"
                style={{
                  border: "1px solid",
                  position: "relative",
                  top: -5,
                  left: -7,
                  alignContent: "center",
                  cursor: "pointer",
                }}
              />

              {store.allTestIsAsserts ?? false ? (
                <>
                  <div style={{ width: 5 }}></div>
                  <TextV2
                    onClick={() =>
                      n(ViewOtherSolutionPath + `${store.task?.id}`)
                    }
                    text="Перейти к другим решениям"
                    style={{
                      // width: 20,
                      // height: 25,
                      padding: 5,
                      alignContent: "center",
                      borderRadius: 5,
                      backgroundColor: "green",
                      color: "white",
                      position: "relative",
                      top: -5,
                      left: -7,
                      cursor: "pointer",
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#E2E8F0",
            }}
          />
        </div>
        <div
          style={{
            width: "calc(100% - 30px)",
            height: "calc(100% - 60px)",
            background: "rgb(239, 244, 251)",
            borderRadius: 5,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 15,
            padding: 5,
          }}
        >
          <Editor
            defaultLanguage="typescript"
            value={store.task?.code}
            onChange={(text) => store.updateForm({ code: text })}
          />
        </div>
      </Panel>
    </>
  );
});

export const ResultTest: React.FC<{ store: TrainStore }> = observer(
  ({ store }) => {
    return (
      <>
        <Panel>
          <div style={{ width: "100%", height: 51 }}>
            <div style={{ height: 10 }} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 10 }} />
              <Icon type={IconType.resultTests} color="#212B36" />
              <div style={{ width: 10 }} />
              <TextV2 text="Резултаты тестов" size={16} />
            </div>
            <div
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#E2E8F0",
              }}
            ></div>
          </div>
          <div
            style={{
              width: "calc(100% - 30px)",
              height: "calc(100% - 60px)",
              background: "rgb(239, 244, 251)",
              borderRadius: 5,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15,
              padding: 5,
            }}
          >
            {store.taskSolutionResult?.map((el) => (
              <div style={{ color: el.value.status ? "green" : "red" }}>
                {el.value.status ? "OK" : "ERR"}{" "}
                {taskSolutionResultMapper(el.value)}
              </div>
            ))}
          </div>
        </Panel>
      </>
    );
  }
);
const taskSolutionResultMapper = (value: Value) =>
  `ожидалось ${value.theResultWasExpected} получено ${value.theResultWasObtained}`;
