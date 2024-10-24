import { OeeModelResult } from "./OeeModelResult";
import { OeeStationResult } from "./oeeStationResult";
import { TablaOeeResult } from "./tablaOeeResult";

export interface OeeResults {
  tablaOeeResults: TablaOeeResult[];
  oeeStationResults: OeeStationResult[];
  oeeModelResults: OeeModelResult[];
}
