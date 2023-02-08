import { Box } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { getHistory } from "services/authLogin";

import { createData } from "shared/Table";

import AppBreadCrumb from "shared/AppBreadCrumb";

import BasicTable from "shared/Table";

export default function AllTransactions() {
  const [tableData, setTableData] = useState<any>([]);

  const { isLoading, isFetching } = useQuery("getHistory", getHistory, {
    onSuccess(data) {
      console.log("user data", data?.trades);
      setTableData(data?.trades);
    },
  });

  const dataTable = tableData?.map((x: any) =>
    createData(
      x?.coin?.name,
      `${x?.amount} ${x?.coin?.name}`,
      `${x?.amount_ngn}`,
      `${x?.createdAt.split("T")[0]}`,
      `${x?.coin.network}`,
      "Deposit"
    )
  );
  return (
    <div>
      <Box>
        <AppBreadCrumb
          links={[
            {
              link: "/",
              title: "Home",
            },
          ]}
          current='All Transactions'
        />
      </Box>
      <div style={{ marginBottom: "50px", marginTop: "40px" }}>
        <BasicTable rows={dataTable} isLoading={isLoading || isFetching} />
      </div>
    </div>
  );
}
