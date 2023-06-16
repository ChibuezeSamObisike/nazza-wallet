export const useAmount = (currency?: string) => {
  function convertToAmount(amount: number | string) {
    return `${currency === "USD" ? "$" : "₦"}${Number(amount || 0)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

  return { convertToAmount };
};
