import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirarchivoService {

  url:string;
  encabezados:any;
  
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:8080/archivo"
    /*
    this.encabezados = {
      headers: new HttpHeaders(
        {
          "Content-Type": "multipart/form-data",
          //"Authorization": "Bearer " + localStorage.getItem("token")
        }
      )
    } 
    */
  }

  /* POST create */
  subirArchivo(archivo){
  	return this.http.post<any>(
  		this.url,
  		archivo,
  		this.encabezados
  	);
  }

}
