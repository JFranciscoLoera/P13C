import { LossesData } from "./losses-data";


export interface LossesResponse {
  tableData?: LossesData[];
  lossesLabel: string[];
  lossesLabelTime: number[];
}
