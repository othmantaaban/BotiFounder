import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient,private api: ApiService) { }

  // public alias='p/tangerine'
  public alias=this.api.alias

  public getMessages(date): Observable<any> {
    const url = 'get_messages';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  public getMessagesMois(date): Observable<any> {
    const url = 'get_messages_mois';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  public getDemandes(date): Observable<any> {
    const url = 'get_demandes';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  public getDemandesMois(date): Observable<any> {
    const url = 'get_demandes_mois';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  public getAbsencesPerso(date): Observable<any> {
    const url = 'get_absences_perso';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  // public getConnexions(date): Observable<any> {
  //   const url = 'https://boti.education/p/tangerine/founder//get_connexions';
  //   let queryParams = new URLSearchParams();
  //   queryParams.set("period",date);
  //   let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  //   return this.http.get<any>(url,{headers,params:{"period":date}});
  // }

  public getAbsences(date): Observable<any> {
    const url = 'get_absences';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }
}
