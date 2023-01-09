import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";

interface IAppProps {
  label: string;
  icon:
    | ReactElement
    | React.ReactNode
    | JSX.Element
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >
    | any;
  onClick?: () => void;
  index?: number;
  active?: number;
}

export default function AppTabs({
  label,
  icon: Icon,
  onClick,
  active,
  index,
  ...rest
}: IAppProps) {
  const checkStyle = Boolean(active === index);

  return (
    <Box
      borderLeft={checkStyle ? "1px solid #001D4B" : ""}
      alignItems='center'
      bgcolor={checkStyle ? "#e8f2ff" : ""}
      display='flex'
      sx={{
        cursor: "pointer",
      }}
      onClick={onClick}
      p={2}
      {...rest}
    >
      <Icon
        sx={{
          color: checkStyle ? "#101628" : "#8C8B90",
        }}
      />
      <Typography
        variant='body1'
        color={checkStyle ? "" : "#8C8B90"}
        fontWeight={700}
        ml={2}
      >
        {label}
      </Typography>
    </Box>
  );
}
