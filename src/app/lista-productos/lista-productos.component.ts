import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  url = "http://localhost:8080/producto"
  listaProductos:Array<any>

  constructor(private _productosService:ProductosService) { 
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

  onVer(id){
    alert('VER este producto ' + id)
  }

  onComprar(id){
    alert('Comprar este producto ' + id)
  }

}
