import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';

import { FormsModule } from '@angular/forms'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'
import { ProductosService } from './productos.service';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { CrearVentaComponent } from './crear-venta/crear-venta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    CrearProductoComponent,
    CrearVentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
