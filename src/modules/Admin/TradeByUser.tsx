import React, { useState } from "react";
import AdminLayout from "./Components/AdminLayout";
import { Box, Typography, Chip, Modal } from "@mui/material";

import { useQuery } from "react-query";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  getAdminStats,
  getAllTradesPerUser,
  getTrade,
} from "services/AppService";
import getIcon from "utils/getIcon";

import { pxToRem } from "utils/pxToRem";

import BasicTable from "shared/Table";

import { useAlert } from "hooks/useAlert";
import { useAmount } from "hooks/useAmount";
import { handleAppError } from "utils/handleApiError";

import { AppModal } from "./Orders";
import { useParams } from "react-router-dom";
import statusFunc from "utils/status";
import { convertToSentenceCase } from "hooks/sentenceCase";

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

  const params = useParams();
  const { convertToAmount } = useAmount();

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
    crypto: string,
    status: string,
    number: string,
    price: string,
    date: string,
    network: string
  ) {
    return {
      _id,
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
      status: (
        <Chip
          label={statusFunc(status)?.text}
          sx={{
            bgcolor: statusFunc(status)?.bgcolor,
            color: statusFunc(status)?.color,
            mb: 2,
            alignSelf: "right",
          }}
        />
      ),
      number,
      price,
      date,
      network,
    };
  }

  const { isLoading } = useQuery(
    [
      "getTradePerUser",
      {
        id: params?.id,
        rowsPerPage,
        currPage: currPage + 1,
      },
    ],
    getAllTradesPerUser,
    {
      onSuccess(data) {
        console.log("User data", data);
        setTableData(data);
        // setPageSize(data?.paginationMeta.totalPages);
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

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?._id,
      x?.coin,
      x?.status,
      x?.amount.toFixed(3),
      convertToAmount(x?.amount_ngn),
      x?.createdAt.split("T")[0],
      convertToSentenceCase(x?.network)
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
    { key: "crypto", align: "" },
    { key: "status", align: "" },
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
        <Box display='flex' justifyContent='space-between'>
          <Box width='30%'>
            <Box>
              <Typography>Name of user</Typography>
            </Box>
          </Box>

          <Box width='65%'>
            <Box>
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
