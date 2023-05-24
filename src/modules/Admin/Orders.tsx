import React, { useState } from "react";

import {
  Box,
  Chip,
  Typography,
  IconButton,
  Button,
  Modal,
  LinearProgress,
} from "@mui/material";
import { pxToRem } from "utils/pxToRem";

import lableByCode from "utils/labelByCode";

import { useQuery } from "react-query";

import AdminLayout from "./Components/AdminLayout";
import BasicTable from "shared/Table";

import AppBreadCrumb from "shared/AppBreadCrumb";

import { numberToFigure } from "utils/numberToFigure";

import { getTrades, getTrade } from "services/AppService";
import { useAlert } from "hooks/useAlert";

import { handleAppError } from "utils/handleApiError";
import getIcon from "utils/getIcon";
import { renderPrice } from "components/modals/ConfirmSell";

import moment from "moment";

import ClearIcon from "@mui/icons-material/Clear";

export default function Orders() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [openID, setOpenID] = useState<string>();
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>();

  const { showNotification } = useAlert();

  const onRowItemClick = (id: string) => {
    console.log("Row ID", id);
    setOpenID(id);
    setModal(true);
  };

  const onClose = () => {
    setOpenID("");
    setModal(false);
  };

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
    _id: string,
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
        </Box>
      ),
      number,
      price,
      date,
      network,
      _id,
    };
  }
  const { isLoading: isTradeLoading } = useQuery(
    [
      "getTrade1",
      {
        id: openID,
      },
    ],
    getTrade,
    {
      enabled: !!openID && openID !== "",
      onSuccess(data) {
        console.log("Orders", data);
        setModalData(data);
      },
      onError(err) {
        console.log("table error", err);
        showNotification?.(handleAppError(err), {
          type: "error",
        });
      },
    }
  );

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
        console.log("Data table1", data);
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
      x?._id,
      x?.status,
      x?.user?.name,
      x?.network,
      `${x?.amount}`,
      `N ${numberToFigure(x?.amount_ngn)}`,
      `${x?.createdAt.split("T")[0]}`,
      x?.network,
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
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  return (
    <>
      <AppModal
        loading={isTradeLoading}
        open={modal}
        onClose={onClose}
        data={modalData}
      />
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
              onRowItemClick={onRowItemClick}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </AdminLayout>
    </>
  );
}

export function AppModal({ open, onClose, loading, data }: any) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        width={{ md: "30%", xs: "85%" }}
        borderRadius='13px'
        p={4}
        mt='10%'
        minHeight='40%'
        bgcolor='#fff'
        mx='auto'
      >
        {loading && <LinearProgress />}
        {!loading && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={() => onClose()}>
                <ClearIcon
                  sx={{
                    fontSize: "40px",
                  }}
                />
              </IconButton>
            </Box>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: pxToRem(39),
                  fontWeight: "bold",
                }}
              >
                {data?.amount}
                <span
                  style={{
                    fontSize: pxToRem(13),
                  }}
                >
                  BTC
                </span>
              </Typography>

              {/* <Typography color='#5D5C63'> 1 BTC ~ NGN 747.5</Typography> */}
              {renderPrice("Coin", `${data?.network}`)}
              {renderPrice("Network", `${data?.network}`)}
              {renderPrice("Receipients", data?.user?.email)}
              {renderPrice("Contact", data?.user?.phone)}
              {renderPrice(
                <div>
                  Amount Paid{" "}
                  <span
                    style={{
                      color: "#9DAAD2",
                    }}
                  >
                    (by One liquidity)
                  </span>
                </div>,
                <div>{data?.amount_ngn}</div>
              )}
              {renderPrice(
                "Cash destination",
                <div>
                  {" "}
                  <span
                    style={{
                      color: "#5797FF",
                      marginRight: "10px",
                    }}
                  >
                    {data?.bank?.acc_number}
                  </span>
                  {data?.bank?.bank_name}
                </div>
              )}
              {renderPrice(
                "Status",
                <Chip
                  label={lableByCode(data?.status).code}
                  sx={lableByCode(data?.status).sx}
                />
              )}
              {renderPrice(
                "Date",
                `${moment(new Date(data?.createdAt)).format(
                  "Do MMM YYYY, h:mm a"
                )}`
              )}

              <Button
                sx={{
                  mt: 4,
                }}
                fullWidth
                variant='outlined'
                onClick={() => onClose?.()}
              >
                Close
              </Button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
}
