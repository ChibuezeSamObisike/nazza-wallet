import AppTable from "shared/Table";
import TextTag from "shared/TextTag";

import { useGetUser } from "contexts/UserProvider";

import { getHistory } from "services/AppService";
import { useQuery } from "react-query";
import { createData } from "shared/Table";
import { useState } from "react";
import { numberToFigure } from "utils/numberToFigure";
import { getTotalPayout, getProfileDetails } from "services/AppService";
import { pxToRem } from "utils/pxToRem";
import { convertToSentenceCase } from "hooks/sentenceCase";

function App() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [totalItems, setTotalItems] = useState<number>(5);
  const [payOutData, setPayOutData] = useState<any | null | undefined>(null);

  const { isLoading, data: historyData } = useQuery(
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
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);
        setTotalItems(data?.paginationMeta.totalRecords);
        // setRowsPerPage(data?.paginationMeta.totalRecords);
      },
      onError(err) {},
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
      x?.coin.toUpperCase(),
      `${x?.amount.toFixed(4)} ${x?.coin.toUpperCase()}`,
      `N ${numberToFigure(x?.amount_ngn)}`,
      `${x?.createdAt.split("T")[0]}`,
      `${convertToSentenceCase(x?.network)}`,
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
    setCurrPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const { data } = useQuery("fetchUserDetails", getProfileDetails, {
    onSuccess(data) {},
  });
  return (
    <div>
      <div>
        <TextTag label='All transactions' />

        <AppTable
          rows={dataTable}
          data={historyData}
          count={totalItems}
          columns={columns}
          isLoading={isLoading}
          pageSize={pageSize}
          rowsPerPage={rowsPerPage}
          page={currPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default App;
