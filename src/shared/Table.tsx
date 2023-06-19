import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Box, Chip, Typography } from "@mui/material";

import Loader from "./Loader";
import getIcon from "utils/getIcon";
import useSmallScreen from "hooks/useSmallScreen";

import { ReactComponent as EmptyIcon } from "assets/EmptyStateIcon.svg";
import MobileTransactionCard from "./MobileTransaction";
import status from "utils/status";
import { numberToFigure } from "utils/numberToFigure";

import { format, parseISO } from "date-fns";

export function createData(
  crypto: string,
  number: string,
  price: string,
  date: string,
  network: string,
  status: any
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
    status,
    network,
  };
}

const tableMobile: any[] = [];

export default function BasicTable({
  rows,
  columns,
  isLoading,
  pageSize,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onRowItemClick,
  data,
}: any) {
  const isMobile = useSmallScreen();

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  if (isMobile && data?.trades?.length > 0) {
    return (
      <div>
        {data?.trades?.map((x: any) => {
          return (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              bgcolor='#fff'
              my={1}
              p={1}
              px={2}
            >
              <div>
                <h5>
                  {format(parseISO(x?.createdAt), "d MMMM yyyy HH:mm:ss")}
                </h5>
                <div style={{ display: "flex" }}>
                  <img
                    src={getIcon(x?.coin.toUpperCase())}
                    style={{ marginRight: "15px" }}
                    alt='Icon'
                  />
                  <p>{x?.coin.toUpperCase()} </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "right",
                  flexDirection: "column",
                }}
              >
                <Chip
                  label={status(x?.status)?.text}
                  sx={{
                    bgcolor: status(x?.status)?.bgcolor,
                    color: status(x?.status)?.color,
                    mb: 2,
                    alignSelf: "right",
                  }}
                />
                <Typography fontWeight='bold'>
                  ₦{numberToFigure(x?.amount_ngn)}
                </Typography>
              </div>
            </Box>
          );
        })}

        {rows?.length > 0 && !isLoading && (
          <TablePagination
            component='div'
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[1, 5, 10, 15, 20]}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
    );
  }

  if (isMobile && !data) {
    return (
      <>
        <Box
          mx='auto'
          display='flex'
          alignItems='center'
          justifyContent='center'
          mt={4}
        >
          <EmptyIcon />
        </Box>

        <Box marginX='auto' width='70%'>
          <Typography
            mt='20px'
            textAlign='center'
            variant='subtitle2'
            fontWeight={300}
          >
            You haven't done any transactions yet.
          </Typography>
        </Box>
      </>
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
              {columns?.map((head: any) => (
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
          {rows?.length >= 0 && !isLoading && (
            <TableBody>
              {rows?.map((row: any) => {
                return (
                  <TableRow
                    key={row?.price}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onRowItemClick?.(row?._id);
                    }}
                  >
                    {columns?.map((x: any) => {
                      return (
                        <TableCell component='th' scope='row'>
                          {row?.[x?.key]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}

          {!(rows?.length > 0) && !isLoading && (
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
          {isLoading && (
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
          )}
        </Table>
      </TableContainer>
      {rows?.length > 0 && !isLoading && (
        <TablePagination
          component='div'
          count={count}
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
