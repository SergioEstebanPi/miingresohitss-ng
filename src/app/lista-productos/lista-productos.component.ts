import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListaProductosComponent implements OnInit {

  listaProductos:Array<any>
  producto:any

  constructor(private _productosService:ProductosService,
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
    alert('Comprar este producto ' + id)
  }

}
