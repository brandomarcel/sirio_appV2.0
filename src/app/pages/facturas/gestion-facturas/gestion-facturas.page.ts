import { NuevaFacturaPage } from './../nueva-factura/nueva-factura.page';
import { DetallefacturaPage } from './../detallefactura/detallefactura.page';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { formatDate } from "@angular/common";
import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from "@ionic-native/file-opener/ngx"
import { HttpClient, HttpEventType } from '@angular/common/http';

import { HTTP } from "@ionic-native/http"
import { File } from "@ionic-native/file"

@Component({
  selector: 'app-gestion-facturas',
  templateUrl: './gestion-facturas.page.html',
  styleUrls: ['./gestion-facturas.page.scss'],
})
export class GestionFacturasPage implements OnInit {
  lstFacturas: any;
  fecha_hasta;
  fecha_desde;
  fecha_actual;
  fechamax: any;

  constructor(public utilService: UtilService,
    private cnx: FacturacionService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private http: HttpClient,
    private fileOpener: FileOpener
  ) {

    this.fecha_actual = new Date();
  }

  ngOnInit() {
    this.fechamax = formatDate((this.fecha_actual), 'yyyy-MM-dd', 'en-US');

  }
  ionViewWillEnter() {

    console.log("ionViewWillEnter")
    this.fecha_desde = "";
    this.fecha_hasta = "";
    this.get_facturas(null, null);
  }
  buscarFactura() {
    this.get_facturas(this.fecha_desde, this.fecha_hasta)
  }

  async nuevaFactura() {

    const modal = await this.modalController.create({
      component: NuevaFacturaPage,
      cssClass: 'factura_modal',
      mode: 'ios',
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((dataDevuelta) => {

      console.log(dataDevuelta)
      if (dataDevuelta.data) {
        this.get_facturas(null, null);
      }
    });
    return await modal.present();


  }
  get_facturas(desde, hasta) {
    this.lstFacturas = null;
    this.cnx.get_facturas(desde, hasta).subscribe((data: any) => {
      this.lstFacturas = data.message.datoList;
      console.log(this.lstFacturas)
    }, error => {
      console.error(error);
      this.utilService.errorToast("Error de conexi??n!")
    }

    )
  }
  async ride(ride) {
    const loading = await this.loadingController.create({ message: 'Descargando ...' })
    await loading.present();
    const platform = Capacitor.getPlatform()
    if (platform === "web") {
      this.cnx.download_pdf("Sales Invoice", ride.name, "Factura_electronica").subscribe(result => {

        var url = window.URL.createObjectURL(result);

        window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=auto,left=auto,width=auto,height=auto");
        loading.dismiss();
      }, error => {
        console.error(error)
        loading.dismiss();
        this.utilService.errorToast("Error de descarga!")
      });

    } else {
      loading.dismiss();
      //Para dispositivo movil
      this.downloadTelefono(ride);
    }


  }

  async downloadTelefono(url) {
     const loading = await this.loadingController.create({ message: 'Descargando ...' })
     await loading.present();
     const dummyPDF = url.ride;
     const name = url.claveacceso;
     // Determinar ruta donde se guardar?? el archivo
     const filePath = `${File.externalApplicationStorageDirectory + 'files/' + name}.pdf`//SE GUARDA EN SSD EXTERNA ANDORID FILES
    
     File.checkDir(File.externalApplicationStorageDirectory, 'files/').then(_ =>{console.log('Directory exists');} ).catch(err => {console.log('Directory doesn\'t exist')});
     // Guardar ruta donde se guard?? el archivo en LocalStorage
     sessionStorage.setItem("DUMMY", filePath)
     await HTTP.downloadFile(dummyPDF, {}, {}, filePath).then(res => {
       this.abrirTelefono().then(res => {
         loading.dismiss();
       });
     })
  }

  async abrirTelefono() {

      const filePath = sessionStorage.getItem("DUMMY")
  
      if (!filePath) {
        this.utilService.errorToast("No se ha descargado el archivo")
      } else {
        // Se debe especificar que tipo de archivo es
        const mimeType = "application/pdf"
        // Abrir archivo
        await this.fileOpener.open(filePath, mimeType).then(res => {
          return res
        }, error => {
          console.error(error)
          this.utilService.errorToast("Error al visualizar!")
        })
      }
  }


  async verDetalleFacturas(item) {
    /*  console.log(name)
     this.navController.navigateRoot("detallefactura/" + name.name) */
    console.log(item)
    const modal = await this.modalController.create({
      component: DetallefacturaPage,
      cssClass: 'custom_modal',
      mode: 'ios',
      backdropDismiss: true,
      componentProps: {
        nuevo: item,

      }
    });

    modal.onDidDismiss().then((dataDevuelta) => {

      console.log(dataDevuelta.data)
      if (dataDevuelta.data) {
        this.get_facturas(null, null);
      }
    });
    return await modal.present();

  }
  reload() {
    this.lstFacturas = null;
    this.fecha_desde = "";
    this.fecha_hasta = "";
    this.get_facturas(null, null);
  }
}
