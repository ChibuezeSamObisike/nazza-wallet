import TotalCard from "components/dashboard/TotalCard";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Button, Typography } from "@mui/material";
import BasicTable from "shared/Table";
import TextTag from "shared/TextTag";
import { useNavigate } from "react-router-dom";

import useSmallScreen from "hooks/useSmallScreen";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useGetUser } from "contexts/UserProvider";

import { getHistory } from "services/authLogin";
import { useQuery } from "react-query";
import { createData } from "shared/Table";
import { useState } from "react";
import { numberToFigure } from "utils/numberToFigure";
import { getTotalPayout } from "services/authLogin";

function App() {
  const navigate = useNavigate();
  const isSmallScreen = useSmallScreen();

  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [payOutData, setPayOutData] = useState<any | null | undefined>(null);

  const user = useGetUser();

  const { isLoading } = useQuery(
    [
      "getHistory",
      {
        rowsPerPage,
        currPage,
      },
    ],
    getHistory,
    {
      onSuccess(data) {
        console.log("Data table", data);
        setPageSize(data?.paginationMeta.totalPages);
        setRowsPerPage(data?.paginationMeta.totalRecords);
      },
    }
  );

  useQuery("getTotalPayout", getTotalPayout, {
    onSuccess(data) {
      setPayOutData(data);

      console.log(payOutData);
    },
  });

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log("New  Page", newPage);
    setCurrPage(0);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Rows per page val", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));

    setCurrPage(0);
  };

  return (
    <div>
      <Box
        display='flex'
        flexDirection={{ xs: "column", md: "row" }}
        mb={4}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent='space-between'
      >
        <Typography variant='h3' fontWeight='bold' color='#47454C'>
          Welcome, {user?.user?.name?.split(" ")?.[0] ?? "---"}{" "}
          <span className='wave'>👋</span>
        </Typography>

        {!isSmallScreen && (
          <Box
            sx={{
              mt: { xs: 3, md: 0 },
            }}
          >
            <Button onClick={() => navigate("/sell")}>
              <OpenInNewIcon
                sx={{
                  mr: 1,
                  fontWeight: 400,
                }}
              />{" "}
              Sell Crypto
            </Button>
            <Button
              onClick={() => navigate("/referrals")}
              sx={{
                bgcolor: "#FFF5D8",
                color: "#423308",
                fontWeight: 400,
                ":hover": {
                  bgcolor: "#FFF5D8",
                  color: "#423308",
                },
                ml: 3,
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
        )}
      </Box>

      <TotalCard naira={payOutData?.total_ngn} usd={payOutData?.total_usd} />
      {isSmallScreen && (
        <Box
          alignItems='center'
          display='flex'
          justifyContent='space-between'
          flexDirection='column'
          sx={{
            mt: { xs: 3, md: 0 },
            width: "100%",
          }}
        >
          <Button fullWidth onClick={() => navigate("/sell")}>
            <OpenInNewIcon
              sx={{
                mr: 1,
                fontWeight: 400,
              }}
            />{" "}
            Sell Crypto
          </Button>
          <Button
            fullWidth
            onClick={() => navigate("/referrals")}
            sx={{
              bgcolor: "#FFF5D8",
              color: "#423308",
              fontWeight: 400,
              mt: 2,

              ":hover": {
                bgcolor: "#FFF5D8",
                color: "#423308",
              },
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
      )}

      <div style={{ marginTop: "40px" }}>
        <TextTag label='Transaction History' />
        <div style={{ marginBottom: "50px" }}></div>
        <BasicTable
          rows={dataTable}
          isLoading={isLoading}
          pageSize={pageSize}
          rowsPerPage={rowsPerPage}
          page={currPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default App;
