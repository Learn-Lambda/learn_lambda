import React, { useState } from "react";
import { TextV2 } from "../text/text";
import { makeAutoObservable } from "mobx";
import Popover from "../popover/popover";
import { Hover } from "../hover/hover";

const mouths: { name: string; num: number }[] = [
  { name: "Январь", num: 0 },
  { name: "Февраль", num: 1 },
  { name: "Март", num: 2 },
  { name: "Апрель", num: 3 },
  { name: "Май", num: 4 },
  { name: "Июнь", num: 5 },
  { name: "Июль", num: 6 },
  { name: "Август", num: 7 },
  { name: "Сентябрь", num: 8 },
  { name: "Октябрь", num: 9 },
  { name: "Ноябрь", num: 10 },
  { name: "Декабрь", num: 11 },
];
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
const mountToLocale = (mouth: number): string => {
  const m = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июля",
    6: "июня",
    7: "августа",
    8: "сентярбря",
    9: "октября",
    10: "ноября",
    11: "декабря",
  };
  // @ts-ignore
  return m[mouth] as string;
};
class CalendarState {
  year: number = 0;
  columns?: {
    columnNumber: number;
    date: Date;
    isActive: boolean;
    activityCount?: number;
  }[][][];
  activities?: {
    date: string;
    count: number;
  }[];
  constructor(
    year: number,
    activities: {
      date: Date;
      count: number;
    }[]
  ) {
    this.activities = activities.map((el) => {
      return {
        date: `${el.date.getFullYear()}.${el.date.getMonth()}.${el.date.getDate()}`,
        count: el.count,
      };
    });
    this.year = year;
    makeAutoObservable(this);
    this._init();
  }
  _init() {
    const columns = mouths
      .map((mounts) =>
        Array.from(Array(getDaysInMonth(this.year, mounts.num)).keys())
          .map((el) => el + 1)
          .map((subEl) => new Date(this.year, mounts.num, subEl))
      )
      .map((el) => {
        let currentIndex = 0;
        let counter = 0;
        return el.map((subEl) => {
          if (counter === 5) {
            currentIndex += 1;
            counter = 0;
          }
          counter += 1;
          const isActive =
            this.activities?.find(
              (el) =>
                el.date ===
                `${subEl.getFullYear()}.${subEl.getMonth()}.${subEl.getDate()}`
            ) !== undefined;
          return {
            columnNumber: currentIndex,
            date: subEl,

            activityCount: isActive
              ? this.activities?.find(
                  (el) =>
                    el.date ===
                    `${subEl.getFullYear()}.${subEl.getMonth()}.${subEl.getDate()}`
                )?.count
              : null,
            isActive: isActive,
          };
        });
      });

    this.columns = columns.map((el) => {
      const newColumns: {
        columnNumber: number;
        date: Date;
        isActive: boolean;
      }[][] = [];
      el.map((subElement) => {
        newColumns.atR(subElement.columnNumber).fold(
          (s) => {
            newColumns.at(subElement.columnNumber)!.push(subElement);
          },
          (_) => {
            newColumns[subElement.columnNumber] = [];
            newColumns.at(subElement.columnNumber)!.push(subElement);
          }
        );
      });
      return newColumns;
    });
  }
}

const Activity: React.FC<{
  num: number;
  date: Date;
  isActive: boolean;
  activityCount?: number;
}> = ({ num, date, activityCount, isActive }) => {
  return (
    <Popover
      children={
        <div
          style={{
            width: 14,
            height: 14,
            backgroundColor: isActive ? "#10B981" : "#DEE4EE",
            margin: 2,
            fontSize: 5,
            border: ".5px solid #DEE4EE",

            borderRadius: 4,
          }}
        ></div>
      }
      content={
        <div style={{ width: "max-content" }}>
          {activityCount ? (
            <>
              <TextV2
                text={`${activityCount} активностей ${date.getDate()}${" "}
              ${mountToLocale(date.getMonth())}`}
              />
            </>
          ) : (
            <>
              <TextV2
                text={`нету активности ${date.getDate()} ${mountToLocale(
                  date.getMonth()
                )}`}
              />
            </>
          )}
        </div>
      }
    ></Popover>
  );
};
export const CalendarGit: React.FC<{
  year: number;
  years: number[];
  activities: {
    date: Date;
    count: number;
  }[];
  selectYear: (year: number) => void;
}> = ({ year, activities, years, selectYear }) => {
  const [store] = useState(() => new CalendarState(year, activities));

  return (
    <div
      style={{ width: 1200, height: 200, overflow: "auto", display: "flex" }}
    >
      <div style={{ display: "flex" }}>
        {mouths.map((el, i) => (
          <div>
            <TextV2
              key={i}
              text={el.name}
              style={{ padding: 5, fontWeight: 300 }}
            />
            <div>
              {store.columns?.at(i)?.map((el) => {
                return (
                  <div style={{ display: "flex" }}>
                    {el.map((sub) => (
                      <Activity
                        isActive={sub.isActive}
                        date={sub.date}
                        activityCount={sub.activityCount}
                        num={sub.columnNumber}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div>
        {years.reverse().map((el) => (
          <div onClick={() => selectYear(el)}>
            <Hover
              defaultColor={el === year ? "#33c658" : undefined}
              hoverColor="#dddddd82"
              style={{ padding: 10, borderRadius: 5 }}
              children={<>{el}</>}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
