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
  onClick: () => void;
}

export default function AppTabs({
  label,
  icon: Icon,
  onClick,
  ...rest
}: IAppProps) {
  return (
    <Box
      borderLeft='1px solid #001D4B'
      alignItems='center'
      bgcolor='#e8f2ff'
      display='flex'
      sx={{
        cursor: "pointer",
      }}
      onClick={onClick}
      p={2}
      {...rest}
    >
      <Icon />
      <Typography variant='body1' fontWeight={700} ml={2}>
        {label}
      </Typography>
    </Box>
  );
}
