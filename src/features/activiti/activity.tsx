import { useStore } from "../../core/helper/use_store";
import { Page } from "../../core/ui/page/Page";
import { ActivityStore } from "./activity_store";

export const ActivityPath = "/activity";
export const Activity = () => {
  const store = useStore(ActivityStore);
  return <Page pageStore={store} children={<>Activity</>} />;
};
