import Bitcoin from "../assets/Bitcoin.svg";
import USDT from "../assets/usdt.svg";
import LITE from "../assets/litecoin.svg";
import Dodge from "../assets/dodge.svg";
import Matic from "../assets/matic.svg";
import Ethereum from "../assets/ethereum.svg";

function getIcon(currency: string): string {
  let icon: string = "";

  if (currency === "BTC") {
    icon = Bitcoin;
  } else if (currency === "USDT") {
    icon = USDT;
  } else if (currency === "Lite Coin") {
    icon = LITE;
  } else if (currency === "Dodge") {
    icon = Dodge;
  } else if (currency === "Matic") {
    icon = Matic;
  } else if (currency === "Ethereum") {
    icon = Ethereum;
  }
  return icon;
}

export default getIcon;
