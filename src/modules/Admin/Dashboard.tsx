import React, { useEffect, useState } from "react";
import AdminLayout from "./Components/AdminLayout";
import {
  Box,
  Typography,
  Button,
  Chip,
  Modal,
  CircularProgress,
  IconButton,
  TextField,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NorthIcon from "@mui/icons-material/North";
import GenericModal from "components/modals/GenericModal";

import http from "utils/http";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAmount } from "hooks/useAmount";

import { AxiosError } from "axios";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextTag from "shared/TextTag";

import deleteGif from "assets/bank-delete.gif";
import {
  getAdminStats,
  getTrades,
  getTrade,
  getAllCoins,
  putRate,
} from "services/AppService";

import { pxToRem } from "utils/pxToRem";
import getIcon from "utils/getIcon";

import BasicTable from "shared/Table";

import { useAlert } from "hooks/useAlert";
import { handleAppError } from "utils/handleApiError";

import { AppModal } from "./Orders";
import { convertToSentenceCase } from "hooks/sentenceCase";
import { coverSomeNums } from "utils/convertNums";

export default function Dashboard() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [totalItems, setTotalItems] = useState<number>(5);
  const [adminStats, setAdminStats] = useState<any | null | undefined>(null);
  const [openID, setOpenID] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [openBank, setOpenBank] = useState<boolean>();
  const [openRates, setOpenRates] = useState(false);
  const [currCoin, setCurrCoin] = useState("USDT");
  const [rate, setRate] = useState("");
  const [allCoins, setAllCoins] = useState([]);
  const [coinID, setCoinID] = useState("");

  const queryClient = useQueryClient();

  const { showNotification } = useAlert();
  const { convertToAmount } = useAmount("USD");
  const { convertToAmount: convertToNaira } = useAmount();
  const handleInputChange = (e: any) => {
    setRate(e?.target?.value);
  };

  const onRowItemClick = (id: string) => {
    setOpenID(id);
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const closeBankModal = () => {
    setOpenBank(false);
  };

  const handleFindAndSetCoin = (coin: string) => {
    const result: any = allCoins.find(
      (x: any) => x?.name === coin.toLowerCase()
    );
    setCoinID(result?._id);
  };

  useEffect(() => {
    console.log("All coins", allCoins);
    handleFindAndSetCoin("USDT");
  }, []);

  function createData(
    type: string,
    _id: string,
    name: string,
    crypto: string,
    number: string,
    price: string,
    transaction_id: string,
    date: string,
    network: string
  ) {
    return {
      type,
      name,
      crypto: (
        <Box display='flex' alignItems='center'>
          <Box
            display='flex'
            justifyContent={"space-between"}
            alignItems='center'
          >
            <img src={getIcon(crypto.toString())} alt='' />
            <Typography ml={2}>
              {convertToSentenceCase(crypto.toString())}
            </Typography>
          </Box>
        </Box>
      ),
      number,
      transaction_id,
      price,
      date,
      network: convertToSentenceCase(network),
      _id,
    };
  }

  const { mutate, isLoading: isMutationLoading } = useMutation(putRate, {
    onSuccess() {
      queryClient.invalidateQueries("getAllCoins");
      setRate("");
      showNotification?.("Successfully updated rate", {
        type: "success",
      });
    },
    onError(error: AxiosError) {
      queryClient.invalidateQueries("getAllCoins");
      setRate("");
      showNotification?.(handleAppError(error), {
        type: "error",
      });
    },
  });

  const handleSubmit = () => {
    console.log("coin ID", coinID);
    mutate({ id: coinID, rate: Number(rate) });
  };

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
        closeBankModal();
      },
      onError(error: AxiosError) {
        showNotification?.(handleAppError(error), {
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
        console.log("Dtaa", data);
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);
        setTotalItems(data?.paginationMeta.totalRecords);
        // setRowsPerPage(data?.paginationMeta.totalRecords);
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

  const { isLoading: isCoinLoading } = useQuery("getAllCoins", getAllCoins, {
    onSuccess(data) {
      setAllCoins(data);
    },
  });

  const dataTable = tableData?.map((x: any) =>
    createData(
      "Sell",
      x?._id, //ID
      x?.user?.name, //Name
      x?.coin?.toUpperCase(), //Crypto
      x?.amount.toFixed(3), //Number
      convertToNaira(x?.amount_ngn),
      coverSomeNums(x?._id),
      x?.createdAt.split("T")[0], //Price
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
    { key: "type" },
    { key: "name" },
    { key: "crypto", align: "" },
    { key: "number" },
    { key: "price" },
    { key: "transaction_id", title: "Transaction ID" },
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
      <AppModal
        loading={isTradeLoading}
        open={modal}
        onConfirmClick={() => {
          onClose();
          setOpenBank(true);
        }}
        onClose={onClose}
        data={modalData}
      />

      <GenericModal open={openBank} close={closeBankModal}>
        <Box textAlign='center'>
          <Box>
            <img src={deleteGif} alt='delete gif' width={200} />
          </Box>
          <Typography fontWeight='bold' fontSize={pxToRem(18)}>
            Confirm Transaction
          </Typography>
          <Typography mt={3} fontWeight={300} color='#8C8B90'>
            Make sure you check profile name with users bank account name before
            you send cash.
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{
                my: 3,
              }}
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
            >
              Confirm Transaction
            </Button>
            <Button variant='outlined' onClick={() => closeBankModal()}>
              Close
            </Button>
          </div>
        </Box>
      </GenericModal>
      <UpdateRatesModal
        openRates={openRates}
        closeRates={() => setOpenRates(false)}
        isLoading={isCoinLoading}
        currCoin={currCoin}
        setCurrCoin={setCurrCoin}
        handleInputChange={handleInputChange}
        handleFindAndSetCoin={handleFindAndSetCoin}
        handleSubmit={handleSubmit}
        isMutationLoading={isMutationLoading}
      />
      <AdminLayout>
        <Box>
          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            mb={4}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent='space-between'
          >
            <Typography variant='h3' fontWeight='bold' color='#47454C'>
              Welcome, Admin
              <span className='wave'>👋</span>
            </Typography>

            <Box
              sx={{
                mt: { xs: 3, md: 0 },
              }}
            >
              <Button
                sx={{
                  px: 4,
                }}
              >
                <OpenInNewIcon
                  sx={{
                    mr: 1,
                    fontWeight: 400,
                  }}
                />{" "}
                Sell Message
              </Button>
              <Button
                onClick={() => setOpenRates(true)}
                sx={{
                  bgcolor: "#ff7262",
                  color: "white",
                  fontWeight: 700,
                  ":hover": {
                    bgcolor: "#ff7262",
                    color: "white",
                  },
                  ml: 3,
                  px: 4,
                }}
              >
                <PersonAddAltIcon
                  sx={{
                    mr: 1,
                    fontWeight: 400,
                  }}
                />
                Update Rates
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              mt: { xs: 3, md: 0 },
            }}
            mb={2}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='body1' fontWeight={100}>
              Home
            </Typography>
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

          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent='space-between'
          >
            <Box width='30%'>
              <AdminCard
                bg='#E9F1FF'
                title='Total Payout'
                subText={
                  adminStats?.totalPayoutUsd
                    ? convertToAmount(adminStats?.totalPayoutUsd)
                    : "--"
                }
              />
            </Box>
            <Box width='30%'>
              <AdminCard
                bg='#FCFFE9'
                title='Total Users'
                subText={adminStats?.totalUsers ?? "--"}
              />
            </Box>
            <Box width='30%'>
              <AdminCard
                bg='#FFE9E9'
                title='Total Clients'
                subText={adminStats?.totalClients ?? "--"}
              />
            </Box>
          </Box>

          <Box>
            <TextTag label='Recent Orders' isSearch />
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
    </>
  );
}

