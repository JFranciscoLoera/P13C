import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetalLineFailureData } from '../interfaces/metal-line-failiure-data';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  // URL base de la API. Ajusta según tu configuración.
  private apiUrl = 'http://localhost:5067/api/p13/';

  constructor(private http: HttpClient) { }

  // Método para obtener los datos de fallas de la línea de metal
  getMetalLineFailureData(startDate: Date, endDate: Date): Observable<MetalLineFailureData[]> {
    // Construir los parámetros de la consulta
    let params = new HttpParams()
      .set('startDate', startDate.toString()) // Formato yyyy-MM-dd
      .set('endDate', endDate.toString());   // Formato yyyy-MM-dd

    // Realizar la solicitud GET a la API
    return this.http.get<MetalLineFailureData[]>(`${this.apiUrl}getMetalLineFailureData`, { params });
  }
}
