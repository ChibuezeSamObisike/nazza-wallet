export const coverSomeNums = (num: string): string => {
  let length = num?.length;
  return `${num.split("")[0] + num.split("")[1]}*********${
    num.split("")[length - 2] + num.split("")[length - 1]
  }`;
};
