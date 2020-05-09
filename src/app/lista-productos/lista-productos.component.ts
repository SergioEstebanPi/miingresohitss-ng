declare var require: any
import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from'sweetalert2';
import { VentasService } from '../ventas.service';
import { ReporteService } from '../reporte.service';
import * as moment from 'moment';
//import * as jsPDF from 'jspdf';
const jsPDF = require('jspdf');
//import jsPDF from 'jspdf'
import 'jspdf-autotable';

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
  fechaInicial:any
  fechaFinal:any

  constructor(private _productosService:ProductosService,
    private _ventaService:VentasService,
    private _reporteService:ReporteService,
    private _modalService:NgbModal) { 
    this.listaProductos = []
  }

  ngOnInit(): void {
    this.getProductos()
    this.fechaInicial = new Date()
    this.fechaFinal = new Date()
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

  onGenerarReporte(fechaInicial, fechaFinal){
    console.log("fechaInicial " + fechaFinal + " fechaFinal " + fechaFinal)
    let strFechaIni = moment(fechaInicial).format("MM-DD-YYYY")
    let strFechaFin = moment(fechaFinal).format("MM-DD-YYYY");
    console.log(strFechaIni + " " + strFechaFin)
    this._reporteService.obtenerReporte(strFechaIni, strFechaFin)
      .subscribe(
        res => {
          console.log(res);

          const doc = new jsPDF()
          // It can parse html:
          // <table id="my-table"><!-- ... --></table>
          //doc.autoTable({ html: '#my-table' })
          let arrayReporte = []
          for(let i=0;i<res.length;i++){
            let productoVendido = res[i];

            let fecha = new Date(productoVendido.fechaVenta)
            let day = fecha.getDate()
            let month = fecha.getMonth() + 1
            let year = fecha.getFullYear()
            let fechaVenta = "";
            if(month < 10){
              //console.log(`${day}-0${month}-${year}`)
              fechaVenta = `${day}/0${month}/${year}`
            }else{
              //console.log(`${day}-${month}-${year}`)
              fechaVenta = `${day}/${month}/${year}`
            }
            let prod = [
              productoVendido.nombreProducto,
              productoVendido.documentoCliente,
              productoVendido.medioPago,
              productoVendido.cantidad,
              productoVendido.valorUnitario,
              fechaVenta
            ]
            console.log("fecha " + fechaVenta)
            arrayReporte.push(prod)
          }

          doc.autoTable({
            head: [
              ['Nombre Producto', 
              'Documento Cliente', 
              'Tarjeta', 'Cantidad', 
              'Valor Unitario', 
              "Fecha Venta"]
            ],
            body: arrayReporte,
          })
           
          doc.save('reporteventas.pdf')


        },
        err => {
          console.log(err);
        }
      );
  }

}
