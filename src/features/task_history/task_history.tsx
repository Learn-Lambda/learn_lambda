import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { TaskHistoryStore } from "./task_history_store";

export const TaskHistoryPath = "/task/history";

export const TaskHistory = observer(() => {
  const store = useStore(TaskHistoryStore);
  return <></>;
});
