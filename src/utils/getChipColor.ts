function getChipColor(chipVal: string): { text: string; bg: string } {
  let color = { text: "", bg: "" };

  if (chipVal === "Sell") {
    color = { text: "#4D0400", bg: "#FFEEED" };
  } else if (chipVal === "Deposit") {
    color = { text: "#1F5E00", bg: "#F2FFEC" };
  } else if (chipVal === "Withdraw") {
    color = { text: "#573A00", bg: "#FFE9BD" };
  }

  return color;
}

export default getChipColor;
