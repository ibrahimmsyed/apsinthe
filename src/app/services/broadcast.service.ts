import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seek } from '../model/broadcast';

@Injectable()
export class BroadcastService {
  seekers: Seek;
  constructor(private http: HttpClient) { }

  
  
  get(token, uid): Observable<any>{
    return this.http
      .get<any>('http://10.98.101.142/apsinthe/trackR/index.php/OfferSeek/broadcastlist?token=' + token + '&uid=' + uid)
  }

  createbroadcast(seekers){
    console.log(seekers);
    return this.http.post<any>('http://10.98.101.142/apsinthe/trackR/index.php/OfferSeek/createbroadcast', {
      "token" : seekers.user_token,
      "uid" : seekers.send_party,
      "TITLE" : seekers.title,
      "MESSAGE": seekers.message,
      "SEND_PARTY": seekers.send_party,
      "BROAD_STATUS": seekers.broad_status
      })
        .map(data => {
            return data;

        });
  }

  getbroadcast(token, uid, bid): Observable<any>{
    return this.http
      .get<any>('http://10.98.101.142/apsinthe/trackR/index.php/OfferSeek/broadcastdetails?token=' + token + '&uid=' + uid + '&broadcast_id='+bid)
  }

  getuserbroadcastlist(token, uid): Observable<any>{
    return this.http
      .get<any>('http://10.98.101.142/apsinthe/trackR/index.php/OfferSeek/getuserbroadcastlist?token=' + token + '&uid=' + uid)
  }

  getuserreceivedlist(token, uid): Observable<any>{
    return this.http
      .get<any>('http://10.98.101.142/apsinthe/trackR/index.php/OfferSeek/getuserreceivedlist?token=' + token + '&uid=' + uid)
  }

  getuserdata(token, uid, userid): Observable<any>{
    return this.http
      .get<any>('http://10.98.101.142/apsinthe/trackR/index.php/OfferSeek/getuserdata?token=' + token + '&uid=' + uid + '&user_id='+userid)
  }

  acceptbroadcast(token, uid, bid): Observable<any>{
    return this.http
      .post<any>('http://10.98.101.142/apsinthe/trackR/index.php/OfferSeek/acceptbroadcast', {"token" : token , "uid" : uid , "BROAD_ID" : bid})
      .map(data => {
        return data;
      });
  }
  

}
