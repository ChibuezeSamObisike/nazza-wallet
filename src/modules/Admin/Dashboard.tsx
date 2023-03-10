import React, { useState } from "react";
import AdminLayout from "./Components/AdminLayout";
import { Box, Typography, Button, Chip } from "@mui/material";

import { useQuery } from "react-query";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextTag from "shared/TextTag";

import { getHistory } from "services/authLogin";
import { createData } from "shared/Table";
import { numberToFigure } from "utils/numberToFigure";

import { useNavigate } from "react-router-dom";
import { pxToRem } from "utils/pxToRem";

import BasicTable from "shared/Table";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(0);

  const { isLoading, isFetching } = useQuery(
    [
      "getHistory",
      {
        rowsPerPage,
        currPage: currPage + 1,
      },
    ],
    getHistory,
    {
      onSuccess(data) {
        console.log("Data table", data);
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);
        setRowsPerPage(data?.paginationMeta.totalRecords);
      },
    }
  );

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?.coin?.name,
      `${x?.amount} ${x?.coin?.name}`,
      `N ${numberToFigure(x?.amount_ngn)}`,
      `${x?.createdAt.split("T")[0]}`,
      `${x?.coin.network}`,
      "Deposit"
    )
  );

  const columns = [
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
            <span className='wave'>????</span>
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
                bgcolor: "#FFF5D8",
                color: "#423308",
                fontWeight: 400,
                ":hover": {
                  bgcolor: "#FFF5D8",
                  color: "#423308",
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
              Invite
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
            <AdminCard bg='#E9F1FF' />
          </Box>
          <Box width='30%'>
            <AdminCard bg='#FCFFE9' />
          </Box>
          <Box width='30%'>
            <AdminCard bg='#FFE9E9' />
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
            isLoading={isLoading || isFetching}
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

function AdminCard({ bg }: { bg: string }) {
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
      <Typography>Total Payout</Typography>
      <Typography fontSize={pxToRem(35)} color='#001D4B' fontWeight='bold'>
        $180,000
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
