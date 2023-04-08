import React from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";

// interface IProps {
//   title: string;
//   link: string;
// }

export default function AppBreadCrumb({
  links,
  current,
}: {
  links: Array<{ title: string; link: string }>;
  current: string;
}) {
  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      {links.map((x: { title: string; link: string }) => (
        <Link underline='none' color='inherit' href={x.link}>
          {x.title}
        </Link>
      ))}

      <Typography color='text.primary'>{current}</Typography>
    </Breadcrumbs>
  );
}
