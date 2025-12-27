import { useEffect, useState } from "react";
import { IPagination } from "../../model/pagination";
import { Icon, IconType } from "../icon/icon";
import { TextV2 } from "../text/text";

export const Pagination: React.FC<{
  pagination: IPagination<any>;
  nextPage?: Function;
  prevPage?: Function;
  selectPage?: (value: number) => void;
}> = ({ pagination, nextPage, prevPage, selectPage }) => {
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        onClick={() => {
          if (pagination.currentPage === 1) {
            return;
          }
          prevPage?.();
        }}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <Icon type={IconType.chevronDown} />
      </div>
      <div style={{ width: 10 }} />

      {pagination.currentPage === pagination.totalPages ? (
        <TextV2 text={pagination.currentPage.toString()} color="#64748B" />
      ) : (
        <>
          <NumberPagination pagination={pagination} selectPage={selectPage} />
        </>
      )}
      <div style={{ width: 10 }} />

      <div
        onClick={() => {
          if (pagination.currentPage !== pagination.totalPages) {
            nextPage?.();
          }
        }}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <Icon type={IconType.chevronUp} />
      </div>
    </div>
  );
};
export const NumberPagination: React.FC<{
  pagination: IPagination<any>;
  selectPage?: (value: number) => void;
}> = ({ pagination, selectPage }) => {
  const [numbers, setNumbers] = useState<
    { value: string; isActive: boolean }[]
  >([]);
  useEffect(() => {
    setNumbers(
      Array.from({ length: 5 }, (v, i) => i + 1).map((el) => {
        return {
          value: `${el}`,
          isActive: pagination.currentPage === el,
        };
      })
    );
  }, [pagination]);
  return (
    <>
      {numbers.map((el, i) => (
        <TextV2
          key={i}
          onClick={() => selectPage?.(Number(el.value))}
          text={el.value}
          color={el.isActive ? "#020d1dff" : "#64748B"}
          style={{ margin: 5, cursor: "pointer" }}
        />
      ))}
    </>
  );
};
