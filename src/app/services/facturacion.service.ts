import { environment } from './../../environments/environment';
import { ApiService } from './api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private apiURL = environment.apiUrl;
  token:any;
  compania:any;
abbr:any;
  constructor(public apiService: ApiService, private http: HttpClient,
    private utilService:UtilService) {
      this.utilService.getStorage("token").then(res=>{
        this.token=res;
      });
      this.utilService.getStorage("compania").then(res=>{
        this.compania=res;
      });
      this.utilService.getStorage("abbr").then(res=>{
        this.abbr=res;
      });
  }

    get_facturas(desde,hasta){  
    let  requestOptions = { headers:    new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    }) }; 
    let url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.facturacion.get_facturas"
    let urlfull  = `${url}?compania=${this.compania}&desde=${desde}&hasta=${hasta}`
  
    return this.http.get(urlfull, requestOptions);
     
  }
  crear_factura(datos)
  {  
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization':   this.token 
    });
    let url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.facturacion.crear_factura"
    let params = {'datos':datos };  
    return this.http.post(url, params, { responseType: 'json', headers: header});
  }


  get_detalle_factura(factura_name){  
    let  requestOptions = { headers:    new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    }) }; 
    let url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.facturacion.get_detalle_factura"
    let urlfull  = `${url}?name_factura=${factura_name}`
 
    return this.http.get(urlfull, requestOptions);
     
  }

  crear_nota_credito(nameFactura){

    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization':  this.token
      })
    };
    let datos ={factura:nameFactura}
  
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.nota_de_credito.crear_nota_credito"
    return this.http.post(url, datos, header);
    
  }

  
  get_nota_credito_todos(){

    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization':  this.token
      })
    };
    let datos ={compania:this.compania}
  
    const url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.nota_de_credito.get_nota_credito_todos"
    return this.http.post(url, datos, header);
    
  }

  download_pdf(doctype:any,name:any,format:any){
    
     const headers= new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization':  this.token
      })
    
    let url = this.apiURL + 'method/ec_erpnext.ec_erpnext.api_rest.nota_de_credito.download_pdf'
    let datos = {
      doctype: doctype,
      name:name,
      format:format

    };

    return this.http.post(url,datos, { responseType: 'blob', headers: headers })
  }

  get_nota_credito(desde,hasta,token,compania){  
    let  requestOptions = { headers:    new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    }) }; 
    let url= this.apiURL+"method/ec_erpnext.ec_erpnext.api_rest.nota_de_credito.get_nota_credito"
    let urlfull  = `${url}?compania=${compania}&desde=${desde}&hasta=${hasta}`
  
    return this.http.get(urlfull, requestOptions);
     
  }

}
