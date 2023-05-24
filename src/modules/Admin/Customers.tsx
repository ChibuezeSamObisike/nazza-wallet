import React, { useState } from "react";

import { Box, IconButton, Menu, MenuItem } from "@mui/material";

import { useQuery } from "react-query";

import AdminLayout from "./Components/AdminLayout";
import BasicTable from "shared/Table";

import AppBreadCrumb from "shared/AppBreadCrumb";
import ThreeDots from "@mui/icons-material/MoreVert";

import { getAllUsers } from "services/AppService";

export default function Customers() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [payOutData, setPayOutData] = useState<any | null | undefined>(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

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

  function createData(
    name: string,
    email: string,
    phone: string,
    last_login: string,
    action: any
  ) {
    return {
      name,
      email,
      phone,
      last_login,
      action,
    };
  }

  const dataTable = tableData?.map(
    (
      x: Partial<{
        name: string;
        email: string;
        phone?: string;
        last_login?: string;
      }>
    ) =>
      createData(
        x?.name ?? "--",
        x?.email ?? "--",
        x?.phone ?? "--",
        x?.last_login?.split("T")[0] ?? "--",
        <Box display='flex' justifyContent='flex-end'>
          <IconButton
            onClick={(event) => {
              handleClick(event);
            }}
          >
            <ThreeDots />
          </IconButton>

          <Menu
            elevation={0}
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            sx={{ boxShadow: "none" }}
          >
            <MenuItem
              sx={{
                color: "red",
              }}
            >
              Suspend users
            </MenuItem>

            <MenuItem>See activity </MenuItem>
          </Menu>
        </Box>
      )
  );

  const columns = [
    { key: "name", align: "" },
    { key: "email" },
    { key: "phone" },
    { key: "last_login" },
    { key: "action" },
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
