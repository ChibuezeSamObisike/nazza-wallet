import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, Typography } from "@mui/material";
import getChipColor from "utils/getChipColor";
import getIcon from "utils/getIcon";

import { ReactComponent as EmptyIcon } from "assets/EmptyStateIcon.svg";

function createData(
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
        <Chip
          label={type}
          sx={{
            color: getChipColor(type).text,
            bgcolor: getChipColor(type).bg,
            marginLeft: "15px",
          }}
        />
      </Box>
    ),
    number,
    price,
    date,
    network,
  };
}

const rows = [
  createData(
    "Bitcoin",
    "1.6BTC",
    "N23,000",
    "27th June, 2022, 8:30 pm",
    "BNB",
    "Sell"
  ),
  createData(
    "Bitcoin",
    "1.6BTC",
    "N23,000",
    "27th June, 2022, 8:30 pm",
    "BNB",
    "Withdraw"
  ),
  createData(
    "Matic",
    "1.6BTC",
    "N23,000",
    "27th June, 2022, 8:30 pm",
    "BNB",
    "Deposit"
  ),

  createData(
    "USDT",
    "1.6BTC",
    "N23,000",
    "27th June, 2022, 8:30 pm",
    "BNB",
    "Deposit"
  ),
  createData(
    "Ethereum",
    "1.6BTC",
    "N23,000",
    "27th June, 2022, 8:30 pm",
    "BNB",
    "Deposit"
  ),
  createData(
    "Lite Coin",
    "1.6BTC",
    "N23,000",
    "27th June, 2022, 8:30 pm",
    "BNB",
    "Deposit"
  ),
];

const header = [
  { label: "Crypto", id: "crypto" },
  { label: "Number", id: "number" },
  { label: "Price (Naira)", id: "price" },
  { label: "Transaction Date", id: "date" },
  { label: "Network", id: "network" },
];

export default function BasicTable() {
  return (
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
            {header.map((head) => (
              <TableCell
                key={head.id}
                sx={{ color: "#5D5C63", fontWeight: 500 }}
                align='left'
              >
                {head.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {rows.length >= 0 && (
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.price}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.crypto}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.number}
                </TableCell>
                <TableCell align='left'>{row.price}</TableCell>
                <TableCell align='left'>{row.date}</TableCell>
                <TableCell align='left'>{row.network}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}

        {rows.length < 0 && (
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
                  <Typography mt='20px' variant='subtitle2'>
                    When you start using your wallet, transactions Your recent
                    transaction activities show up here, but you haven’t done
                    any transactions yet.ill show here
                  </Typography>
                </Box>
              </>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </TableContainer>
  );
}
