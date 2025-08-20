import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { TrainSettingsStore } from "./train_settings_store";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { Accordion } from "../../core/ui/accordion/accordion";
import { AccordionItem } from "../../core/ui/accordion/accordion_item";

export const TrainSettingsPath = "/train/settings";

export const TrainSettings = observer(() => {
  const store = useStore(TrainSettingsStore);
  return (
    <Page
      pageStore={store}
      children={
        <>
          <div
            className="3"
            style={{
              display: "flex",
              width: "100%",
              height: "calc(100% - 73px)",
              padding: "10px 40px 10px 40px",
            }}
          >
            <>
              <div style={{ height: "100%", width: "100%" }}>
                <div
                  className="1"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TextV2
                    text="Тренировка"
                    style={{ fontSize: 26, fontWeight: 700 }}
                  />
                </div>
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
                  <Accordion   mode="multiple">
                    <AccordionItem id="item1" header="Заголовок 1">
                      Содержимое 1
                    </AccordionItem>
                    <AccordionItem id="item2" header="Заголовок 2">
                      Содержимое 2
                    </AccordionItem>
                    <AccordionItem id="item3" header="Заголовок 3">
                      Содержимое 3
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </>
          </div>
        </>
      }
    />
  );
});
