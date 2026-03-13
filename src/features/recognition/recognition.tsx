import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { RecognitionStore } from "./recognition_store";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { Accordion } from "../../core/ui/accordion/accordion";
import { ReactNode, useEffect, useState } from "react";
import { Collapse } from "../../core/ui/collapse/collapse";
import { RecognitionTaskPath } from "../recognition_task/recognition_task";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { Icon, IconType } from "../../core/ui/icon/icon";
export const RecognitionPath = "/recognition";

export const Recognition = observer(() => {
  const store = useStore(RecognitionStore);
  const { id } = useParams();
  useEffect(() => {
    store.initParam(Number(id));
  }, []);
  return (
    <>
      <Page
        pageStore={store}
        children={
          <>
            <div style={{ paddingTop: 50, marginLeft: 80 }}>
              <div style={{ display: "flex" }}>
                <TextV2
                  text={`Распознование кода  `}
                  style={{
                    fontWeight: 700,
                    fontSize: 26,
                  }}
                />
                <div style={{ width: 10 }} />
                <TextV2
                  text={store.getPercentAllTypesUsage()}
                  style={{
                    fontWeight: 700,
                    fontSize: 26,
                    color: "#8000ff",
                  }}
                />
              </div>
              <div style={{ height: 20 }} />
              <div
                style={{
                  display: "grid",
                }}
              >
                {store.recognitionModels.map((el) => (
                  <Collapse
                    title={
                      <>
                        <div style={{ display: "flex" }}>
                          <div>
                            <TextV2
                              text={el.name}
                              style={{
                                fontWeight: 500,
                                fontSize: 20,
                              }}
                            />
                            <div style={{ width: 5 }} />
                            <TextV2
                              text={
                                el.topics.length === 1
                                  ? "1 категория"
                                  : el.topics.length.toString() + " категории"
                              }
                              style={{
                                fontWeight: 500,
                                fontSize: 14,
                              }}
                            />
                          </div>
                          <div style={{ width: 5 }} />
                          <TextV2
                            text={el.getUsage()}
                            style={{
                              fontWeight: 700,
                              fontSize: 20,
                              color: "#8000ff",
                            }}
                          />
                        </div>
                        <div style={{ height: 5 }} />
                      </>
                    }
                    children={
                      <div style={{ backgroundColor: "rgb(28, 36, 52)" }}>
                        {el.topics.map((element) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                backgroundColor: element.didYouPassTheTest
                                  ? "green"
                                  : undefined,
                                color: element.didYouPassTheTest
                                  ? "#00ff00"
                                  : "white",
                                padding: 10,
                                cursor: "pointer",
                              }}
                            >
                              <div>{element.name}</div>
                              <div style={{ width: 10 }} />
                              <div
                                style={{ textDecoration: "underline" }}
                                onClick={() =>
                                  store.navigate?.(
                                    RecognitionTaskPath +
                                      String(element.id) +
                                      "/train",
                                  )
                                }
                              >
                                тренировка
                              </div>
                              <div style={{ width: 10 }} />
                              <div
                                style={{
                                  textDecoration: "underline",
                                  color: element.isErrorToday
                                    ? "red"
                                    : undefined,
                                }}
                                onClick={() =>
                                  element.isErrorToday
                                    ? message.error(
                                        "вы сегодня уже сделали поптыку сдачи экзамена по этой теме, попробуйте еще раз завтра",
                                      )
                                    : store.navigate?.(
                                        RecognitionTaskPath +
                                          String(element.id) +
                                          "/exam",
                                      )
                                }
                              >
                                экзамен
                              </div>

                              <div style={{ width: 10 }} />
                              <div>
                                {element.didYouPassTheTest ? (
                                  <>
                                    <div
                                      style={{
                                        height: 22,
                                        alignContent: "center",
                                      }}
                                      onClick={() =>
                                        store.resetProgressWithTask(element.id)
                                      }
                                    >
                                      <Icon
                                        type={IconType.reset}
                                        size={20}
                                        color="white"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </>
        }
      />
    </>
  );
});
