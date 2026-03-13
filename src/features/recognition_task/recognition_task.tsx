import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { RecognitionTaskStore } from "./recognition_task_store";
import { SelectAll } from "./ui/select_all";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const RecognitionTaskPath = "/recognition/category/";
export const RecognitionTask = observer(() => {
  const store = useStore(RecognitionTaskStore);
  const param = useParams();

  useEffect(() => {
    store.initParam(param.id as string, param.type as string);
  }, [param.id, param.type]);
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
              {store.viewModel !== undefined ? (
                <>
                  <SelectAll
                    storeParrent={store}
                    selectAllModel={{
                      code: store.viewModel.code,
                      ranges: store.viewModel.getTaskRanges(),
                    }}
                    type={store.viewModel.subCategory}
                    subType={store.viewModel.comonCategory}
                    task={store.viewModel.taskDescription}
                    index={store.viewModel.index}
                    count={store.viewModel.count}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        }
      />
    </>
  );
});
