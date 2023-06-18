import { Box, Typography, Button } from "@mui/material";
import React from "react";

import { ReactComponent as EmptyIcon } from "tempAssest/emptyTable.svg";

type variant = "outlined" | "contained" | "text";
export interface IEmptyProps {
  icon?: any;
  btnVariant?: variant;
  title: string;
  description: string;
  onAddNewClick?: () => void;
}
const Empty: React.FC<IEmptyProps> = ({
  title,
  description,
  onAddNewClick,
  btnVariant,
  icon: CustomeEmptyIcon,
}: IEmptyProps) => {
  return (
    <Box
      textAlign='center'
      display='grid'
      sx={{ placeItems: "center", height: "100%" }}
    >
      <Box>
        {/* {CustomeEmptyIcon ? <CustomeEmptyIcon /> : <EmptyIcon />} */}
        <h1>No values</h1>
        <Box mb={2}>
          <Typography
            variant='body1'
            color='textPrimary'
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {description}
          </Typography>
        </Box>

        {onAddNewClick ? (
          <Button
            variant={btnVariant ? btnVariant : "text"}
            color='primary'
            onClick={onAddNewClick}
            sx={{ border: "none", textTransform: "capitalize", zIndex: 500 }}
          >
            Add new
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default Empty;
