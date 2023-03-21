import React, { useState } from "react";

import { Box, Chip } from "@mui/material";

import { useQuery } from "react-query";

import AdminLayout from "./Components/AdminLayout";
import BasicTable from "shared/Table";

import AppBreadCrumb from "shared/AppBreadCrumb";

import { numberToFigure } from "utils/numberToFigure";

import { getTrades } from "services/authLogin";
import { useAlert } from "hooks/useAlert";

import { handleAppError } from "utils/handleApiError";
import getIcon from "utils/getIcon";

export default function Orders() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(0);

  const { showNotification } = useAlert();

  const lableByCode = (id: number | string): any => {
    let code = "Label";
    let sx = {};

    if (id === 0) {
      code = "In Progress";
      sx = {
        color: "#8A8CD9",
        bgcolor: "#EDEDFF",
      };
    } else if (id === 1) {
      code = "Confirmed";
      sx = {
        bgcolor: "#DEF8EE",
        color: "#4AA785",
      };
    } else if (id === 2) {
      code = "Paid out";
      sx = {
        color: "#FFC555",
        bgcolor: "#FFFBD4",
      };
    } else if (id === 3) {
      code = "Cancelled";
      sx = {
        bgcolor: "#FFE9E9",
        color: "#FF7262",
      };
    }
    return { code, sx };
  };

  function createData(
    status: string,
    name: string,
    crypto: string,
    number: string,
    price: string,
    date: string,
    network: string,
    type: string
  ) {
    return {
      status: (
        <Chip label={lableByCode(status).code} sx={lableByCode(status).sx} />
      ),
      name,
      crypto: (
        <Box display='flex' alignItems='center'>
          <img
            src={getIcon(crypto)}
            style={{ marginRight: "15px" }}
            alt='Icon'
          />
          {crypto}{" "}
          {/* <Chip
          label={type}
          sx={{
            color: getChipColor(type).text,
            bgcolor: getChipColor(type).bg,
            marginLeft: "15px",
          }}
        /> */}
        </Box>
      ),
      number,
      price,
      date,
      network,
    };
  }

  const { isLoading } = useQuery(
    [
      "getTrades",
      {
        rowsPerPage,
        currPage: currPage + 1,
      },
    ],
    getTrades,
    {
      onSuccess(data) {
        console.log("Data table", data);
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);
        setRowsPerPage(data?.paginationMeta.totalRecords);
      },
      onError(err) {
        console.log("table error", err);
        showNotification?.(handleAppError(err), {
          type: "error",
        });
      },
    }
  );

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?.status,
      x?.user?.name,
      x?.coin?.name,
      `${x?.amount} ${x?.coin?.name}`,
      `N ${numberToFigure(x?.amount_ngn)}`,
      `${x?.createdAt.split("T")[0]}`,
      `${x?.coin.network}`,
      "Deposit"
    )
  );

  const columns = [
    { key: "name" },
    { key: "crypto", align: "" },
    { key: "number" },
    { key: "status" },
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
              current='Orders'
              links={[{ link: "/admin", title: "Home" }]}
            />
          </div>
          <BasicTable
            rows={dataTable}
            columns={columns}
            isLoading={isLoading}
            pageSize={pageSize}
            rowsPerPage={rowsPerPage}
            page={currPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </AdminLayout>
  );
}
