import { DetallenotascPage } from './../detallenotasc/detallenotasc.page';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { UtilService } from 'src/app/services/util.service';
import { ModalController, LoadingController } from '@ionic/angular';

import { Capacitor } from "@capacitor/core"
import { HTTP } from "@ionic-native/http"
import { File } from "@ionic-native/file"
import { FileOpener } from "@ionic-native/file-opener/ngx"
@Component({
  selector: 'app-gestioncreditos',
  templateUrl: './gestioncreditos.page.html',
  styleUrls: ['./gestioncreditos.page.scss'],
})
export class GestioncreditosPage implements OnInit {
  listaNotas: any;
  fecha_desde: any;
  fecha_hasta: any;
  fecha_actual: any;
  fechamax: any;

  compania:any;
  token:any;
  abbr:any;

  constructor(public utilService: UtilService,
    private facturacionService: FacturacionService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private fileOpener: FileOpener) {
    this.fecha_actual = new Date();
  }

  ngOnInit() {
    this.fechamax = formatDate((this.fecha_actual), 'yyyy-MM-dd', 'en-US');

  }
  ionViewWillEnter() {
    this.fecha_desde = "";
    this.fecha_hasta = "";
    this.cargarDatos();
  }
  buscarNota() {

    this.get_nota_credito(this.fecha_desde, this.fecha_hasta,this.token,this.compania)

  }

  async cargarDatos(){
    this.compania = await this.utilService.getStorage("compania")
    
    this.token = await this.utilService.getStorage("token")
 
    
    this.get_nota_credito(null,null,this.token,this.compania)
  }


  get_nota_credito(desde, hasta,token,compania) {
    this.listaNotas = null;
    this.facturacionService.get_nota_credito(desde, hasta,token,compania).subscribe(res => {
      this.listaNotas = res['message'].datoList;

      console.log(this.listaNotas)
    }, error => {
      console.error(error);
      this.utilService.errorToast("Error de conexi??n!");
    });
  }

  async verDetalleNotas(name) {
    const modal = await this.modalController.create({
      component: DetallenotascPage,
      cssClass: 'custom_modal',
      mode: 'ios',
      componentProps: {
        name: name
      }
    });

    modal.onDidDismiss().then((dataDevuelta) => {
      if (dataDevuelta.data) {
        this.get_nota_credito(null, null,this.token,this.compania);
      }
    });
    return await modal.present();
  }

  async ride(ride) {

    const loading = await this.loadingController.create({ message: 'Descargando ...' })
    await loading.present();

    const platform = Capacitor.getPlatform()
    if (platform === "web") {
      this.facturacionService.download_pdf("Sales Invoice", ride.name, "Nota de Credito").subscribe(result => {

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
    const filePath = `${File.externalApplicationStorageDirectory + 'files/' + name}.pdf`
    //File.checkDir(File.externalApplicationStorageDirectory, 'files/').then(_ =>{console.log('Directory exists');} ).catch(err => {console.log('Directory doesn\'t exist')});
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
        console.log(res)
        return res
      }, error => {
        console.error(error)
        this.utilService.errorToast("Error al visualizar!")
      })
    }
  }


  reload() {
    this.listaNotas = null;
    this.fecha_desde = "";
    this.fecha_hasta = "";
    this.get_nota_credito(null, null,this.token,this.compania);
  }

}
