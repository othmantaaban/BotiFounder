import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';
@Injectable({
  providedIn: 'root'
})
export class UsageService {

  constructor(private http: HttpClient,private api: ApiService) { }

  // public alias='p/tangerine'
  public alias=this.api.alias

  public getConnexions(date): Observable<any> {
    const url = 'get_connexions';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
    // return this.http.get<any>(url,{headers,params:{"period":date}});
  }

  public getConnexionsCycle(date): Observable<any> {
    const url = 'get_connexions_cycle';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
    // return this.http.get<any>(url,{headers,params:{"period":date}});
  }

  public getNonConnecte(date): Observable<any> {
    const url = 'get_non_connectes';
    let queryParams = new URLSearchParams();
    queryParams.set("period",date);
    let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
    // return this.http.get<any>(url,{headers,params:{"period":date}});
  }

}
