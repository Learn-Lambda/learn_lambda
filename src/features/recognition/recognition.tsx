import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { RecognitionStore } from "./recognition_store";
import { Page } from "../../core/ui/page/Page";
export const RecognitionPath = "/recognition";
export const Recognition = observer(() => {
  const store = useStore(RecognitionStore);
  return (
    <>
      <Page pageStore={store} children={<></>} />
    </>
  );
});
