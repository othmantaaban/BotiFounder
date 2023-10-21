import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from '../services/school.service';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  alias: any;

  school: any;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private api: ApiService,
    private schoolService: SchoolService,
    private toastController: ToastController
  ) {

      this.storage.get('founder_school').then((val)=>{
        console.log(val);
        if(val){
          this.school = JSON.parse(val);
        }
      });

    // const localSchool = this.storage.getItem('founder_school');


  }

  ngOnInit() {
    document.querySelector('ion-app').style.setProperty('--main-color', '#241752','important');
  }

  verifyAlias(){
    const url = 'https://boti.education/csm/api/getFounderSchool';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.get<any>(url,
      {
        headers,
        params:{
          alias : this.alias
        }
      }).subscribe(
        (result) => {
          this.school = result;
          console.log(result);
        },
        (error) =>{
          this.toastController.create({
            message: 'School alias is incorrect !',
            duration: 0,
            cssClass: 'custom-toast',
            position: 'middle',
            buttons: [
              {
                cssClass: 'btn-main',
                text: 'OK',
                role: 'cancel'
              }
            ]
          }).then((toast)=>{
            toast.present();
          });
          console.log(error);
        }
      );
  }

  async goToLogin(){
    await this.storage.set('founder_school',JSON.stringify(this.school));
    // this.storage.setItem('founder_school',JSON.stringify(this.school));

    this.schoolService.currentSchool = this.school;
    this.api.alias = this.school.link;

    if(this.school.color){
    document.querySelector('ion-app').style.setProperty('--main-color', this.school.color,'important');
    }

    this.router.navigate(['/login']);

  }

  async resetSchool(){
    await this.storage.set('founder_school',JSON.stringify(this.school));
    this.school = undefined;
  }
}
