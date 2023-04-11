import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

import Loader from "./Loader";
import getIcon from "utils/getIcon";
import useSmallScreen from "hooks/useSmallScreen";

import { ReactComponent as EmptyIcon } from "assets/EmptyStateIcon.svg";
import MobileTransactionCard from "./MobileTransaction";

export function createData(
  crypto: string,
  number: string,
  price: string,
  date: string,
  network: string,
  type: string
) {
  return {
    crypto: (
      <Box display='flex' alignItems='center'>
        <img src={getIcon(crypto)} style={{ marginRight: "15px" }} alt='Icon' />
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
  };
}

// const tableMobile = [
//   {
//     chip: "Sell",
//     number: "1.3BTC",
//     price: "N23,000",
//     network: "BNB",
//     date: "23rd May 2022",
//     icon: "USDT",
//   },
//   {
//     chip: "Sell",
//     number: "1.3BTC",
//     price: "N23,000",
//     network: "BNB",
//     date: "23rd May 2022",
//     icon: "Lite Coin",
//   },
//   {
//     chip: "Deposit",
//     number: "1.3BTC",
//     price: "N23,000",
//     network: "BNB",
//     date: "23rd May 2022",
//     icon: "Dodge",
//   },

//   {
//     chip: "Withdraw",
//     number: "1.3BTC",
//     price: "N23,000",
//     network: "BNB",
//     date: "23rd May 2022",
//     icon: "Bitcoin",
//   },
// ];

const tableMobile: any[] = [];

export default function BasicTable({
  rows,
  columns,
  isLoading,
  pageSize,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onRowItemClick,
}: any) {
  const isMobile = useSmallScreen();

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // console.log("Price... data", rows);

  if (isMobile && tableMobile.length > 0) {
    return (
      <>
        {tableMobile.map((x, i) => (
          <div key={i}>
            <MobileTransactionCard {...x} />
          </div>
        ))}
      </>
    );
  }

  if (isMobile && tableMobile.length <= 0) {
    return (
      <TableRow>
        <TableCell
          component='td'
          scope='row'
          colSpan={40}
          sx={{
            textAlign: "center",
            height: "35vh",
          }}
        >
          <>
            <EmptyIcon />

            <Box marginX='auto' width='80%'>
              <Typography mt='20px' variant='subtitle2' fontWeight={300}>
                When you start using your wallet, transactions Your recent
                transaction activities show up here, but you haven’t done any
                transactions yet.ill show here
              </Typography>
            </Box>
          </>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "0px" }}
        elevation={0}
      >
        <Table
          sx={{ minWidth: 650, borderRadius: "0px" }}
          aria-label='simple table'
        >
          <TableHead
            sx={{
              backgroundColor: "#EFF0F4",
              borderRadius: "0px",
            }}
          >
            <TableRow>
              {columns.map((head: any) => (
                <TableCell
                  key={head.key}
                  sx={{ color: "#5D5C63", fontWeight: 500 }}
                  align='left'
                >
                  {toTitleCase(head.key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows.length >= 0 && !isLoading && (
            <TableBody>
              {rows.map((row: any) => {
                return (
                  <TableRow
                    key={row.price}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onRowItemClick?.(row?._id);
                    }}
                  >
                    {columns.map((x: any) => {
                      return (
                        <TableCell component='th' scope='row'>
                          {row[x.key]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}

          {!(rows.length > 0) && !isLoading && (
            <TableRow>
              <TableCell
                component='td'
                scope='row'
                colSpan={40}
                sx={{
                  textAlign: "center",
                  height: "35vh",
                }}
              >
                <>
                  <EmptyIcon />

                  <Box marginX='auto' width='70%'>
                    <Typography mt='20px' variant='subtitle2' fontWeight={300}>
                      When you start using your wallet, transactions Your recent
                      transaction activities show up here, but you haven’t done
                      any transactions yet.ill show here
                    </Typography>
                  </Box>
                </>
              </TableCell>
            </TableRow>
          )}
          {/* {isLoading && (
            <TableRow>
              <TableCell
                component='td'
                scope='row'
                colSpan={40}
                sx={{
                  textAlign: "center",
                  height: "35vh",
                }}
              >
                <Loader height='30%' />
              </TableCell>
            </TableRow>
          )} */}
        </Table>
      </TableContainer>
      {!(rows.length > 0) && isLoading && (
        <TablePagination
          component='div'
          count={rows?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[1, 5, 10, 15, 20]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
