import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url:string;
  encabezados:any;
  ofertas:Array<any>;
  
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8080/producto"
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
  listarProductos():Observable<any>{
    return this.http.get<any>(
      this.url,
      this.encabezados
    )
  }

  /* GET show */
  mostrarProducto(id):Observable<any>{
    let urlProducto = this.url + "/" + id;
    return this.http.get<any>(
      urlProducto,
      this.encabezados
    )
  }

  /* POST create */
  crearProducto(producto){
  	return this.http.post<any>(
  		this.url,
  		producto,
  		this.encabezados
  	);
  }

  /* PUT update */
  modificarProducto(producto){
  	return this.http.put<any>(
  		this.url,
  		producto,
  		this.encabezados
  	);
  }

  /* DELETE destroy */
  eliminarProducto(id){
  	let urlProducto = this.url + "/" + id;
  	return this.http.delete<any>(
  		urlProducto,
  		this.encabezados
  	);
  }

}
