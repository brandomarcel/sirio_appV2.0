import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { UtilService } from './util.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiURL = environment.apiUrl;
  token:any;
  compania:any;
  abbr:any;
  constructor(public apiService: ApiService, private http: HttpClient,
    private utilService:UtilService) {
      this.utilService.getStorage("token").then(res=>{
        this.token=res;
      })
      this.utilService.getStorage("compania").then(res=>{
        this.compania=res;
      });
      this.utilService.getStorage("abbr").then(res=>{
        this.abbr=res;
      });

  }

  get_informacion(){

    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization':  this.token
      })
    };
    let datos ={compania:this.compania}
  
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.informacion.get_informacion"

    return this.http.post(url, datos, header);
  }
}
