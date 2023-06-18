import TotalCard from "components/dashboard/TotalCard";

import PersonAddAltIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Typography, Skeleton, Chip } from "@mui/material";
import AppTable from "shared/Table";
import TextTag from "shared/TextTag";
import { useNavigate } from "react-router-dom";

import useSmallScreen from "hooks/useSmallScreen";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useGetUser } from "contexts/UserProvider";

import { getHistory } from "services/AppService";
import { useQuery } from "react-query";
import { createData } from "shared/Table";
import { useState } from "react";
import { numberToFigure } from "utils/numberToFigure";
import { getTotalPayout, getProfileDetails } from "services/AppService";
import { pxToRem } from "utils/pxToRem";
import status from "utils/status";
import { convertToSentenceCase } from "hooks/sentenceCase";

function App() {
  const navigate = useNavigate();
  const isSmallScreen = useSmallScreen();

  const [tableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageSize, setPageSize] = useState<number | null>(0);
  const [totalItems, setTotalItems] = useState<number>(5);
  const [payOutData, setPayOutData] = useState<any | null | undefined>(null);

  const user = useGetUser();

  const { isLoading, data: historyData } = useQuery(
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
        console.log("Dataa Trades", data?.trades);
        setTableData(data?.trades);
        setPageSize(data?.paginationMeta.totalPages);
        setTotalItems(data?.paginationMeta.totalRecords);
        // setRowsPerPage(data?.paginationMeta.totalRecords);
      },
      onError(err) {
        console.log("Table error", err);
      },
    }
  );

  const { isLoading: isTotalCardLoading } = useQuery(
    "getTotalPayout",
    getTotalPayout,
    {
      onSuccess(data) {
        setPayOutData(data);
      },
    }
  );

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?.coin.toUpperCase(),
      `${x?.amount.toFixed(4)} ${x?.coin.toUpperCase()}`,
      `N ${numberToFigure(x?.amount_ngn)}`,
      `${x?.createdAt.split("T")[0]}`,
      `${convertToSentenceCase(x?.network)}`,
      <Chip
        label={status(x?.status)?.text}
        sx={{
          bgcolor: status(x?.status)?.bgcolor,
          color: status(x?.status)?.color,
          mb: 2,
          alignSelf: "right",
        }}
      />,
      "Deposit"
    )
  );

  const columns = [
    { key: "crypto", align: "" },
    { key: "number" },
    { key: "price" },
    { key: "date" },
    { key: "network" },
    { key: "status", align: "right" },
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

  const { data } = useQuery("fetchUserDetails", getProfileDetails, {
    onSuccess(data) {},
  });
  return (
    <div>
      <Box
        display='flex'
        flexDirection={{ xs: "column", md: "row" }}
        mb={4}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent='space-between'
      >
        {user.isLoading ? (
          <Skeleton width={"40%"} height={80} />
        ) : (
          <Typography
            variant='h3'
            fontWeight='bold'
            fontSize={pxToRem(24)}
            color='#47454C'
          >
            <span>Welcome, {data?.name ?? "---"}</span>{" "}
            <span className='wave'>👋</span>
          </Typography>
        )}

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
              sx={{
                bgcolor: "#52C41A",
                color: "#fff",
                fontWeight: 400,
                ":hover": {
                  bgcolor: "#52C41A",
                  color: "#fff",
                },
                ml: 3,
              }}
              component='a'
              href='https://wa.me/2348182681223'
              target='_blank'
            >
              <PersonAddAltIcon
                sx={{
                  mr: 1,
                  fontWeight: 400,
                }}
              />
              Trade on Whatsapp
            </Button>
          </Box>
        )}
      </Box>

      <TotalCard
        naira={numberToFigure(payOutData?.total_ngn || "0")}
        usd={numberToFigure(payOutData?.total_usd || "0")}
        isLoading={isTotalCardLoading}
      />

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
            sx={{
              bgcolor: "#52C41A",
              color: "#fff",
              fontWeight: 400,
              ":hover": {
                bgcolor: "#52C41A",
                color: "#fff",
              },
              mt: 3,
            }}
            fullWidth
            component='a'
            href='https://wa.me/2348182681223'
            target='_blank'
          >
            <PersonAddAltIcon
              sx={{
                mr: 1,
                fontWeight: 400,
              }}
            />
            <Typography>Trade on Whatsapp</Typography>
          </Button>
        </Box>
      )}

      <div>
        <TextTag label='Transaction history' />

        <AppTable
          rows={dataTable}
          data={historyData}
          count={totalItems}
          columns={columns}
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