function AdminCard({
  bg,
  subText,
  title,
}: {
  bg: string;
  subText?: string | number;
  title?: string;
}) {
  return (
    <Box
      bgcolor={bg}
      p={3}
      borderRadius='2px'
      pr={6}
      sx={{
        width: "80%",
      }}
    >
      <Typography>{title}</Typography>
      <Typography fontSize={pxToRem(25)} color='#001D4B' fontWeight='bold'>
        {subText}
      </Typography>

      <Box display='flex' alignItems='center' mt={3}>
        <Chip
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
        />

        <Box
          sx={{
            ml: 4,
          }}
        >
          <Chip
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
          />
        </Box>
      </Box>
    </Box>
  );
}

function UpdateRatesModal({
  openRates,
  closeRates,
  currCoin,
  setCurrCoin,
  handleFindAndSetCoin,
  handleInputChange,
  handleSubmit,
  isMutationLoading,
  isLoading,
}: any) {
  const { data } = useQuery("getAllCoins", getAllCoins, {
    onSuccess(data) {
      console.log("Data", data);
    },
    enabled: true,
  });

  const [result, setResult] = useState("");

  useEffect(() => {
    setResult(data?.find((x: any) => x?.name === currCoin.toLowerCase()).rate);
    console.log(
      "Result",
      data?.find((x: any) => x?.name === currCoin.toLowerCase()).rate
    );
  }, [currCoin]);

  return (
    <Modal
      open={openRates}
      onClose={closeRates}
      sx={{
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          width: "30%",
          height: "auto",
          mx: "auto",
          mt: "80px",
          p: 5,
        }}
      >
        <Box display='flex' justifyContent='flex-end'>
          <IconButton onClick={closeRates}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          flexDirection='column'
          justifyContent='center'
        >
          <Box
            height='80px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            bgcolor='#E9F1FF'
            width='80px'
            borderRadius='50%'
          >
            <CandlestickChartIcon
              sx={{
                fontSize: pxToRem(50),
              }}
            />
          </Box>

          <Typography mt={2} fontWeight='bold' variant='h5'>
            Update Rates
          </Typography>

          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-around'
            width='100%'
            mt={2}
          >
            <CoinComponent
              handleFindAndSetCoin={handleFindAndSetCoin}
              currCoin={currCoin}
              onClick={setCurrCoin}
            />{" "}
            <CoinComponent
              coin='BTC'
              currCoin={currCoin}
              handleFindAndSetCoin={handleFindAndSetCoin}
              onClick={setCurrCoin}
            />{" "}
            <CoinComponent
              coin='ETH'
              currCoin={currCoin}
              handleFindAndSetCoin={handleFindAndSetCoin}
              onClick={setCurrCoin}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            {!isLoading ? (
              <TextField
                label='Current Rate'
                disabled
                value={result}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                sx={{ width: "100%" }}
              />
            ) : (
              <Skeleton width={"100%"} height={80} />
            )}
            <TextField
              sx={{ my: 2 }}
              label='New Rate'
              onChange={handleInputChange}
              fullWidth
            />

            <Button
              sx={{ mt: 2 }}
              fullWidth
              onClick={() => handleSubmit()}
              startIcon={
                isMutationLoading && (
                  <CircularProgress
                    size={16}
                    sx={{
                      fontSize: 2,
                      color: "#fff",
                    }}
                  />
                )
              }
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

const CoinComponent = ({
  coin = "USDT",
  currCoin,
  onClick,
  handleFindAndSetCoin,
}: Partial<any>) => {
  return (
    <Box
      onClick={() => {
        handleFindAndSetCoin(coin);
        onClick(coin);
      }}
      sx={{
        width: "100%",
        cursor: "pointer",
      }}
      p={2}
      m={2}
      display='flex'
      alignItems='center'
      border='1px solid #EBEBEB'
      borderRadius={pxToRem(4)}
      bgcolor={coin === currCoin ? "#001D4B" : ""}
      color={coin === currCoin ? "white" : ""}
    >
      <img
        src={getIcon(coin.toUpperCase())}
        style={{ marginRight: "15px" }}
        alt='Icon'
      />
      {coin.toUpperCase()}{" "}
    </Box>
  );
};
