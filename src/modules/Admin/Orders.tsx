import React, { useState } from "react";

import {
  Box,
  Chip,
  Typography,
  IconButton,
  Button,
  Modal,
  LinearProgress,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NorthIcon from "@mui/icons-material/North";

import { pxToRem } from "utils/pxToRem";

import lableByCode from "utils/labelByCode";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import http from "utils/http";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [openID, setOpenID] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [totalItems, setTotalItems] = useState<number>(5);

  const { showNotification } = useAlert();

  const onRowItemClick = (id: string) => {
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
            src={getIcon(crypto.toUpperCase())}
            style={{ marginRight: "15px" }}
            alt='Icon'
          />
          {crypto?.toUpperCase()}{" "}
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
        setModalData(data);
      },
      onError(err) {
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
        console.log("Crypto trades data", data);
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);

        setTotalItems(data?.paginationMeta.totalRecords);
      },
      onError(err) {
        showNotification?.(handleAppError(err), {
          type: "error",
        });
      },
    }
  );

  const queryClient = useQueryClient();

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?._id,
      x?.status,
      `${x?.user?.name} ${x?.user?.lastname}`,
      x?.coin,
      `${x?.amount}`,
      `N ${numberToFigure(x?.amount_ngn)}`,
      `${x?.createdAt.split("T")[0]}`,
      x?.network.toUpperCase(),
      "Deposit"
    )
  );

  const deleteBankMute = useMutation(
    (id: string | number) => {
      return http.put(`admin/trade/${id}`);
    },
    {
      onSuccess() {
        showNotification?.("Successfully Paid out", {
          type: "success",
        });

        queryClient.invalidateQueries("getTrade2");
      },
      onError(error: AxiosError) {
        showNotification?.(handleAppError(error), {
          type: "error",
        });
      },
    }
  );

  const columns = [
    { key: "name" },
    { key: "crypto", align: "" },
    { key: "number", title: "Amount" },
    { key: "status" },
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
  return (
    <>
      <Modal open={modal} onClose={onClose}>
        <Box
          width={{ md: "30%", xs: "85%" }}
          borderRadius='13px'
          p={4}
          mt='4%'
          // minHeight='40%'
          bgcolor='#fff'
          mx='auto'
        >
          {isTradeLoading && <LinearProgress />}
          {!isTradeLoading && (
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
                  {modalData?.amount.toFixed(4)}
                  <span
                    style={{
                      fontSize: pxToRem(13),
                    }}
                  >
                    BTC
                  </span>
                </Typography>

                {/* <Typography color='#5D5C63'> 1 BTC ~ NGN 747.5</Typography> */}
                {renderPrice("Coin", `${modalData?.network}`)}
                {renderPrice("Network", `${modalData?.network}`)}
                {renderPrice("Receipients", modalData?.user?.email)}
                {renderPrice("Contact", modalData?.user?.phone)}
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
                  <div>{modalData?.amount_ngn}</div>
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
                      {modalData?.bank?.acc_number}
                    </span>
                    {modalData?.bank?.bank_name}
                  </div>
                )}
                {renderPrice(
                  "Status",
                  <Chip
                    label={lableByCode(modalData?.status).code}
                    sx={lableByCode(modalData?.status).sx}
                  />
                )}
                {renderPrice(
                  "Date",
                  `${moment(new Date(modalData?.createdAt)).format(
                    "Do MMM YYYY, h:mm a"
                  )}`
                )}

                <Button
                  onClick={() => deleteBankMute.mutate(openID)}
                  startIcon={
                    deleteBankMute?.isLoading && (
                      <CircularProgress
                        size={16}
                        sx={{
                          fontSize: 2,
                          color: "#fff",
                        }}
                      />
                    )
                  }
                  fullWidth
                >
                  Confirm Transaction
                </Button>

                <Button
                  sx={{
                    mt: 2,
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
      <AdminLayout>
        <Box>
          <Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              mb={2}
            >
              <Typography>Orders</Typography>
              <TextField
                placeholder='Search'
                sx={{
                  bgcolor: "grey.100",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              mb={2}
            >
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                width='20%'
              >
                <Typography>All</Typography>
                <Typography
                  sx={{
                    opacity: "0.5",
                    cursor: "pointer",
                  }}
                >
                  Sell
                </Typography>
                <Typography
                  sx={{
                    opacity: "0.5",
                    cursor: "pointer",
                  }}
                >
                  Buy
                </Typography>
                <Typography
                  sx={{
                    opacity: "0.5",
                    cursor: "pointer",
                  }}
                >
                  Swap
                </Typography>
              </Box>
              <Box>
                <Button variant='text' sx={{ mr: 2 }}>
                  <KeyboardArrowDownIcon />
                  Today
                </Button>
                <Button variant='text'>
                  <NorthIcon
                    sx={{
                      mr: 1,
                      fontWeight: 400,
                    }}
                  />{" "}
                  Export report
                </Button>
              </Box>
            </Box>
            <BasicTable
              rows={dataTable}
              columns={columns}
              isLoading={isLoading}
              count={totalItems}
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

export function AppModal({
  open,
  onClose,
  loading,
  data,
  onConfirmClick,
}: any) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        width={{ md: "30%", xs: "85%" }}
        borderRadius='13px'
        p={4}
        mt='4%'
        // minHeight='40%'
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
                {data?.amount.toFixed(4)}
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

              {data?.status !== 2 ? (
                <Button onClick={() => onConfirmClick?.()} fullWidth>
                  Confirm Transaction
                </Button>
              ) : null}

              <Button
                sx={{
                  mt: 2,
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
