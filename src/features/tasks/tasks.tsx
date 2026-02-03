import { observer } from "mobx-react-lite";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { InputV2 } from "../../core/ui/input/input_v2";
import { Icon, IconType } from "../../core/ui/icon/icon";
import { Switcher } from "../../core/ui/switcher/switcher";
import { Tag } from "./ui/tag";
import { useStore } from "../../core/helper/use_store";
import { TasksStore } from "./tasks_store";
import { Complexity } from "../../core/ui/complexity/complexity";
import { Pagination } from "../../core/ui/pagination/pagination";

export const TasksPath = "/tasks";
export const Tasks = observer(() => {
  const store = useStore(TasksStore);

  return (
    <Page
      pageStore={store}
      children={
        <>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "calc(100% - 73px)",
              padding: "10px 40px 10px 40px",
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>
              <TextV2
                text="Поиск задач"
                style={{ fontSize: 26, fontWeight: 700 }}
              />

              <div
                // className="hideScroll"
                style={{
                  borderRadius: 4,
                  height: "max-content",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                  display: "flex",
                  // overflow: "scroll",
                  overflowX: "scroll",
                }}
              >
                {store.tags.map((el, i) => {
                  return (
                    <div key={i} style={{ padding: 5 }}>
                      <Tag
                        tag={el.name}
                        isActive={store.tagsQuery.includes(el.value)}
                        selectCallback={() => store.selectTags(el.value)}
                      />
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  // height: "100%",
                  width: "100%",
                  marginLeft: 15,
                  marginTop: 5,
                  backgroundColor: "white",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
                  borderRadius: 2,
                  display: "flex",
                }}
              >
                <div style={{ width: 300, padding: 10 }}>
                  <div style={{ height: 22 }} />
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => store.find()}
                  >
                    <InputV2 label="поиск" icon={IconType.search} />
                  </div>
                  <div style={{ height: 22 }} />
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: 4,
                      height: 40,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <TextV2 text="Сложность" color="#64748B" size={16} />

                    <div
                      onClick={() => store.applyDifficultyFilter()}
                      style={{ cursor: "pointer" }}
                    >
                      <Complexity complexity={store.complexity ?? 0} />
                    </div>
                  </div>
                  <div style={{ height: 22 }} />
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: 4,
                      height: 40,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <TextV2 text="Учитывать план" color="#64748B" />
                    <Switcher
                      isOn={store.planSolutions}
                      onToggle={() => store.planSolutionsFilterApply()}
                    />
                  </div>
                  <div style={{ height: 22 }} />
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: 4,
                      height: 40,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <TextV2 text="Решенные через ИИ" color="#64748B" />
                    <Switcher
                      isOn={store.aiSolutions}
                      onToggle={() => store.aiSolutionsFilterApply()}
                    />
                  </div>
                  <div style={{ height: 22 }} />
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: 4,
                      height: 40,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <TextV2 text="Только не решенные" color="#64748B" />
                    <Switcher
                      isOn={store.onlyUnresolved}
                      onToggle={() => store.onlyUnresolvedFilterApply()}
                    />
                  </div>
                  <div style={{ height: 22 }} />
                </div>

                <div
                  style={{
                    height: "100%",
                    background: "rgb(226, 232, 240)",
                    width: 1,
                  }}
                ></div>
                <div
                  style={{
                    padding: 15,
                    width: "calc(100% - 300px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex" }}>
                      <TextV2
                        text="Найдено Задач"
                        color="#1C2434"
                        style={{ fontWeight: 500, fontSize: 20 }}
                      />
                      <div style={{ width: 10 }} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "#E2E8F0",
                          border: "0.5px solid #E2E8F0",
                          borderRadius: 3,
                          padding: 5,
                        }}
                      >
                        <TextV2
                          text={store.tasks?.totalCount.toString()}
                          color="#64748B"
                        />
                      </div>
                    </div>
                    <div style={{ height: 5 }} />
                    <div>
                      {store.tasks?.data.map((el, index) => (
                        <div
                          key={index}
                          style={{
                            height: 54,
                            alignContent: "center",
                            background: store.currentTasksIds?.includes(el.id)
                              ? "rgb(28, 36, 52)"
                              : index.isEven()
                              ? "#EFF4FB"
                              : "#FFFFFF",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyItems: "center",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {el.usersWhoSolvedTheTask.includes(store.userId) ? (
                              <>
                                <div style={{ width: 10 }} />

                                <Icon
                                  type={IconType.tick}
                                  color={
                                    store.currentTasksIds?.includes(el.id)
                                      ? "#EFF4FB"
                                      : index.isEven()
                                      ? undefined
                                      : undefined
                                  }
                                />
                              </>
                            ) : (
                              <></>
                            )}
                            <div style={{ width: 10 }} />
                            <TextV2
                              text={el.name}
                              color={
                                store.currentTasksIds?.includes(el.id)
                                  ? "white"
                                  : undefined
                              }
                            />
                          </div>

                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                // width: "10%",
                                overflow: "auto",
                              }}
                            >
                              {el.tags.map((element, key) => (
                                <div
                                  key={key}
                                  style={{
                                    /* Group 1 */

                                    height: 30,

                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "4px 10px",

                                    background: "#E2E8F0",
                                    border: "0.5px solid #E2E8F0",
                                    borderRadius: 3,

                                    color: "#64748B",
                                  }}
                                >
                                  {element}
                                </div>
                              ))}
                              {el.usersWhoSolvedTaskAiHelp.includes(
                                store.userId
                              ) ? (
                                <>
                                  <div
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                      padding: 5,
                                    }}
                                  >
                                    <Icon type={IconType.aiBig} />
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              <div style={{ marginRight: 5, marginLeft: 5 }}>
                                <Complexity complexity={el.complexity} />
                              </div>
                            </div>
                            {store.currentTasksIds?.includes(el.id) ? (
                              <>
                                <TextV2
                                  onClick={() =>
                                    store.removeTaskToCollection(el.id)
                                  }
                                  text="-"
                                  size={22}
                                  style={{ cursor: "pointer", color: "white" }}
                                />
                              </>
                            ) : (
                              <>
                                <TextV2
                                  onClick={() =>
                                    store.addTaskToCollection(el.id)
                                  }
                                  text="+"
                                  size={22}
                                  style={{ cursor: "pointer" }}
                                />
                              </>
                            )}

                            <div style={{ width: 10 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {store.tasks === undefined ? (
                    <></>
                  ) : (
                    <>
                      <Pagination
                        nextPage={() => store.nextPage()}
                        prevPage={() => store.prevPage()}
                        selectPage={(value) => store.selectPage(value)}
                        pagination={store.tasks!}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
});
