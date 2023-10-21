import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.page.html',
  styleUrls: ['./loading-page.page.scss'],
})
export class LoadingPagePage implements OnInit {

  constructor(public loadingController: LoadingController) { }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Loading Data, Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  ngOnInit() {
    this.presentLoadingWithOptions();
  }

}
