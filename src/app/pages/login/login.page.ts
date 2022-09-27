import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;
  isSubmitted = false;
  testValue:any;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private authService:AuthService,
    private loadingCtrl:LoadingController,
    private utilService:UtilService,
    private menuController: MenuController
  ) {
   }

  ngOnInit() {
    this.menuController.enable(false);
    this.loginForm = this.formBuilder.group({
      password: ['JAAB.2022', [Validators.required, Validators.minLength(2)]],
      usuario: ['1600362774001', [Validators.required]],

    })
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      console.log(this.loginForm.value)
      this.login(this.loginForm.value);
      
    }
  }

  
    async onForgot() {
    var a = await this.utilService.getStorage("prueba")
    
  }

  async login(data) {
    //this.navCtrl.navigateRoot(['tabs']);
    const loading = await this.loadingCtrl.create({ message: 'Validando datos',spinner: 'dots', })
    await loading.present();
    this.authService.login(data).subscribe(res=>{

      console.log("res:",res)
      if (res["message"].estado == true) {
        this.utilService.setStorage("token",res["message"].datoList.api_user)
        this.utilService.setStorage("compania",res["message"].datoList.compania);     
        this.utilService.setStorage("user",res["message"].datoList.user);
        this.utilService.setStorage("abbr",res["message"].datoList.abbr);

        sessionStorage.setItem('compania',res["message"].datoList.compania);
        sessionStorage.setItem('token',res["message"].datoList.api_user);

        
        this.navCtrl.navigateRoot(['tabs']);
      }else{
        console.log("falso")
        this.utilService.showErrorAlert("Usuario o contraseña incorrectos");
      }
      loading.dismiss();
    }, error => {      
      this.utilService.showToast("Error de conexion..!","danger","top")
      console.error(error.message)
      loading.dismiss();
      //this.errorConexion();
    });
    //this.navCtrl.navigateRoot(['tabs']);
  }

  mostrarPassword(){
    var tipo = document.getElementById("password");
    var ojo = document.getElementById("ojo");
   
    if(tipo["type"] == "password"){
        tipo["type"] = "text";
        ojo["name"] = "eye";
    }else{
        tipo["type"] = "password";
        ojo["name"] = "eye-off";
    }
}
}
