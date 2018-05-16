import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GetDataService {
  
  /* private qualityServiceUrl:string = "http://10.98.20.102/trackR-master/index.php/reports/quality?token=";
  private productivityServiceUrl:string = "http://10.98.20.102/trackR-master/index.php/reports/productivity?token=";
  private utilizationServiceUrl:string = "http://10.98.20.102/trackR-master/index.php/reports/utilization?token=";
  private loginUrl = "http://10.98.20.102/trackR-master/index.php/auth/login"; */

  private qualityServiceUrl:string = "http://10.98.101.142/apsinthe/trackR/index.php/reports/quality?token=";
  private productivityServiceUrl:string = "http://10.98.101.142/apsinthe/trackR/index.php/reports/productivity?token=";
  private utilizationServiceUrl:string = "http://10.98.101.142/apsinthe/trackR/index.php/reports/utilization?token=";
  private loginUrl = "http://10.98.101.142/apsinthe/trackR/index.php/auth/login";

  extractData:any;
  handleErrorObservable:any;

  constructor( private http:HttpClient) { }

  getProductivityData(usrToken, uId,role){
    return this.http.get(this.productivityServiceUrl+ usrToken + '&uid=' + uId+ '&role='+role).map(data => { return data; });
  }

  getQualityData(usrToken, uId, role){
    return this.http.get(this.qualityServiceUrl+usrToken + '&uid=' + uId+ '&role='+role).map(data => { return data; });
  }

  getUtilizationData(usrToken, uId, role){
    return this.http.get(this.utilizationServiceUrl+usrToken + '&uid=' + uId+ '&role='+role).map(data => { return data; });
  }

  getLoginData(EmpId,Pwd){
    return this.http.post<any>(this.loginUrl,{empid:EmpId,password:Pwd},{headers: new HttpHeaders().set('Content-Type', 'application/json')},).map(user => {
      // login successful if there's a jwt token in the response
      console.log(user);
      if (user && user.token_id) {
          user.intime = Math.floor(Date.now() / 1000);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    });
  }

}
