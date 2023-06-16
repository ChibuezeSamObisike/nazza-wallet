import AppTable from "shared/Table";
import TextTag from "shared/TextTag";

import { getHistory } from "services/AppService";
import { useQuery } from "react-query";
import { createData } from "shared/Table";
import { useState } from "react";
import { numberToFigure } from "utils/numberToFigure";
import { getTotalPayout } from "services/AppService";

export default function AllTransactions() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [payOutData, setPayOutData] = useState<any | null | undefined>(null);

  const { isLoading } = useQuery(
    [
      "getHistory",
      {
        rowsPerPage,
        currPage: currPage + 1,
      },
    ],
    getHistory,
    {
      onSuccess(data) {
        console.log("Data table", data);
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);
        setRowsPerPage(data?.paginationMeta.totalRecords);
      },
      onError(err) {
        console.log("Table error", err);
      },
    }
  );

  const { isLoading: isTotalCardLoading } = useQuery(
    "getTotalPayout",
    getTotalPayout,
    {
      onSuccess(data) {
        setPayOutData(data);
      },
    }
  );

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?.coin?.name,
      `${x?.amount} ${x?.coin?.name}`,
      `N ${numberToFigure(x?.amount_ngn)}`,
      `${x?.createdAt.split("T")[0]}`,
      `${x?.coin.network}`,
      "Deposit"
    )
  );

  const columns = [
    { key: "crypto", align: "" },
    { key: "number" },
    { key: "price" },
    { key: "date" },
    { key: "network" },
  ];

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log("Page No>>", Event);
    setCurrPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change Page row", event?.target?.value);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  return (
    <div style={{ marginTop: "40px" }}>
      <TextTag label='Transaction history' />
      <div style={{ marginBottom: "50px" }}></div>
      <AppTable
        rows={dataTable}
        columns={columns}
        isLoading={isLoading}
        pageSize={pageSize}
        rowsPerPage={rowsPerPage}
        page={currPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
