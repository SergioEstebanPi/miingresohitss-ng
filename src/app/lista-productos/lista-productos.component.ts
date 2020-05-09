import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from'sweetalert2';
import { VentasService } from '../ventas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListaProductosComponent implements OnInit {

  listaProductos:Array<any>
  producto:any
  compra:any
  error:boolean

  constructor(private _productosService:ProductosService,
    private _ventaService:VentasService,
    private _modalService:NgbModal,
    private _router:Router) { 
    this.listaProductos = []
  }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos(){
    this._productosService.listarProductos()
      .subscribe(
        res => {
          console.log(res)
          this.listaProductos = res
        },
        err => {
          console.log(err)
        }
      )
  }

  onVer(id, modal){
    //alert('VER este producto ' + id)
    let productoa = this.listaProductos.filter(
      producto => producto.idProducto === id
    );
    this.producto = productoa[0];
    this._modalService.open(modal);
    console.log(productoa[0]);
    //alert(producto[0].descripcionProducto)
    //swal.fire('Registro exitoso...', producto[0].descripcionProducto, 'success');
  }

  onComprar(id){
    console.log('Comprar este producto ' + id)

    let idCliente = 1;
    let idMedioPago = 1;
    let idProducto = id;
    let cantidad = 10;

    this.compra = {
      idCliente: idCliente,
      idMedioPago: idMedioPago,
      idProducto: idProducto,
      cantidad: cantidad
    }

		this._ventaService.crearVenta(this.compra)
			.subscribe(
				respuesta => {
          this.error = false;
          
          
          if(respuesta){
            let productoa = this.listaProductos.filter(
              producto => producto.idProducto === id
            );
            swal.fire('Registro exitoso...', productoa[0].nombreProducto + " comprado correctamente", 'success');
          } else {
            swal.fire('NO exitoso...', "Ha ocurrido un error al realizar la compra", 'warning');
          }
          
          //this.compra = respuesta;
          //console.log(this.compra);
					//this._router.navigate(["/traer-ventas");
				},
				error => {
          this.error = true;
          console.log(error);
          alert(error);
				}
		);
  }
  onEditar(id){
    this._router.navigate(["/editar-producto/" + id]);
  }
  onEliminar(id){
    this._productosService.eliminarProducto(id)
    .subscribe(
      res => {
        console.log(res)
        //this.listaProductos = res
        swal.fire('Acción exitosa...', "Producto eliminado correctamente", 'success');
        this.getProductos()
        this._router.navigate(["/listar-productos"]);
      },
      err => {
        console.log(err)
        swal.fire('NO exitoso...', "No fue posible eliminar el producto", 'warning');
      }
    )
  }

}
