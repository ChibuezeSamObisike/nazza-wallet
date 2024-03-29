import React, { useState } from "react";
import AdminLayout from "./Components/AdminLayout";
import {
  Box,
  Typography,
  Button,
  Chip,
  Modal,
  TextField,
  InputAdornment,
  FormControl,
  MenuItem,
  Select,
  Alert,
  IconButton,
} from "@mui/material";

import QRCode from "react-qr-code";

import { useQuery } from "react-query";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ScheduleIcon from "@mui/icons-material/Schedule";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import TextTag from "shared/TextTag";

import {
  getAdminStats,
  getWallets as getTrades,
  getTrade,
} from "services/AppService";

import { pxToRem } from "utils/pxToRem";

import BasicTable from "shared/Table";

import { useAlert } from "hooks/useAlert";
import { handleAppError } from "utils/handleApiError";
import { getAllWallets } from "services/AppService";

import { AppModal } from "./Orders";

export default function Wallet() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [adminStats, setAdminStats] = useState<any | null | undefined>(null);
  const [openID, setOpenID] = useState<string>();
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>();

  const [transferType, setTransferType] = useState("USDT");

  const [openAddFunds, setOpenAddFunds] = useState<boolean>(false);

  const { showNotification } = useAlert();

  const onRowItemClick = (id: string) => {
    setOpenID(id);
    setModal(true);
  };

  const onClose = () => {
    setOpenID("");
    setModal(false);
  };

  function createData(
    _id: string,
    name: string,
    crypto: string,
    number: string,
    price: string,
    date: string,
    network: string,
    type: string
  ) {
    return {
      name,
      crypto: (
        <Box display='flex' alignItems='center'>
          {/* <img
            src={getIcon(crypto)}
            style={{ marginRight: "15px" }}
            alt='Icon'
          /> */}
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
      _id,
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
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);
        setRowsPerPage(data?.paginationMeta.totalRecords);
      },
      onError(err) {
        showNotification?.(handleAppError(err), {
          type: "error",
        });
      },
    }
  );

  useQuery("getAdminStats", getAdminStats, {
    onSuccess(data) {
      setAdminStats(data);
    },
  });

  const { data } = useQuery("getWalletStats", getAllWallets, {
    onSuccess(data) {
      console.log("Wallet stats", data);
    },
  });

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?._id,
      x?.user?.name,
      x?.network,
      x?.user?.name,
      x?.amount_ngn,
      x?.createdAt.split("T")[0],
      x?.network,
      x?.network
    )
  );

  const { isLoading: isTradeLoading } = useQuery(
    [
      "getTrade2",
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

  const columns = [
    { key: "name" },
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

  const getColorByCurrency = (curr: string): string => {
    let bgcolor: string = "";
    if (curr === "USDT") {
      bgcolor = "#EBEBEB";
    } else if (curr === "BTC") {
      bgcolor = "#FFE9D4";
    } else if (curr === "ETH") {
      bgcolor = "#DEF8EE";
    }

    return bgcolor;
  };
  return (
    <>
      <Modal open={openAddFunds} onClose={() => setOpenAddFunds(false)}>
        <Box
          sx={{
            bgcolor: "#fff",
            width: "30%",
            height: "80vh",
            mx: "auto",
            mt: "80px",
            overflow: "auto",
          }}
          p={3}
        >
          <Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Box display='flex' alignItems='center'>
                <KeyboardBackspaceIcon />
                <Typography ml={2} color='#5D5C63' fontWeight='bold'>
                  Select transfer type
                </Typography>
              </Box>
              <Typography
                color='primary'
                component='button'
                onClick={() => setOpenAddFunds(false)}
              >
                Close
              </Typography>
            </Box>
            <FormControl fullWidth sx={{ my: 3 }}>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={transferType}
                onChange={(e: any) => {
                  setTransferType(e?.target?.value);
                }}
              >
                <MenuItem value={"CASH"}>Cash</MenuItem>
                <MenuItem value={"USDT"}>Crypto (USDT)</MenuItem>
              </Select>
            </FormControl>
            {transferType === "USDT" && (
              <Box>
                <Box
                  mx='auto'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Box border='1px solid #2574F5' p={2} borderRadius={"19px"}>
                    <QRCode value={"12345493030"} />
                  </Box>
                </Box>
                <TextField
                  value='12233ifhjvjkkx.....kkxnkm'
                  fullWidth
                  sx={{
                    my: 2,
                  }}
                  label='USDT (BEP 20) Address'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>
                        <ContentCopyIcon
                          sx={{
                            color: "#2574F5",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Alert
                  severity='warning'
                  sx={{
                    my: 3,
                  }}
                >
                  make sure you are sending to a TRN20 network.
                </Alert>
              </Box>
            )}
            {!(transferType === "USDT") && (
              <Box>
                <Box
                  display='flex'
                  alignItems='center'
                  my={4}
                  justifyContent='center'
                >
                  <Typography
                    color='#232D4A'
                    fontWeight='bold'
                    fontSize={pxToRem(36)}
                  >
                    9837279503
                  </Typography>{" "}
                  <IconButton
                    sx={{ ml: 3 }}
                    onClick={() => {
                      navigator.clipboard.writeText("9837279503").then(() =>
                        showNotification?.("Text copy successful", {
                          type: "success",
                        })
                      );
                    }}
                  >
                    <ContentCopyIcon
                      sx={{
                        color: "#2574F5",
                      }}
                    />
                  </IconButton>
                </Box>

                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='justify-between'
                  flexDirection='column'
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    value='Nazza Technology'
                    fullWidth
                    disabled
                    sx={{
                      my: 2,
                    }}
                    label='Account Name'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='start'>
                          <ContentCopyIcon
                            sx={{
                              color: "#2574F5",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    value='Access Bank'
                    label='Bank Name'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='start'>
                          <ContentCopyIcon
                            sx={{
                              color: "#2574F5",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      my: 2,
                    }}
                  />

                  <Box
                    display='flex'
                    my={2}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <ScheduleIcon /> <Typography>9:05</Typography>
                  </Box>
                </Box>
              </Box>
            )}
            <Button fullWidth onClick={() => setOpenAddFunds(false)}>
              I have made this payment
            </Button>
          </Box>
        </Box>
      </Modal>
      <AppModal
        loading={isTradeLoading}
        open={modal}
        onClose={onClose}
        data={modalData}
      />
      <UpdateRatesModal />
      <AdminLayout>
        <Box>
          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            mb={4}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent='space-between'
          >
            <Typography variant='body1' fontWeight={100}>
              Wallet
            </Typography>

            <Box
              sx={{
                mt: { xs: 3, md: 0 },
              }}
            >
              <Button variant='text' sx={{ mr: 2 }}>
                <KeyboardArrowDownIcon />
                Today
              </Button>
              <Button
                sx={{
                  px: 4,
                  bgcolor: "#2574F5",
                }}
                onClick={() => setOpenAddFunds(true)}
              >
                <NorthIcon
                  sx={{
                    mr: 1,
                    fontWeight: 400,
                  }}
                />{" "}
                Add Funds
              </Button>
              <Button
                sx={{
                  bgcolor: "#52C41A",
                  color: "white",
                  fontWeight: 700,
                  ":hover": {
                    bgcolor: "#52C41A",
                    color: "white",
                  },
                  ml: 3,
                  px: 4,
                }}
              >
                <SouthIcon
                  sx={{
                    mr: 1,
                    fontWeight: 400,
                  }}
                />
                Request Withdrawal
              </Button>
            </Box>
          </Box>

          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent='space-between'
            sx={{
              overflowX: "auto",
            }}
          >
            <Box width='20%'>
              <AdminCard
                bg='black'
                title='Total (Naira)'
                subText={data?.totalBalance.toFixed(2)}
                lowTxt={data?.totalBalance.toFixed(3)}
              />
            </Box>
            {data?.stats?.map((x: any) => {
              return (
                <Box width='20%'>
                  <AdminCard
                    bg={getColorByCurrency(x?.currency)}
                    title={x?.currency}
                    subText={x?.value?.toFixed(3)}
                    lowTxt={x?.balance.toFixed(3)}
                  />
                </Box>
              );
            })}
          </Box>

          <Box>
            <TextTag
              label='Recent Orders'
              isSearch
              // style={{ padding: "6px", marginBottom: "40px" }}
            />
            <BasicTable
              rows={dataTable}
              columns={columns}
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
    </>
  );
}

function AdminCard({
  bg,
  subText,
  title,
  lowTxt,
}: {
  bg: string;
  subText?: string | number;
  title?: string;
  lowTxt?: string | number;
}) {
  return (
    <Box
      bgcolor={bg}
      color={title?.toLowerCase() === "total (naira)" ? "white" : ""}
      p={3}
      borderRadius='2px'
      pr={6}
      sx={{
        width: "80%",
      }}
    >
      <Typography>{title}</Typography>
      <Typography
        fontSize={pxToRem(35)}
        color={title?.toLowerCase() === "total (naira)" ? "white" : "#001D4B"}
        fontWeight='bold'
      >
        {subText}
      </Typography>

      <Box display='flex' alignItems='center' mt={3}>
        {/* <Chip
          label={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>Today</div>
              <ExpandMoreIcon
                sx={{
                  ml: 1,
                }}
              />
            </div>
          }
          sx={{
            borderRadius: "8px",
            opacity: "50%",
          }}
        /> */}

        <Box
          display='flex'
          alignItems='center'
          sx={
            {
              // ml: 4,
            }
          }
        >
          <Typography
            fontSize={pxToRem(25)}
            color={
              title?.toLowerCase() === "total (naira)" ? "white" : "#001D4B"
            }
          >
            $ {lowTxt}
          </Typography>
          {/* <Chip
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>49%</div>
                <ExpandMoreIcon
                  sx={{
                    ml: 1,
                  }}
                />
              </div>
            }
            sx={{
              borderRadius: "8px",
              bgcolor: "#fff",
              color: "#3DA20B",
            }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}

function UpdateRatesModal() {
  return (
    <Modal open={!true}>
      <Box
        sx={{
          bgcolor: "#fff",
          width: "50%",
          height: "60%",
          mx: "auto",
          mt: "80px",
        }}
      >
        Hello worls
      </Box>
    </Modal>
  );
}
