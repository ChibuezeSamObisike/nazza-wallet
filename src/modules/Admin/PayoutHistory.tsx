import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import AdminLayout from "./Components/AdminLayout";
import BasicTable from "shared/Table";

import AppBreadCrumb from "shared/AppBreadCrumb";

import { numberToFigure } from "utils/numberToFigure";

import { getHistory } from "services/authLogin";
import { createData } from "shared/Table";

export default function PayoutHistory() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [payOutData, setPayOutData] = useState<any | null | undefined>(null);

  // const { isLoading, isFetching } = useQuery(
  //   [
  //     "getHistory",
  //     {
  //       rowsPerPage,
  //       currPage: currPage + 1,
  //     },
  //   ],
  //   getHistory,
  //   {
  //     onSuccess(data) {
  //       console.log("Data table", data);
  //       setTableData(data?.trades);
  //       setPageSize(data?.paginationMeta.totalPages);
  //       setRowsPerPage(data?.paginationMeta.totalRecords);
  //     },
  //   }
  // );

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
    <AdminLayout>
      <Box>
        <Box>
          <div
            style={{
              marginBottom: "50px",
            }}
          >
            <AppBreadCrumb
              current='Payout History'
              links={[{ link: "/admin", title: "Home" }]}
            />
          </div>
          {/* <BasicTable
            rows={dataTable}
            columns={columns}
            isLoading={isLoading || isFetching}
            pageSize={pageSize}
            rowsPerPage={rowsPerPage}
            page={currPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        </Box>
      </Box>
    </AdminLayout>
  );
}
