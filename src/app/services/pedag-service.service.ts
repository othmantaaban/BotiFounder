import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';
@Injectable({
  providedIn: 'root'
})
export class PedagServiceService {

  constructor(private http: HttpClient,private api: ApiService) { }

  // public alias='p/tangerine'
  public alias=this.api.alias

  public getAbsences(date): Observable<any> {
    const url = 'get_absences';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  public getAbsencesMois(date): Observable<any> {
    const url = 'get_absences_mois';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  public getRessources(date): Observable<any> {
    const url = 'get_ressources';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>(url,{headers,params:{"period":date}});
  }

  public getDevoirs(date): Observable<any> {
    const url = 'get_devoirs';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>(url,{headers,params:{"period":date}});
  }

  public getCahierTexte(date): Observable<any> {
    const url = 'get_cahier_texte';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get<any>(url,{headers,params:{"period":date}});
  }

  public getRessourcesMois(date): Observable<any> {
    const url = 'get_ressources_mois';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  }

  public getDevoirsMois(date): Observable<any> {
    const url = 'get_devoirs_mois';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

  public getCahierTexteMois(date): Observable<any> {
    const url = 'get_cahier_texte_mois';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.api.get({"period":date},url);
    // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  }

}
