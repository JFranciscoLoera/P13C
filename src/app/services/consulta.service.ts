import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  // URL base de la API. Ajusta según tu configuración.
  private apiUrl = 'https://localhost:5001/api/p13/';

  constructor(private http: HttpClient) { }

  // Método para obtener los datos de fallas de la línea de metal
  getMetalLineFailureData(startDate: Date, endDate: Date): Observable<any> {
    // Construir los parámetros de la consulta
    let params = new HttpParams()
      .set('startDate', startDate.toISOString().split('T')[0]) // Formato yyyy-MM-dd
      .set('endDate', endDate.toISOString().split('T')[0]);   // Formato yyyy-MM-dd

    // Realizar la solicitud GET a la API
    return this.http.get<any>(this.apiUrl+'getMetalLineFailureData', { params });
  }
}
