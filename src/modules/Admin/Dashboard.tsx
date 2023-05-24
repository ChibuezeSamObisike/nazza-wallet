import React, { useState } from "react";
import AdminLayout from "./Components/AdminLayout";
import { Box, Typography, Button, Chip, Modal } from "@mui/material";

import { useQuery } from "react-query";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextTag from "shared/TextTag";

import { getAdminStats, getTrades, getTrade } from "services/AppService";
import getIcon from "utils/getIcon";
import { numberToFigure } from "utils/numberToFigure";

import { pxToRem } from "utils/pxToRem";

import BasicTable from "shared/Table";

import { useAlert } from "hooks/useAlert";
import { handleAppError } from "utils/handleApiError";

import { AppModal } from "./Orders";

export default function Dashboard() {
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [adminStats, setAdminStats] = useState<any | null | undefined>(null);
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
        console.log("Data table", data.trades);
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

  useQuery("getAdminStats", getAdminStats, {
    onSuccess(data) {
      setAdminStats(data);
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
        console.log("Get trade 2 data", data);
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
    <>
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
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            mb={4}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent='space-between'
          >
            <Box width='30%'>
              <AdminCard
                bg='#E9F1FF'
                title='Total Payout'
                subText={
                  adminStats?.totalPayoutUsd
                    ? "$ " + adminStats?.totalPayoutUsd
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
            <TextTag
              label='Recent Orders'
              style={{ padding: "6px", marginBottom: "40px" }}
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
      <Typography fontSize={pxToRem(35)} color='#001D4B' fontWeight='bold'>
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
