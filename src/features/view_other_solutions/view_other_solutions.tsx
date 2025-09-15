import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { ViewOtherSolutionStore } from "./view_other_solutions_store";
import { Page } from "../../core/ui/page/Page";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextV2 } from "../../core/ui/text/text";
import { Complexity } from "../../core/ui/complexity/complexity";
import { TrainPath } from "../train/train";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
export const ViewOtherSolutionPath = "/other/solution/";

export const ViewOtherSolution = observer(() => {
  const store = useStore(ViewOtherSolutionStore);
  const { id } = useParams();
  const n = useNavigate();
  useEffect(() => {
    store.initParam(id as string);
  }, []);
  return (
    <Page
      pageStore={store}
      children={
        <div style={{ width: "100%", height: "100%", padding: 20 }}>
          <Card
            children={
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  padding: 10,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Complexity complexity={store.task?.complexity ?? 1} />
                  <div style={{ width: 20 }} />
                  <TextV2 text={store.task?.name} color="white" />
                </div>
                <div style={{ display: "flex" }}>
                  <TextV2
                    text={"Решать задачу снова"}
                    onClick={() => store.solveTheProblemAgain()}
                    color="white"
                    style={{
                      fontWeight: 100,
                      height: 30,
                      border: "2px solid #5C83C2",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  />
                  <div style={{ width: 10 }} />
                  <TextV2
                    onClick={() => n(TrainPath)}
                    text={"Следующая задача"}
                    color="white"
                    style={{
                      height: 30,
                      background: "#5C83C2",
                      border: "2px solid #5C83C2",
                      borderRadius: 6,
                      fontWeight: 100,
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            }
          />

          <div style={{ height: 50 }} />
          <div style={{ width: 100 }}>
            {store.solutions
              ?.filter((el, i) => i === 1) 
              .map((el) => (
                // <SyntaxHighlighter
                //   customStyle={{ width: "calc(100% - 80px)" }}
                //   language="typescript"
                //   style={okaidia}
                // >
                //   {"123"}
                // </SyntaxHighlighter>
                <div style={{ width: 100 }}>132</div>
              ))}
          </div>
        </div>
      }
    />
  );
});
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      height: 96,
      width: "100%",
      backgroundColor: "#1C2434",
      borderRadius: 19,
    }}
  >
    {children}
  </div>
);

const CardExpanded: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!isOpen)}
        style={{
          height: 96,
          width: "100%",
          backgroundColor: "#1C2434",
          borderRadius: 19,
          cursor: "pointer",
        }}
      >
        {children}
      </div>
      {isOpen ? (
        <div
          style={{
            marginLeft: 20,
            marginRight: 20,
            paddingTop: 20,
            backgroundColor: "#5d82c2",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          123
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
