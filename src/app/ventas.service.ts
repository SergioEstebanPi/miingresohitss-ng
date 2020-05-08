import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url:string;
  encabezados:any;
  
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8080/compra"
    this.encabezados = {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json",
          //"Authorization": "Bearer " + localStorage.getItem("token")
        }
      )
    } 
  }

  /* GET index*/
  listarVentas():Observable<any>{
    return this.http.get<any>(
      this.url,
      this.encabezados
    )
  }

  /* GET show */
  mostrarVenta(id):Observable<any>{
    let urlVenta = this.url + "/" + id;
    return this.http.get<any>(
      urlVenta,
      this.encabezados
    )
  }

  /* POST create */
  crearVenta(venta){
  	return this.http.post<any>(
  		this.url,
  		venta,
  		this.encabezados
  	);
  }

  /* PUT update */
  modificarVenta(venta){
  	return this.http.put<any>(
  		this.url,
  		venta,
  		this.encabezados
  	);
  }

  /* DELETE destroy */
  eliminarVenta(id){
  	let urlVenta = this.url + "/" + id;
  	return this.http.delete<any>(
  		urlVenta,
  		this.encabezados
  	);
  }
}
