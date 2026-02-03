import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { RecognitionStore } from "./recognition_store";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
export const RecognitionPath = "/recognition";
export const Recognition = observer(() => {
  const store = useStore(RecognitionStore);
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
                  text={`10%`}
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
                  gridTemplateColumns: "auto auto auto",
                    // grid-template-columns: 90px 90px;

                }}
              >
                {store.recognitionModels.map((el) => (
                  <div
                    style={{
                      padding: 30,
                      width: "max-content",
                      backgroundColor: "white",
                      borderRadius: 5,
                      margin: 10,
                      cursor: "pointer",
                      boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <TextV2
                        text={el.name}
                        style={{
                          fontWeight: 500,
                          fontSize: 20,
                        }}
                      />
                      <div style={{ width: 5 }} />
                      <TextV2
                        text={`50%`}
                        style={{
                          fontWeight: 700,
                          fontSize: 20,
                          color: "#8000ff",
                        }}
                      />
                    </div>
                    <div style={{ height: 5 }} />
                    <TextV2
                      text={`Зачетов по темам получено ${el.whatHasBeenPassed()}`}
                      style={{
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        }
      />
    </>
  );
});
