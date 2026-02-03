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
import { TasksPath } from "../tasks/tasks";
import { Switcher } from "../../core/ui/switcher/switcher";
import Popover from "../../core/ui/popover/popover";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Loader } from "../../core/ui/loader/loader";

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
            {store.emptyPage ? (
              <div style={{ display: "flex", margin: 20 }}>
                <TextV2 text="У вас нету задач в текущей колекции добавте еще задач" />
                <div style={{ width: 4 }} />
                <TextV2
                  text="перейдя на страницу с задачами"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => store.navigate?.(TasksPath)}
                />
              </div>
            ) : (
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
                                  {store.task?.tags?.map((el, i) => (
                                    <div
                                      key={i}
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
                            <Complexity
                              complexity={store.task?.complexity ?? 1}
                            />
                            <div style={{ width: 8 }} />
                            {store.isVscodeMode ? (
                              <>
                                <div
                                  style={{
                                    alignItems: "center",
                                    height: 26,
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Popover
                                    content={
                                      <>
                                        <TextV2
                                          text="Включите если вы решайте задачи через vscode"
                                          style={{
                                            alignContent: "center",
                                          }}
                                        />
                                      </>
                                    }
                                    children={
                                      <>
                                        <TextV2
                                          text="Vscode mode"
                                          style={{
                                            position: "relative",
                                            top: -7,
                                            left: -7,
                                            fontWeight: 900,
                                            alignContent: "center",
                                          }}
                                        />
                                      </>
                                    }
                                  />

                                  <Switcher
                                    isOn={store.isVscodeMode}
                                    onToggle={() => store.setVsCodeMode()}
                                  />
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
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
                                  color={store.task ? "#8A99AF" : undefined}
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
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <Panel
                                // style={{ flex: undefined, flexGrow: "inherit" }}
                                onResize={(size) => {}}
                              >
                                <div style={{ width: "100%", height: 51 }}>
                                  <div style={{ height: 10 }} />
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div style={{ width: 10 }} />
                                    <Icon
                                      type={IconType.group}
                                      color="#212B36"
                                    />
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
                                <div style={{ height: "100%" }}>
                                  {store.isAiSolutionUnlock ? (
                                    <>
                                      <div
                                        style={{ width: "100%", height: 36 }}
                                      >
                                        <div style={{ height: 10 }} />
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div style={{ width: 10 }} />
                                          <Icon
                                            type={IconType.aiSmall}
                                            color="#212B36"
                                          />
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
                                          height: `calc(100% -  ${store.inputHeight}px - 36px)`,
                                          overflow: "auto",
                                        }}
                                      >
                                        {store.messages.map((el, i) => (
                                          <div
                                            key={i}
                                            style={{
                                              paddingTop: 10,
                                              margin: 5,
                                              backgroundColor:
                                                el.messageType === "user"
                                                  ? "#1c2434"
                                                  : "#eff4fc",
                                              border: "1px",
                                              borderRadius: 20,
                                              color:
                                                el.messageType === "user"
                                                  ? "white"
                                                  : undefined,
                                              alignContent: "center",
                                              // width: "max-content",
                                              paddingLeft: 10,
                                              paddingRight: 10,
                                              // marginRight:
                                              //   el.messageType === "user"
                                              //     ? 20
                                              //     : undefined,
                                              // marginLeft:
                                              //   el.messageType === "user"
                                              //     ? undefined
                                              //     : 20,
                                              // placeSelf:
                                              //   el.messageType === "user"
                                              //     ? "end"
                                              //     : undefined,
                                            }}
                                          >
                                            <Markdown
                                              children={el.message}
                                              components={{
                                                code(props) {
                                                  const {
                                                    children,
                                                    className,
                                                    node,
                                                    ...rest
                                                  } = props;
                                                  const match =
                                                    /language-(\w+)/.exec(
                                                      className || ""
                                                    );
                                                  return match ? (
                                                    <SyntaxHighlighter
                                                      PreTag="div"
                                                      children={String(
                                                        children
                                                      ).replace(/\n$/, "")}
                                                      language={"typescript"}
                                                      // style={dark}
                                                    />
                                                  ) : (
                                                    <code
                                                      {...rest}
                                                      className={className}
                                                    >
                                                      {children}
                                                    </code>
                                                  );
                                                },
                                              }}
                                            />
                                          </div>
                                        ))}
                                        {store.messageLoader ? (
                                          <>
                                            <div style={{ height: 50 }}>
                                              <Loader />
                                            </div>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
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
                                            formController={
                                              store.formController
                                            }
                                            height={"max-content"}
                                            bgColor="white"
                                            fontSize={15}
                                            onChange={(text) => {
                                              store.inputHelper(text);
                                            }}
                                            style={{ paddingBottom: 5 }}
                                          />
                                        </div>
                                        <div style={{ position: "relative" }}>
                                          <div
                                            style={{
                                              backgroundColor:
                                                store.messageLoader
                                                  ? "#525463ff"
                                                  : "#3C50E0",
                                              height: 40,
                                              width: 40,
                                              borderRadius: 4,
                                              textAlign: "center",
                                              position: "fixed",
                                            }}
                                          >
                                            <div
                                              style={{
                                                position: "relative",
                                                top: 8,
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                store.messageLoader
                                                  ? () => {}
                                                  : store.sendMessage()
                                              }
                                            >
                                              <Icon
                                                size={25}
                                                type={IconType.send}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {store.isAiSolutionLoad ? (
                                        <>
                                          <Loader />
                                        </>
                                      ) : (
                                        <>
                                          {store.gptButtonIsUnlock ? (
                                            <>
                                              <TextV2
                                                text="Востановить переписку с gpt?"
                                                onClick={() =>
                                                  store.solveWithAi()
                                                }
                                                style={{
                                                  justifySelf: "center",
                                                  fontWeight: 900,
                                                  alignContent: "center",
                                                  height: "100%",
                                                  alignSelf: "center",
                                                  cursor: "pointer",
                                                  alignItems: "center",
                                                }}
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <TextV2
                                                text="Решить с ИИ"
                                                onClick={() =>
                                                  store.solveWithAi()
                                                }
                                                style={{
                                                  justifySelf: "center",
                                                  fontWeight: 900,
                                                  alignContent: "center",
                                                  height: "100%",
                                                  alignSelf: "center",
                                                  cursor: "pointer",
                                                  alignItems: "center",
                                                }}
                                              />
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
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
                          {store.isVscodeMode ? (
                            <></>
                          ) : (
                            <>
                              <Panel>
                                <PanelGroup
                                  direction="vertical"
                                  style={{ width: "100%", height: "100%" }}
                                >
                                  {store.isVscodeMode ? (
                                    <></>
                                  ) : (
                                    <>
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
                                    </>
                                  )}
                                  {store.isViewResultTest ? (
                                    <>
                                      <ResultTest store={store} />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </PanelGroup>
                              </Panel>
                            </>
                          )}
                        </PanelGroup>
                      </div>
                    </div>
                  </>
                </div>
              </>
            )}
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
              {store.allTestIsAsserts ?? false ? (
                <></>
              ) : (
                <>
                  <div
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      display: "flex",
                    }}
                  >
                    <Popover
                      content={
                        <>
                          <TextV2
                            text="Включите если вы решайте задачи через vscode"
                            style={{
                              alignContent: "center",
                            }}
                          />
                        </>
                      }
                      children={
                        <>
                          <TextV2
                            text="Vscode mode"
                            style={{
                              position: "relative",
                              top: -2,
                              left: -7,
                              fontWeight: 900,
                              alignContent: "center",
                            }}
                          />
                        </>
                      }
                    />

                    <Switcher
                      isOn={store.isVscodeMode}
                      onToggle={() => store.setVsCodeMode()}
                    />
                  </div>
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
                </>
              )}

              {store.allTestIsAsserts ?? false ? (
                <>
                  <div style={{ width: 5 }}></div>
                  <TextV2
                    onClick={() => store.viewOtherSolutionClick()}
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
    console.log(JSON.stringify(store.taskSolutionResult));
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
              overflow: "auto",
            }}
          >
            <div style={{ color: store.isError() ? "red" : "green" }}>
              {store.isError() ? "Ошибка" : "Ок"}
            </div>
            <div style={{ display: "flex" }}>
              {store.taskSolutionResult?.map((el, index) => (
                <div
                  key={index}
                  onClick={() => store.setActiveCase(index)}
                  style={{
                    backgroundColor:
                      store.activeCase === index
                        ? "rgb(227 227 227)"
                        : "rgb(255 255 254)",
                    borderRadius: 5,
                    padding: 5,
                    margin: 5,
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    // color: el.value.status ? "green" : "red",
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 100,
                      backgroundColor: store.isError() ? "red" : "green",
                    }}
                  />
                  <div style={{ width: 4 }} />
                  <div>тест {index + 1}</div>
                </div>
              ))}
            </div>
            <div>
              <div>Аргументы</div>
              <ArgumentsMapper
                wasLaunchedWithArguments={
                  store.taskSolutionResult?.at(store.activeCase)?.value
                    .wasLaunchedWithArguments
                }
              />
              {/* <div style={{}}></div> */}
            </div>
            <div>
              <div>Ожидаймый результат</div>
              <div
                style={{
                  padding: 5,
                  margin: 5,
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <ObtainedMapper
                  obtained={
                    store.taskSolutionResult?.at(store.activeCase)?.value
                      .theResultWasExpected
                  }
                />
              </div>

              <div>Полученый результат</div>
              <div
                style={{
                  padding: 5,
                  margin: 5,
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <ObtainedMapper
                  obtained={
                    store.taskSolutionResult?.at(store.activeCase)?.value
                      .theResultWasObtained
                  }
                />
              </div>
            </div>
          </div>
        </Panel>
      </>
    );
  }
);
const taskSolutionResultMapper = (value: Value) =>
  `ожидалось ${value.theResultWasExpected} получено ${value.theResultWasObtained}`;

const ObtainedMapper: React.FC<{ obtained: any }> = ({ obtained }) => {
  if (obtained === undefined) {
    return <>undefined</>;
  }
  if (obtained === null) {
    return <>null</>;
  }
  return <>{obtained}</>;
};
const ArgumentsMapper: React.FC<{ wasLaunchedWithArguments: any }> = ({
  wasLaunchedWithArguments,
}) => {
  if (wasLaunchedWithArguments instanceof Array) {
    return (
      <>
        {wasLaunchedWithArguments.map((el, i) => (
          <div
            key={i}
            style={{
              padding: 5,
              margin: 5,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            {el}
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      <div
        style={{
          padding: 5,
          margin: 5,
          backgroundColor: "white",
          borderRadius: 5,
        }}
      >
        {wasLaunchedWithArguments}
      </div>
    </>
  );
};
