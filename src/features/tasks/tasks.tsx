import { observer } from "mobx-react-lite";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { Input } from "../../core/ui/input/input";
import { InputV2 } from "../../core/ui/input/input_v2";
import { IconType } from "../../core/ui/icon/icon";
import { Switcher } from "../../core/ui/switcher/switcher";
import { Tag } from "./ui/tag";
import { useStore } from "../../core/helper/use_store";
import { TasksStore } from "./tasks_store";

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
                <div style={{ width: 300, padding: 10 }}>
                  <div style={{ height: 22 }} />
                  <InputV2 label="поиск" icon={IconType.search} />
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
                      style={{
                        width: 56,
                        height: 30,
                        background: "#E2E8F0",
                        borderRadius: 30,
                        alignContent: "center",
                        // paddingLeft: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: 90,

                          width: 9,
                          height: 9,
                          background: "#8A99AF",
                          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <div style={{ width: 2 }} />
                      <div
                        style={{
                          borderRadius: 90,

                          width: 9,
                          height: 9,
                          background: "#8A99AF",
                          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <div style={{ width: 2 }} />

                      <div
                        style={{
                          borderRadius: 90,

                          width: 9,
                          height: 9,
                          background: "#8A99AF",
                          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      />
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
                      isOn={true}
                      onToggle={function (): void {
                        // throw new Error("Function not implemented.");
                      }}
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
                      isOn={true}
                      onToggle={function (): void {
                        // throw new Error("Function not implemented.");
                      }}
                    />
                  </div>
                  <div style={{ height: 22 }} />
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: 4,
                      height: "max-content",

                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <TextV2 text="Тэги" color="#64748B" />
                    <div
                      style={{
                        display: "grid",
                        height: 100,
                        overflow: "auto",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(60px, 75px))",
                        gap: 10,
                      }}
                    >
                      {store.tags.map((el) => (
                        <Tag tag={el} />
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    height: "100%",
                    background: "rgb(226, 232, 240)",
                    width: 1,
                  }}
                ></div>
                <div style={{ padding: 15, width: "calc(100% - 300px)" }}>
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
                        text={store.tasks?.data.length.toString()}
                        color="#64748B"
                      />
                    </div>
                  </div>
                  <div style={{ height: 5 }} />
                  <div>
                    {store.tasks?.data.map((el, index) => (
                      <div
                        style={{
                          height: 54,
                          alignContent: "center",
                          background: index.isEven() ? "#EFF4FB" : "#FFFFFF",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div style={{ width: 10 }} />
                          <TextV2 text={el.name} />
                        </div>
                        <div style={{ display: "flex" }}>
                          <TextV2
                            onClick={() => store.addTaskToCollection(el.id)}
                            text="+"
                            size={22}
                            style={{ cursor: "pointer" }}
                          />
                          <div style={{ width: 10 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
});
