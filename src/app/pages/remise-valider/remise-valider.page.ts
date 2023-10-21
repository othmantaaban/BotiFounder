import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-remise-valider',
  templateUrl: './remise-valider.page.html',
  styleUrls: ['./remise-valider.page.scss'],
})
export class RemiseValiderPage implements OnInit {
  _result: any;

  loading: any;

  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private auth: AuthService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoader().then(() => {
      this.getData();
    })
  }

  async presentLoader() {
    this.loading = await this.loadingController.create({
      spinner: 'lines-small',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    })

    this.loading.present();
  }

  getData(){

    this.api.get({}, 'remises_valider').subscribe((result) => {
      console.log(result);
      
      this._result = result;
    },
    (error)=>{
    },
    ()=>{

      this.loading.dismiss();
    })
  }

  navigateTo(link: string){
    this.navCtrl.navigateRoot([link]);
  }

  traiterRemise(request: any,etat:string){
    this.presentLoader().then(() => {
      this.api.post({
        user: this.auth.user,
        request: request.id,
        etat: etat
      }, 'remises_valider').subscribe((result) => {
        this.getData();
      },
      (error)=>{
      })
    })
  }
}
