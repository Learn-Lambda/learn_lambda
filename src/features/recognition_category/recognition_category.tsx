import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { RecognitionCategoryStore } from "./recognition_category_store";
import { SelectAll } from "./ui/select_all";

export const RecognitionCategoryPath = "/recognition/category";
export const RecognitionCategory = observer(() => {
  const store = useStore(RecognitionCategoryStore);
  return (
    <>
      <Page
        pageStore={store}
        children={
          <>
            <div
              style={{
                paddingTop: 50,
                marginLeft: 80,
                height: "calc(100% - 73px - 37px)",
              }}
            >
              {true ? (
                <>
                  <SelectAll
                    selectAllModel={{
                      code: "export const p = (p:string) =>{\n\n}\n\n\nfunction p1(a:number){\n\n}\n\np('')\np1(1)\n",
                      ranges: [
                        [
                          {
                            startLineNumber: 10,
                            startColumn: 1,
                            endLineNumber: 10,
                            endColumn: 2,
                          },
                        ],
                        [
                          {
                            startLineNumber: 11,
                            startColumn: 1,
                            endLineNumber: 11,
                            endColumn: 3,
                          },
                        ],
                      ],
                    }}
                  />
                </>
              ) : (
                <>
                  <div style={{ display: "flex" }}>
                    <TextV2
                      text={`Функции 10 тем из 20`}
                      style={{
                        fontWeight: 700,
                        fontSize: 26,
                      }}
                    />
                  </div>
                  {store.viewModel.topics.map((el) => (
                    <TextV2
                      style={{
                        width: "100%",
                        margin: 10,
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                      text={el.name}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        }
      />
    </>
  );
});
