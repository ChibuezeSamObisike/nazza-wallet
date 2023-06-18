/*0- user initiated it
1-confirmed on Blockchain
2-paid out
3-cancelled*/

const status = (x: number) => {
  if (x === 0) {
    return { text: "Inititated", bgcolor: "#FFF8CC", color: "#806B00" };
  }
  if (x === 1) {
    return { text: "Confirmed", bgcolor: "#D4F7DC", color: "#15692A" };
  }
  if (x === 2) {
    return { text: "Paid out", bgcolor: "#F0F5FF", color: "#0050C8" };
  }
  if (x === 3) {
    return { text: "Cancelled", bgcolor: "#FFD4D2", color: "#9F1F17" };
  }
};

export default status;
