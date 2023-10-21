import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolService } from '../school.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public alias = 'p/demo';

  constructor(
    private http: HttpClient,
    private schoolService: SchoolService
  ) {

    if (this.schoolService.currentSchool) {
      this.alias = this.schoolService.currentSchool.link;
    } else {
      this.schoolService.getschool().then((res) => {
        if (res) {
          this.alias = res.link;
        }
      });
    }

  }

  get(params, url): Observable<any> {
    const type = 'application/x-www-form-urlencoded; charset=UTF-8';

    const optionRequete = {
      params,
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': type
      })
    };

    return this.http
    //     
    // .get("http://localhost/boti_campus/founder_dev/" + url, optionRequete);
    .get('https://boti.education/' + this.alias + '/founder_dev/' + url, optionRequete);


  }

  post(params, url): Observable<any> {
    const data = new FormData();


    Object.entries(params).forEach(([key, value], index) => {
      data.append(key, value as any);
    });
    return this.http
    .post('https://boti.education/' + this.alias + '/founder_dev/' + url, data);
    // .post("http://localhost/boti_campus/founder_dev/" + url, data);

    // .post('http://localhost/boti/apiFounder/' + url, data);
  }

}
