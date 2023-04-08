import React, { useState } from "react";

import { Box } from "@mui/material";

import { useQuery } from "react-query";

import AdminLayout from "./Components/AdminLayout";
import BasicTable from "shared/Table";

import AppBreadCrumb from "shared/AppBreadCrumb";

import { getAllUsers } from "services/AppService";

export default function Customers() {
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
    getAllUsers,
    {
      onSuccess(data) {
        console.log("Data table", data);
        setTableData(data?.users);
        setPageSize(data?.paginationMeta.totalPages);
        setRowsPerPage(data?.paginationMeta.totalRecords);
      },
    }
  );

  function createData(name: string, email: string, phone: string) {
    return {
      name,
      email,
      phone,
    };
  }

  const dataTable = tableData?.map(
    (x: Partial<{ name: string; email: string; phone?: string }>) =>
      createData(x?.name ?? "--", x?.email ?? "--", x?.phone ?? "--")
  );

  const columns = [
    { key: "name", align: "" },
    { key: "email" },
    { key: "phone" },
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
              links={[{ link: "/admin", title: "Customers" }]}
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
