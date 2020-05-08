import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from'sweetalert2';
import { VentasService } from '../ventas.service';

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
    private _modalService:NgbModal) { 
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
    let producto = this.listaProductos.filter(
      producto => producto.idProducto === id
    );
    this.producto = producto[0];
    this._modalService.open(modal);
    console.log(producto[0]);
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
            swal.fire('Registro exitoso...', "Producto comprado correctamente", 'success');
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

}
