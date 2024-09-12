import { LossesData } from "./losses-data";


export interface LossesResponse {
  TableData: LossesData[];
  LossesLabel: string[];
  LossesLabelTime: number[];
}
