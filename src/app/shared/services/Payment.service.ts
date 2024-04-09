import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePaymentRequest(paymentData): Observable<any> {
    const url = 'https://api.zotapay.com/api/v1/payout/request/1050/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    let params = new HttpParams();
    for(let key in paymentData){
      params = params.set(key, paymentData[key]);
    }

    return this.http.post(url, params.toString(), { headers });
  }
}
