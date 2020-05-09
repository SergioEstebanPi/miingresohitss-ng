declare var require: any
import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../reporte.service';
import * as moment from 'moment';
const jsPDF = require('jspdf');
import 'jspdf-autotable';


@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css']
})
export class GenerarReporteComponent implements OnInit {

  fechaInicial:any
  fechaFinal:any

  constructor(private _reporteService:ReporteService) {
    this.fechaInicial = new Date()
    this.fechaFinal = new Date()
  }

  ngOnInit(): void {
  }

  onGenerarReporte(fechaInicial, fechaFinal){
    console.log("fechaInicial " + fechaFinal + " fechaFinal " + fechaFinal)
    let strFechaIni = moment(fechaInicial).format("DD-MM-YYYY")
    let strFechaFin = moment(fechaFinal).format("DD-MM-YYYY");
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
