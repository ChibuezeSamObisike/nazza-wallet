const lableByCode = (
  id: number | string
): {
  code: string;
  sx: {
    bgcolor?: string;
    color?: string;
  };
} => {
  let code = "Label";
  let sx = {};

  if (id === 0) {
    code = "In Progress";
    sx = {
      color: "#8A8CD9",
      bgcolor: "#EDEDFF",
    };
  } else if (id === 1) {
    code = "Confirmed";
    sx = {
      bgcolor: "#DEF8EE",
      color: "#4AA785",
    };
  } else if (id === 2) {
    code = "Paid out";
    sx = {
      color: "#FFC555",
      bgcolor: "#FFFBD4",
    };
  } else if (id === 3) {
    code = "Cancelled";
    sx = {
      bgcolor: "#FFE9E9",
      color: "#FF7262",
    };
  }
  return { code, sx };
};

export default lableByCode;
