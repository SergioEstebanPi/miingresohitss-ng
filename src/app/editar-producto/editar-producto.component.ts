import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubirarchivoService } from '../subirarchivo.service';
import { HttpEventType } from '@angular/common/http';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto:any;
  error:boolean;
  imagenProducto:any;

  constructor(private _productosService:ProductosService,
    private _subirarchivoService:SubirarchivoService,
    private _router:Router,
    private _ruta:ActivatedRoute) {

      this.producto = {
        nombreProducto: "",
        descripcionProducto: "",
        precioMinimo: "",
        fabricante: "",
        garantia: "",
        
      }

      this._ruta.params.subscribe(
        respuesta => {
          this._productosService.mostrarProducto(respuesta['id'])
            .subscribe(
              respuesta => {
                console.log(respuesta);
                this.producto = respuesta;
                
                if(this.producto.fotoProducto){
                  this.imagenProducto = "http://localhost:8080/" + this.producto.fotoProducto;
                } else {
                  //this.imagenProducto = this._globals.imgdefault;
                }
                
              },
              error => {
                console.log(error);
              }
            );
          //console.log(respuesta);
        },
        error => {
          console.log(error);
        }
      );
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

  editarProducto(){
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

		this._productosService.modificarProducto(this.producto)
			.subscribe(
				respuesta => {
          this.error = false;
          //alert('Producto editado correctamente');
          swal.fire('Registro exitoso...', "Producto editado correctamente", 'success');
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
