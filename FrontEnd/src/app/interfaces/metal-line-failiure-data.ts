export interface MetalLineFailureData {
  cause_No: number;
  comment_Data: string;
  failure_Date: string; // Puedes usar string ya que el formato es 'yyyy-MM-ddTHH:mm:ss'
  failure_No: number;
  failure_Shift: string;
  failure_Time: string; // Si es una duración o cantidad de tiempo en formato específico
  from_Time: string; // Hora en formato 'HH:mm'
  id: number;
  shop_Name: string;
  to_Time: string; // Hora en formato 'HH:mm'
}
