import arcade from "./arcade";
import classics1 from "./classics1";
import classics2 from "./classics2";
import classics3 from "./classics3";
import modernLanguages from "./modern-languages";
import music from "./music";
import performingArts from "./performing-arts-center";
import science from "./science";
import { WalnutHallway } from "../shared";

const hallways: WalnutHallway[] = [
  ...arcade,
  ...classics1,
  ...classics2,
  ...classics3,
  ...modernLanguages,
  ...music,
  ...performingArts,
  ...science,
];
export default hallways;
