import { Router } from '@angular/router';

import { ProductosFacturaPage } from './../productos-factura/productos-factura.page';

import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';
import { UtilService } from 'src/app/services/util.service';
import { Datos } from 'src/app/models/datos';
import { FacturacionService } from 'src/app/services/facturacion.service';


@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.page.html',
  styleUrls: ['./nueva-factura.page.scss'],
})
export class NuevaFacturaPage implements OnInit {
  listaClientes: any;
  datos: Datos;
  name: any;
  compania: any;
  listaProductos: any = [];
  cantotal: any = 0;
  iva12:any=0;
  subtotal: any = 0;
  total:any=0;
  constructor(private modalController: ModalController,
    private navController: NavController,
    private clientesService: ClientesService,
    private utilService: UtilService,
    private facturacionService: FacturacionService,
    private loadingController: LoadingController,
    private router:Router) {
    this.utilService.getStorage("compania").then(res => {
      this.compania = res;
    });
  }

  ngOnInit() {
    this.listaProductos = [];

  }
  ionViewWillEnter() {
    this.listar_cliente()

  }
  async atrasEditar() {
    
    this.navController.back();
  }

  clienteChange(event) {
    console.log(event.value);
    this.name = event.value
  }



  async listar_cliente() {

    this.listaClientes = [];
    await this.clientesService.listar_cliente().subscribe(res => {

      this.listaClientes = res['message'].datoList;
    }, error => {
      this.utilService.errorToast("Error de conexion!")
      console.error(error)
    })
  }

  async agregarProducto() {
    var aux = 0;
    var entra = false;
    const modal = await this.modalController.create({
      component: ProductosFacturaPage,
      cssClass: 'custom_modal',
      mode: 'ios',

    });

    modal.onDidDismiss().then((dataDevuelta) => {

      console.log(dataDevuelta)

      if (dataDevuelta.data) {
        console.log(this.listaProductos.length)
        this.cantotal = 0;
        this.subtotal = 0;
        this.iva12=0;
        this.total=0;
        if (this.listaProductos.length >= 1) {
          this.listaProductos.forEach((element, i) => {
            if (element.name == dataDevuelta.data.name) {
              aux = dataDevuelta.data.num + element.num;
              console.log("aux",aux)
              const total = (dataDevuelta.data.pvp * aux);
              this.listaProductos[i].total = Number(total.toFixed(2));
              this.listaProductos[i].num = aux
              entra = true;
            }
          });
          if (!entra) {
         
            this.listaProductos.push(dataDevuelta.data)

          }
        } else {
          const total = (dataDevuelta.data.pvp * dataDevuelta.data.num);
          dataDevuelta.data.total = Number(total.toFixed(2));
          this.listaProductos.push(dataDevuelta.data)
          console.log(this.listaProductos)
        }
        this.listaProductos.forEach(element => {
          this.cantotal += element.num;
          this.subtotal += element.total
          if (element.porcetaje == 12) {
          this.iva12+=element.total;
          }

        });
        this.subtotal = this.subtotal.toFixed(2);
        
        this.iva12 = (this.iva12*0.12).toFixed(2);
        this.total = (Number(this.iva12)+Number(this.subtotal)).toFixed(2);
      }
    });
    return await modal.present();

  }

  borrar(event,i) {
    this.listaProductos.splice(i, 1);
    this.cantotal = 0;
    this.subtotal = 0;
    this.iva12=0;
    this.total=0;
    this.listaProductos.forEach(element => {
      this.cantotal += element.num;
      this.subtotal += element.total
      if (element.porcetaje == 12) {
        this.iva12+=element.total;
        }
    });
    this.subtotal = this.subtotal.toFixed(2);
    this.iva12 = (this.iva12*0.12).toFixed(2);
    this.total = (Number(this.iva12)+Number(this.subtotal)).toFixed(2);

  }

  async facturar() {
    if (!this.name) {
      this.utilService.errorToast("Elija un cliente!", "dark")
    } else if (this.listaProductos == false) {
      this.utilService.errorToast("Elija un producto o servicio", "dark")
    } else {
      this.datos = new Datos();
      var conf = "";
      var productos = [];
      this.listaProductos.forEach(element => {
        productos.push({ item_code: element.name, qty: element.num, rate: element.pvp })
      });
      this.datos.cliente = this.name.name;
      this.datos.company = this.compania;
      this.datos.productos = productos;
      await this.utilService.presentConfirm("Confirmar!", "Desea generar la factura al cliente <b>" + this.name.nombre_completo + "</b> con un valor Total de:<b>$ " + this.total + "<b> ", 'Cancelar', 'OK').then(res => {
        conf = res;
        return conf;
      });
      if (conf === 'ok') {
        const loading = await this.loadingController.create({ message: 'Facturando...' })
        await loading.present();
        this.facturacionService.crear_factura(this.datos).subscribe(res => {
          loading.dismiss();
          if (res["message"]) {
            this.utilService.success_msg("Facturado")
            this.atrasEditar()
           
          } else {
            this.utilService.showErrorAlert("Algo salio mal, intente nuevamente")
          }
        }, error => {
          console.error(error)
          loading.dismiss();
          this.utilService.showErrorAlert("Algo salio mal, intente nuevamente");
        })
      }
    }
  }
}
