import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';
import { SubirarchivoService } from '../subirarchivo.service';
import { HttpEventType } from '@angular/common/http';
import swal from'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  producto:any;
  error:boolean;
  imagenProducto:any;

/*
    {
      "idProducto": 1,
      "nombreProducto": "Beats Solo 3 Wireless",
      "descripcionProducto": "Audifonos inalÃÂ¡mbrico",
      "fotoProducto": "/path",
      "unidadMedida": "unidad",
      "mesesGarantia": 12,
      "fabricante": "Beats",
      "estadoProducto": "ACT",
      "precioMinimo": 150000,
      "detalleVentas": [],
      "descuentos": [],
      "inventarios": []
  },
*/

  constructor(private _productosService:ProductosService,
    private _subirarchivoService:SubirarchivoService,
    private _router:Router) {
  	this.producto = {
  		nombreProducto: "",
  		descripcionProducto: "",
      fotoProducto: "",
      dataimagen: "",
      precio: 0,
      fabricante: "",
      estadoProducto: "ACT",
      unidadMedida: "unidad"
  	};
  }

  ngOnInit(): void {
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.producto.dataimagen = file;
      
      let reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagenProducto = reader.result;
        this.producto.imagen = file.name;
        //this.producto.dataimagen = this.imagenProducto.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
      };
      
    }
  }

  crearProducto(): void {

    if(this.producto.dataimagen){
      const fd = new FormData();
      fd.append('archivo', this.producto.dataimagen, this.producto.dataimagen.name);
  
      this._subirarchivoService.subirArchivo(fd)
        .subscribe(
          event => {
            if(event.type === HttpEventType.UploadProgress){
              console.log("Subiendo archivo..." + Math.round(event.loaded / event.total * 100) + "%")
            } else if(event.type === HttpEventType.Response){
              console.log(event)
            }
          },
          err => {
            console.log(err)
          }
        );
      this.producto.fotoProducto = this.producto.dataimagen.name;
    }

		this._productosService.crearProducto(this.producto)
			.subscribe(
				respuesta => {
          this.error = false;
          //alert('Producto creado correctamente');
          swal.fire('Registro exitoso...', "Producto creado correctamente", 'success');
          this.producto = respuesta;
          console.log(this.producto);
					this._router.navigate(["/listar-productos"]);
					//console.log(respuesta);
				},
				error => {
          this.error = true;
          console.log(error);
          swal.fire('NO exitoso...', "Por favor valide los campos ingresados", 'warning');
          //alert(error);
				}
		);
  }

}
