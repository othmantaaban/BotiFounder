import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient,private api: ApiService) { }

  // public alias='p/tangerine'
  public alias=this.api.alias
  // https://boti.education/'+this.alias+'/founder

  //Encaissement
public getEncaissementList(date): Observable<any> {
  const url = 'get_encaissements';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getEncaissementMoisList(date): Observable<any> {
  const url = 'get_encaissements_mois';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

}

public getEncaissementServiceList(date): Observable<any> {
  const url = 'get_encaissements_services';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getEncaissementAnnulationsList(date): Observable<any> {
  const url = 'get_encaissements_annulations';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getEncaissementCardsList(date): Observable<any> {
  // https://boti.education/'+this.alias+'/founder
  const url = 'get_card_infos';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getEncaissementCardsMoisList(date): Observable<any> {
  const url = 'get_card_infos_mois';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
}

public getEncaissementCardsAnneeList(date): Observable<any> {
  const url = 'get_card_infos_annee';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}



// public getCAList(date): Observable<any> {
//   const url = 'get_ca';
//   let queryParams = new URLSearchParams();
//   queryParams.set("period",date);
//   let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
//   return this.api.get({"period":date},url);
//   // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

//   // return this.http.get<any>(url,{headers,params:{"period":date}});
// }

public getEncaissementsAnnuelList(date): Observable<any> {
  const url = 'get_encaissements_annuel';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}


public getYearsList(date): Observable<any> {
  const url = 'get_years_encaissements';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getMonthList(date): Observable<any> {
  const url = 'get_months_name_encaissements';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

//Dépenses
public getDepensesList(date): Observable<any> {
  const url = 'get_depenses';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

//Retards
public getRetardsList(date): Observable<any> {
  const url = 'get_retards';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getRetardsMoisList(date): Observable<any> {
  const url = 'etat_impayes_parents';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getRetardsAnnuelList(date): Observable<any> {
  const url = 'get_retards_annuel';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getDepensesAnnuelList(date): Observable<any> {
  const url = 'get_depenses_annuel';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getDiscountsList(date): Observable<any> {
  const url = 'get_discounts';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http:/localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});

  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getAvoirsList(date): Observable<any> {
  const url = 'get_avoirs';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getRecouvrementsList(date): Observable<any> {
  const url = 'get_recouvrements';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

public getCAList(date): Observable<any> {
  const url = 'get_ca_mois';
  let queryParams = new URLSearchParams();
  queryParams.set("period",date);
  let headers=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
  return this.api.get({"period":date},url);
  // return this.http.get<any>("http://localhost/boti/apiFounder/"+url,{headers,params:{"period":date}});
  // return this.http.get<any>(url,{headers,params:{"period":date}});
}

}
