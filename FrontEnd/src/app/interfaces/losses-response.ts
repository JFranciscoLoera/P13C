import { LossesData } from "./losses-data";
import { LossesOccurrences } from "./losses-ocurrences";


export interface LossesResponse {
  tableData?: LossesData[];
  lossesLabel: string[];
  lossesLabelTime: number[];
  lossesOccurrences:LossesOccurrences[];
}
