import React, { useState, createContext } from "react";
import {
  Table as MUITable,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableSortLabel,
  TablePagination,
  Box,
  Grid,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Empty, { IEmptyProps } from "./Empty";
import { ArrowDownward } from "@mui/icons-material";

type IColumn = {
  header: string;
  key: string;
  sort?: boolean;
  // align?: "inherit" | "left" | "center" | "right" | "justify" | undefined;
  align?: any;
  disableCellClick?: boolean;
  size?: "small" | "medium" | undefined;
};

export type IPagination = {
  total?: number;
  pageSize: number;
  currentPage: number;
  rowsPerPageOptions: number[];
};

type selectedCheckboxType = Record<string, any>;

type IProps = {
  columns: IColumn[];
  data: any[];
  onRowItemClick?: (row: any) => void;
  pagination?: IPagination;
  empty?: IEmptyProps;
  loading?: boolean;
  onSortClick?: (header: string) => void;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkbox?: boolean;
  showCheckboxOnHeader?: boolean;
  getCheckBoxValues?: (state: selectedCheckboxType) => void;
  search?: any;
  sx?: Record<string, any>;
  rowStyle?: Record<string, any>;
  hover?: boolean;
  size?: "small" | "medium" | undefined;
};

const Table: React.FC<IProps> = ({
  columns,
  data,
  onRowItemClick,
  pagination,
  empty,
  loading,
  onPageChange,
  onSortClick,
  onRowsPerPageChange,
  checkbox = false,
  showCheckboxOnHeader = false,
  sx,
  rowStyle,
  hover = false,
  size,
}: IProps) => {
  const { records: selectedField, changeRecords: setSelectedField } =
    React.useContext(TableRecordsContext);
  const [isAssendeing, setIsAssendeing] = useState(false);
  const [clickedValue, setClickedValue] = useState("Date" || "created_at");

  const rowCount = data?.length;
  const allSelected = selectedField?.length;

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: selectedCheckboxType
  ) => {
    if (event.target.checked) {
      setSelectedField((prev: any) => [...prev, name]);
    } else {
      const filtered = selectedField.filter(
        (val: selectedCheckboxType) => val.id !== name?.id
      );
      setSelectedField(filtered);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds: Record<string, any> = data;
      setSelectedField(newSelecteds);
      return;
    }
    setSelectedField([]);
  };

  // this is specific to Reconciliation page only
  const checkedIds = selectedField?.map((res: any) => res?.id);
  const getTableRowColor = (row: Record<string, any>): string => {
    if (checkedIds?.includes(row?.id)) return "#FFF3DB";
    if (row?.merged) return "#EDF9F0";
    if (row?.disabled) return "#0000FF";
    return "#fff";
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer component={Paper} elevation={0} square sx={{ ...sx }}>
          <MUITable stickyHeader sx={{ minWidth: 700 }} size={size}>
            <TableHead style={{}}>
              <TableRow>
                {checkbox && (
                  <TableCell>
                    <Checkbox
                      sx={{
                        opacity: showCheckboxOnHeader ? 1 : 0,
                      }}
                      hidden={!showCheckboxOnHeader}
                      disabled={!showCheckboxOnHeader}
                      indeterminate={allSelected > 0 && allSelected < rowCount}
                      checked={rowCount > 0 && allSelected === rowCount}
                      inputProps={{ "aria-label": "select a user" }}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                )}
                {columns?.map(({ header, sort, align }) => {
                  return (
                    <React.Fragment key={header}>
                      {sort ? (
                        <TableCell
                          align={align}
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.common.white,
                          }}
                        >
                          <TableSortLabel
                            active={clickedValue === header}
                            onClick={(e) => {
                              if (onSortClick) {
                                setIsAssendeing(!isAssendeing);
                                setClickedValue(header);
                                onSortClick(
                                  isAssendeing ? `-${header}` : header
                                );
                              }
                            }}
                            IconComponent={
                              isAssendeing ? ArrowUpwardIcon : ArrowDownward
                            }
                            style={{ fontWeight: "bold", color: "black" }}
                          >
                            {header}
                          </TableSortLabel>
                        </TableCell>
                      ) : (
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "black",
                            backgroundColor: (theme) =>
                              theme.palette.common.white,
                          }}
                          align={align}
                        >
                          {header}
                        </TableCell>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    component='td'
                    scope='row'
                    colSpan={columns.length}
                    sx={{ textAlign: "center", height: "55vh" }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.length > 0 ? (
                    data?.map((row: selectedCheckboxType) => {
                      const isUserSelected = selectedField
                        ?.map((f: selectedCheckboxType) => f?.id)
                        ?.includes(row?.id);
                      return (
                        <TableRow
                          key={row.id}
                          hover={hover}
                          selected={
                            checkedIds?.includes(row?.id) || row?.isMerged
                          }
                          sx={{
                            ...rowStyle,
                            cursor: "pointer",

                            background: row?.disabled ? "#F0F5FF" : "",
                            "&.Mui-selected": {
                              background: getTableRowColor(row),
                              "&:hover": {
                                background: getTableRowColor(row),
                              },
                            },
                          }}
                        >
                          {checkbox && (
                            <TableCell>
                              <Checkbox
                                checked={isUserSelected}
                                disabled={row.isMerged || row?.disabled}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => handleClick(event, row)}
                                inputProps={{ "aria-label": "select a user" }}
                              />
                            </TableCell>
                          )}
                          {columns?.map(({ key, align, disableCellClick }) => {
                            return (
                              <React.Fragment key={key}>
                                {key === "id" ? (
                                  <TableCell
                                    component='td'
                                    scope='row'
                                    onClick={() => {
                                      if (onRowItemClick) onRowItemClick(row);
                                    }}
                                    sx={{ py: 4 }}
                                    align={align}
                                  >
                                    {row[key]}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    onClick={() => {
                                      if (onRowItemClick && !disableCellClick)
                                        onRowItemClick(row);
                                    }}
                                    sx={{ py: 4 }}
                                    align={align}
                                  >
                                    {row[key]}
                                  </TableCell>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        component='td'
                        scope='row'
                        colSpan={columns.length}
                        sx={{ textAlign: "center", height: "55vh" }}
                      >
                        <>
                          {empty && (
                            <Empty
                              title={empty.title}
                              description={empty.description}
                              onAddNewClick={empty.onAddNewClick}
                              icon={empty.icon}
                            />
                          )}
                        </>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </MUITable>
        </TableContainer>

        {data?.length > 0 && (
          <Box
            component={Paper}
            elevation={0}
            square
            display='flex'
            justifyContent='flex-end'
            width='100%'
          >
            {onPageChange && pagination?.total && (
              <TablePagination
                sx={{ width: "100%" }}
                rowsPerPageOptions={pagination?.rowsPerPageOptions}
                count={pagination?.total}
                rowsPerPage={pagination?.pageSize}
                page={pagination?.currentPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Table;

type contextProps = {
  records: selectedCheckboxType;
  changeRecords: (val: selectedCheckboxType) => void;
};

// @ts-ignore
export const TableRecordsContext = createContext<contextProps>({});

export const TableRecordsProvider = ({ children }: any) => {
  const [records, setRecords] = useState<selectedCheckboxType>([]);

  const handleChangeRecords = (records: any) => {
    setRecords(records);
  };

  return (
    <TableRecordsContext.Provider
      value={{
        records,
        changeRecords: handleChangeRecords,
      }}
    >
      {children}
    </TableRecordsContext.Provider>
  );
};
