import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-suivi-inscription',
  templateUrl: './suivi-inscription.page.html',
  styleUrls: ['./suivi-inscription.page.scss'],
})
export class SuiviInscriptionPage implements OnInit {
  _result: any;

  loading: any;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    // loop: true,
    centeredSlides: true,
    // spaceBetween: 20,
    // autoplay: true
  };

  datasetPieInscriReinscri = {
    labels: [''],
    datasets: [100]
  }

  datasetPieInscri = {
    labels: [''],
    datasets: [100]
  }

  datasetPieReinscri = {
    labels: [''],
    datasets: [100]
  }

  datasetBarInscri = {
    labels: [''],
    datasets:
    {
      data: [0],
      label: ''
    }
  }

  datasetBarReinscri = {
    labels: [''],
    datasets:
    {
      data: [0],
      label: ''
    }
  }

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private loadingController: LoadingController
  ) {

  }

  ngOnInit() {
    this.presentLoader().then(() => {
      this.getData();
    })
  }

  getData() {
    this.api.get({}, 'etat_inscriptions_reinscription').subscribe((result) => {
      this._result = result;
      console.log(result)

      this.datasetPieInscriReinscri = {
        labels: ['Inscriptions', 'Ré-inscriptions'],
        datasets: [result.count_new_inscriptions, result.count_reinscriptions]
      }

      let dataset_inscri = [];
      let label_inscri = [];

      let dataset_reinscri = [];
      let label_reinscri = [];

      result.cycles.forEach(cycle => {
        dataset_inscri.push(cycle.inscriptions);
        label_inscri.push(cycle.label);

        dataset_reinscri.push(cycle.reinscriptions);
        label_reinscri.push(cycle.label);


        let dataset_bar_inscri = [];
        let label_bar_inscri = [];

        let dataset_bar_reinscri = [];
        let label_bar_reinscri = [];

        cycle.niveaux.forEach(niv => {
          dataset_bar_inscri.push(niv.inscriptions);
          label_bar_inscri.push(niv.label);
          dataset_bar_reinscri.push(niv.reinscriptions);
          label_bar_reinscri.push(niv.label);
        });

        this.datasetBarInscri[cycle.alias] = {
          labels: label_bar_inscri,
          datasets: [
            {
              data: dataset_bar_inscri,
              label: '',
              backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"]
            }
          ]
        };
        // console.log(`bar inscri`,this.datasetBarInscri);

        this.datasetBarReinscri[cycle.alias] = {
          labels: label_bar_reinscri,
          datasets: [
            {
              data: dataset_bar_reinscri,
              label: '',
              backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"]
            }
          ]
        };

      });

      this.datasetPieInscri = {
        labels: label_inscri,
        datasets: dataset_inscri
      };

      this.datasetPieReinscri = {
        labels: label_reinscri,
        datasets: dataset_reinscri
      };

      this.loading.dismiss();

    })
  }

  async presentLoader() {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: 'Loading Data, Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    })

    this.loading.present();
  }

  getObjectInscri(cycle) {
    // console.log((Object.values(this.datasetBarInscri)[(Object.keys(this.datasetBarInscri).indexOf(cycle))] as any).datasets);
    return Object.values(this.datasetBarInscri)[(Object.keys(this.datasetBarInscri).indexOf(cycle))] as any;
  }

  getObjectReInscri(cycle) {
    // console.log((Object.values(this.datasetBarInscri)[(Object.keys(this.datasetBarInscri).indexOf(cycle))] as any).datasets);
    return Object.values(this.datasetBarReinscri)[(Object.keys(this.datasetBarReinscri).indexOf(cycle))] as any;
  }

  logout() {
    this.auth.logout();
  }

}
