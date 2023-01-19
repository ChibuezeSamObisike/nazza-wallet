import { Box } from "@mui/material";
import React from "react";

import AppBreadCrumb from "shared/AppBreadCrumb";

import BasicTable from "shared/Table";

export default function AllTransactions() {
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
        <BasicTable />
      </div>
    </div>
  );
}
