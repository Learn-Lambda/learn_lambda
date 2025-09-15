import { useEffect, useState } from "react";
import { useStore } from "../../core/helper/use_store";
import { Icon, IconType } from "../../core/ui/icon/icon";
import { Page } from "../../core/ui/page/Page";
import Popover from "../../core/ui/popover/popover";
import { TextV2 } from "../../core/ui/text/text";
import { ActivityStore } from "./activity_store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

export const ActivityPath = "/activity/";
export const Activity = observer(() => {
  const { userId } = useParams();
  const store = useStore(ActivityStore);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    if (userId) {
      store.initParam(userId);
    }
  }, []);
  return (
    <Page
      pageStore={store}
      children={
        <>
          <div style={{ paddingTop: 50, marginLeft: 80 }}>
            <TextV2
              text="Статистика изучения типов данных"
              style={{
                fontWeight: 700,
                fontSize: 26,
              }}
            />
          </div>
          <div
            style={{
              width: "calc(100% - 160px)",
              height: "80%",
              overflow: "auto",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0px 8px 13px rgba(0, 0, 0, 0.07)",
              borderRadius: 2,
              marginLeft: 80,
              marginRight: 80,
            }}
          >
            <div style={{ height: 20 }} />
            {store.jsonStatisticUsage !== undefined ? (
              <>
                {Object.keys(store.jsonStatisticUsage!).map((type) => {
                  return (
                    <>
                      <TypeStatisticUsage
                        type={String(type)}
                        methods={store.typeMethods(
                          // @ts-ignore
                          store.jsonStatisticUsage[type]
                        )}
                        editCallback={(target: number, method: string) =>
                          store.editCallback(target, method, type)
                        }
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      }
    />
  );
});

const TypeStatisticUsage: React.FC<{
  type: string;
  methods: {
    usageSingly: number;
    aiUsage: number;
    usageTotal: number;
    method: string;
    target: number;
    importance: number;
    isEditable: boolean;
  }[];
  editCallback: (target: number, method: string) => void;
}> = ({ type, methods, editCallback }) => {
  const [m, setM] = useState(methods);
  const [isDisabled, setDisabled] = useState(true);
  const setEditable = () => {
    setM(
      m.map((el) => {
        el.isEditable = !el.isEditable;
        return el;
      })
    );
  };
  return (
    <>
      <div
        style={{
          width: "calc(100% - 20px)",
          backgroundColor:   "#EFF4FB",
          height: 39,
          marginRight: 10,
          marginLeft: 10,
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextV2
          text={type}
          style={{
            fontWeight: 500,
            fontSize: 16,
            // paddingTop: 8,
            marginLeft: 10,
            marginRight: 5,
            // color: isDisabled ? "#aeaeae" : "black",
          }}
        />
        <div
          onClick={() => setEditable()}
          style={{
            cursor: "pointer",
            // display: isDisabled ? "none" : undefined,
          }}
        >
          <Icon type={IconType.edit} size={15} />
        </div>
      </div>
      {m.map((el) => (
        <MethodStatistic
          editCallback={(i) => editCallback(i, el.method)}
          isEditable={el.isEditable}
          usageSingly={el.usageSingly}
          aiUsage={el.aiUsage}
          usageTotal={el.usageTotal}
          method={el.method}
          target={el.target}
          importance={el.importance}
        />
      ))}
    </>
  );
};

const MethodStatistic: React.FC<{
  usageTotal: number;
  method: string;
  aiUsage: number;
  usageSingly: number;
  target: number;
  importance: number;
  isEditable: boolean;
  editCallback: (i: number) => void;
}> = ({
  method,
  usageTotal,
  aiUsage,
  usageSingly,
  target,
  importance,
  isEditable,
  editCallback,
}) => {
  const [t, setT] = useState(target);
   const plusClick = () => {
    if (t === 99) {
      return;
    }
    setT(t + 1);
    editCallback(t + 1);
  };
  const minusClick = () => {
    if (t === 0) {
      return;
    }
    setT(t - 1);
    editCallback(t - 1);
  };
  return (
    <div
      style={{
        // backgroundColor: isDisabled ? "red" : undefined,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <div style={{ height: 10 }} />
      <div
        style={{
          marginRight: 25,
          marginLeft: 25,
          width: "calc(100% - 100px)",
          height: "max-content",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {isEditable ? (
            <div style={{ width: 70, display: "flex" }}>
              <TextV2
                text={"+"}
                onClick={() => plusClick()}
                style={{
                  fontWeight: 400,
                  fontSize: 12,

                  cursor: "pointer",
                }}
              />
              <div style={{ width: 10 }} />

              <Popover
                content={<>Цель изучения</>}
                children={
                  <TextV2
                    text={t.toString()}
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                    }}
                  />
                }
              />
              <div style={{ width: 10 }} />
              <TextV2
                text={"-"}
                onClick={() => minusClick()}
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              />
            </div>
          ) : (
            <div style={{ width: 30 }}>
              <Popover
                content={<>Цель изучения</>}
                children={
                  <TextV2
                    text={t.toString()}
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      marginRight: 10,
                    }}
                  />
                }
              />
            </div>
          )}

          <div>
            <Popover
              content={<>Важность изучения метода</>}
              children={
                <div
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: importanceMapper(importance),
                    // borderRadius: 100,

                    marginRight: 10,
                  }}
                ></div>
              }
            />
          </div>
          <div style={{ marginRight: 10 }}>
            <Popover
              content={<>Изучаемый метод</>}
              children={
                <TextV2
                  text={methodMapper(method)}
                  style={{
                    fontWeight: 400,
                    fontSize: 20,
                  }}
                />
              }
            />
          </div>
          <Popover
            children={
              <TextV2
                text={mapUsage(usageTotal.toString())}
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  marginRight: 10,
                }}
              />
            }
            content={<>Всего использовано раз</>}
          />

          <Popover
            children={
              <TextV2
                text={mapUsage(usageSingly.toString())}
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  marginRight: 10,
                }}
              />
            }
            content={<>Использовано раз в задачах решенных без GPT</>}
          />
          <Popover
            content={<>Использовано раз в задачах с GPT</>}
            children={
              <TextV2
                text={mapUsage(aiUsage.toString())}
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  marginRight: 2,
                }}
              />
            }
          />
          <Icon type={IconType.aiSmall} />
        </div>
      </div>
    </div>
  );
};
function methodMapper(method: string): string {
  if (method === "parenthesisAccessOperator") {
    return "[]";
  }
  return method;
}
function importanceMapper(importance: number) {
  if (importance === 3) {
    return "#c7c7c7";
  }
  if (importance === 2) {
    return "rgb(129 129 129)";
  }
  if (importance === 1) {
    return "rgb(0 0 0)";
  }
  return "rgb(0 0 0)";
}

const mapUsage = (total: string): string => {
  if (total === "0") {
    return "zero";
  }
  return total;
};
