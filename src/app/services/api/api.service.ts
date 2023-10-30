import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolService } from '../school.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public alias = 'p/demo';

  constructor(
    private http: HttpClient,
    private schoolService: SchoolService,
    public loadingController: LoadingController,
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

  async loader() {
    const top = await this.loadingController.getTop()
    if(top == undefined) {
      const loading = await this.loadingController.create({
        spinner: null,
        message: 'Loading Data, Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });

      await loading.present();
    }

  }

  async loader_dissmis(obj : Object) {
    // console.log(this.loader_obj);
    let objVal = Object.values(obj)
    let check = true
    objVal.every((elt) => {
      if(elt == false) {
        check = false
        return false
      }
      return true
    })

    if(check) {
      const loading = await this.loadingController.getTop();

      await loading.dismiss()
    }

    // if(check) {
    // }
  }

}
