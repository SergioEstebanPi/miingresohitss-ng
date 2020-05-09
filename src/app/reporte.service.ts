import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  url:string;
  encabezados:any;
  
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8080/reporte"
    this.encabezados = {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json",
          //"Authorization": "Bearer " + localStorage.getItem("token")
        }
      )
    } 
  }

 /* GET show */
  obtenerReporte(fechaInicial, fechaFinal):Observable<any>{
    let urlReporte = this.url + "/" + fechaInicial + "/" + fechaFinal ;
    return this.http.get<any>(
      urlReporte,
      this.encabezados
    )
  }

}
