import { NavController } from '@ionic/angular';
import { environment } from './../../environments/environment';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiUrl;
  constructor(public apiService: ApiService, private http: HttpClient,
    private utilService:UtilService,private navController:NavController) {

  }
  
  login(data) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.update.login"
    console.log(data);
    return this.http.post(url, data);
  }

  logout(){
    this.utilService.removeStorage("user");
    this.utilService.removeStorage("compania");
    this.utilService.removeStorage("token");
    this.utilService.removeStorage("abbr");
    this.navController.navigateRoot(['login']);

  }
}
