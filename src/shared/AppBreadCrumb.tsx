import React from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";

interface IProps {
  title: string;
  link: string;
}

export default function AppBreadCrumb({ links, current }: any) {
  console.log(links);
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {links.map((x: any) => (
        <Link underline='none' color='inherit' href={x.link}>
          {x.title}
        </Link>
      ))}

      <Typography color='text.primary'>{current}</Typography>
    </Breadcrumbs>
  );
}
