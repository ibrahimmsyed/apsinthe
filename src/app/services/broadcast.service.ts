import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seek } from '../model/broadcast';

@Injectable()
export class BroadcastService {
  seekers: Seek;
  constructor(private http: HttpClient) { }

  private url = 'http://10.98.101.142/apsinthe/trackR/index.php/'; 
  //private url = 'http://10.98.20.100/trackRR/index.php/';
  
  get(token, uid): Observable<any>{
    return this.http
      .get<any>(this.url+'OfferSeek/broadcastlist?token=' + token + '&uid=' + uid)
  }

  createbroadcast(seekers){
    console.log(seekers);
    return this.http.post<any>(this.url+'OfferSeek/createbroadcast', {
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
      .get<any>(this.url+'OfferSeek/broadcastdetails?token=' + token + '&uid=' + uid + '&broadcast_id='+bid)
  }

  getuserbroadcastlist(token, uid): Observable<any>{
    return this.http
      .get<any>(this.url+'OfferSeek/getuserbroadcastlist?token=' + token + '&uid=' + uid)
  }

  getuserreceivedlist(token, uid): Observable<any>{
    return this.http
      .get<any>(this.url+'OfferSeek/getuserreceivedlist?token=' + token + '&uid=' + uid)
  }

  getuserdata(token, uid, userid): Observable<any>{
    return this.http
      .get<any>(this.url+'OfferSeek/getuserdata?token=' + token + '&uid=' + uid + '&user_id='+userid)
  }

  acceptbroadcast(token, uid, bid): Observable<any>{
    return this.http
      .post<any>('OfferSeek/acceptbroadcast', {"token" : token , "uid" : uid , "BROAD_ID" : bid})
      .map(data => {
        return data;
      });
  }
  

}
