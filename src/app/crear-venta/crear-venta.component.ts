import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas.service';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})
export class CrearVentaComponent implements OnInit {

  compra:any;
  producto:any;
  detalleventa:any;
  error:boolean;

  /*
  {
    "idVenta": 1,
    "cliente": null,
    "medioPago": null,
    "fechaVenta": "2019-05-12",
    "estadoVenta": "TER",
    "valorTotal": 500000,
    "detalleVentas": []
  },
  */

  /*
    {
        "idDetalleVenta": 1,
        "producto": null,
        "venta": null,
        "valorUnitario": 200000,
        "cantidadVenta": 2
    },
  */

  /*
    private BigDecimal idCliente;
    private BigDecimal idMedioPago;
    private BigDecimal idProducto;
    private BigDecimal cantidad;
  */

  constructor(private _ventaService:VentasService) {
  }

  ngOnInit(): void {

  }

  crearCompra(): void {
    let idCliente = 1;
    let idMedioPago = 1;
    let idProducto = 1;
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
          
          alert('Compra creada correctamente' + respuesta);
          
          //this.compra = respuesta;
          console.log(this.compra);
					//this._router.navigate(["/traer-ventas");
					//console.log(respuesta);
				},
				error => {
          this.error = true;
          console.log(error);
          alert(error);
				}
		);
  }

}
