import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { LoadingController, ModalController,NavController } from '@ionic/angular';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-detallefactura',
  templateUrl: './detallefactura.page.html',
  styleUrls: ['./detallefactura.page.scss'],
})
export class DetallefacturaPage implements OnInit {
  @Input() nuevo:any;
  factura_name:any;
  estado:boolean=false;
  id:any;
  listaFactura:[];
  found:any;
  skull:any;
  contenido:any;
  constructor(
    private facturacionService:FacturacionService,
    private modalController: ModalController,
    private loadingController:LoadingController,
    private utilService:UtilService,
    private activatedRoute:ActivatedRoute,
    private navController:NavController) {

   }

  ngOnInit() {
    console.log("oniit",this.nuevo.name)
   
    this.get_detalle_factura(this.nuevo.name)
  }

  get_detalle_factura(name){

    this.facturacionService.get_detalle_factura(name).subscribe(res=>{
      console.log(res['message'])
      this.listaFactura=res['message']
      this.skull=true;
      this.contenido=true;
    },error =>{
      console.error(error)
      this.utilService.errorToast("Error de conexión!")
    })
  }
  onBack() {
    //this.navController.back();
    this.modalController.dismiss();
  }

 async generarNota(){
    this.utilService.presentConfirm("Confirmación!","Seguro desea generar la nota de crédito?","No","Si").then(res => {
      console.log("respuesta",res)

      if (res=='ok') {
        this.facturacionService.crear_nota_credito("this.name.name").subscribe(res=>{
        console.log(res)

        if (res["message"].estado==true) {
          this.utilService.success_msg(res["message"].dato);
          
           this.onBack()
        
        
          
        }else{
          var error = (res["message"].mensajeError).substring(17,67);
          this.utilService.showErrorAlert(error)
        }

      })
 
      }
      
    })
     
    
  }
}
