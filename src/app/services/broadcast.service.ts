import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BroadcastService {

  constructor(private http: HttpClient) { }

  
  
  get(token, uid): Observable<any>{
    return this.http
      .get<any>('http://10.98.101.142/apsinthe/trackR/index.php/userprofile?token=' + token + '&uid=' + uid)
  }

}
