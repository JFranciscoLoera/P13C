namespace Backend_P13C.Model
{
    public class MetalFailureData
    {
        public int ID { get; set; }
        public string Shop_Name { get; set; }
        public DateTime Failure_Date { get; set; }
        public string Failure_Shift { get; set; }
        public int Failure_No { get; set; }
        public string From_Time { get; set; }
        public string To_Time { get; set; }
        public string Failure_Time { get; set; }
        public int Cause_No { get; set; }
        public string Comment_Data { get; set; }
    }

    public class LineData
    {
        public int CD { get; set; } // Asumiendo que CD es un entero. Cambia el tipo si es necesario.
        public string Name { get; set; }
        public string Descrip { get; set; }
        public int Stdat { get; set; }
        public string Ultest { get; set; }
        public string NameCve { get; set; }
    }

    public class LossesData
    {
        public string L_NAME { get; set; }          // [L_NAME]
        public string SHIFT_NAME { get; set; }      // [SHIFT_NAME]
        public string EV_T { get; set; }            // [EV_T]
        public string EV_E { get; set; }            // [EV_E]
        public string O_NM { get; set; }            // [O_NM]
        public string R_NM { get; set; }            // [R_NM]
        public string S_NM { get; set; }            // [S_NM]
        public string COMM { get; set; }            // [COMM]
        public decimal S_TIM { get; set; }          // [S_TIM]
        public DateTime PROD_YMD { get; set; }      // [PROD_YMD]
        public int SHIFT_CD { get; set; }           // [SHIFT_CD]
        public decimal S_TIM_S { get; set; }       // [S_TIM_S]
        public DateTime EVENT_DATE { get; set; }    // [EVENT_DATE]
        public string PRG_NO { get; set; }          // [PRG_NO]
        public string STEP_NO { get; set; }         // [STEP_NO]
        public string LINE_CD { get; set; }         // [LINE_CD]
        public string RESP { get; set; }            // [RESP]
        public int CD { get; set; }                 // [CD]
        public string DESC_FALLA { get; set; }      // [DESC_FALLA]
        public string STATUS_L { get; set; }        // [STATUS_L]
        public string FAILURE_CD { get; set; }      // [FAILURE_CD]
        public string AFFECTATION_CD { get; set; }  // [AFFECTATION_CD]
        public string SIX_CD { get; set; }          // [SIX_CD]
        public string MACHINE_CD { get; set; }      // [MACHINE_CD]
        public string MACHINE_DESC { get; set; }    // [MACHINE_DESC]
        public string SIX_DESC { get; set; }        // [SIX_DESC]
        public string AFFECTATION_DESC { get; set; } // [AFFECTATION_DESC]
        public string RESPONSABLE { get; set; }     // [RESPONSABLE]
        public string TYPE_LOSSES { get; set; }     // [TYPE_LOSSES]
    }





}
