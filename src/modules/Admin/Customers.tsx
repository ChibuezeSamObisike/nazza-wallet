import React, { useState } from "react";

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { useQuery, useMutation, useQueryClient } from "react-query";

import AdminLayout from "./Components/AdminLayout";
import BasicTable from "shared/Table";

import AppBreadCrumb from "shared/AppBreadCrumb";
import ThreeDots from "@mui/icons-material/MoreVert";

import { getAllUsers, suspendUser } from "services/AppService";
import { AxiosError } from "axios";

import { handleAppError } from "utils/handleApiError";
import { useAlert } from "hooks/useAlert";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [totalItems, setTotalItems] = useState<number>(5);

  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const { showNotification } = useAlert();

  const { isLoading } = useQuery(
    [
      "getHistory-customers",
      {
        rowsPerPage,
        currPage: currPage + 1,
      },
    ],
    getAllUsers,
    {
      onSuccess(data) {
        console.log("Data", data);
        setTableData(data?.users);
        setPageSize(data?.paginationMeta.totalPages);

        setTotalItems(data?.paginationMeta.totalRecords);
      },
    }
  );

  const navigate = useNavigate();

  const onRowItemClick = (data: any) => {
    navigate(`/customers/${data}`);
  };

  const { mutate: SuspendUser, isLoading: mutationSuspendLoading } =
    useMutation(suspendUser, {
      onSuccess(data) {
        queryClient.invalidateQueries("getHistory-customers");
        setAnchorEl(null);
        showNotification?.("Suspended user", {
          type: "success",
        });
      },
      onError(error: AxiosError) {
        setAnchorEl(null);
        showNotification?.(handleAppError(error), {
          type: "error",
        });
      },
    });

  function createData(
    _id: string,
    name: string,
    email: string,
    phone: string,
    last_login: string,
    action: any
  ) {
    return {
      _id,
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
        _id?: string;
      }>
    ) =>
      createData(
        x?._id ?? "--",
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
              onClick={() => {
                SuspendUser(x?._id);
              }}
            >
              {mutationSuspendLoading && (
                <CircularProgress color='primary' size='24px' />
              )}
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
            count={totalItems}
            isLoading={isLoading}
            pageSize={pageSize}
            rowsPerPage={rowsPerPage}
            onRowItemClick={onRowItemClick}
            page={currPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </AdminLayout>
  );
}
