import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { AdministrationService } from 'src/app/services/administration.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-jour-dash',
  templateUrl: './admin-jour-dash.page.html',
  styleUrls: ['./admin-jour-dash.page.scss'],
})
export class AdminJourDashPage implements OnInit {

  clickEventSubscription:Subscription;


  // start first slider
  public itemsAdmin: any=[]

  // end first slider


  public dmd : any = []
  public dmdNatureLabels = []
  public dmdNatureData = []

  public dmdCycleLabels = []
  public dmdCycleData = []

  public dmdEtatLabels = []
  public dmdEtatData = []

  public dmdListingData = []

  // messages

  public msgCycleData: any = [
    {data: [], label: '',backgroundColor:"#2B2A64"},
  ];

  public msgCycleLabels: string[] = [];


  public msgEtatData:any = [
    {data: [], label: '',backgroundColor:"#2B2A64"},
  ];
  public msgEtatLabels = [];

  public msgInfos: any = []
  public messagesList : any = [];

  // abscences
  public absentsList: any=[]


  constructor(
    private adminService : AdministrationService,
    private cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    private sharedService:SharedService,
    private apiService : ApiService
  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe((elt)=>{
      if (elt.value == "jour" && elt.tab=='admin') {
        this.presentLoadingWithOptions();

      }
    })
   }


  ionViewWillEnter() {
    this.callApi()
  }





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
      message: 'Loading Data, Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present().then(()=>{
      this.callApi();
    }).then(()=>{
      loading.dismiss()
    });
    // loading.dismiss()
  }




  callApi(){
    const formatedDate = (date = null) => {
      const currentDate = date ? new Date(date): new Date()
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    let date = formatedDate(DateSegmentsComponent.dateValue);

    this.itemsAdmin=[]


    this.apiService.get({period: date}, "get_card_infos_admin")
    .subscribe(elt => {
      this.itemsAdmin = elt
    })


    this.dmd = []
    this.dmdNatureLabels = []
    this.dmdNatureData = []

    this.dmdCycleLabels = []
    this.dmdCycleData = []

    this.dmdEtatLabels = []
    this.dmdEtatData = []

    this.dmdListingData = []


    this.apiService.get({period: date, type: "jour"}, "get_demandes_new")
    .subscribe(response =>{
      this.dmd = response
      this.dmdNatureLabels = response?.nature?.labels
      this.dmdNatureData = response?.nature?.data

      this.dmdCycleLabels = response?.cycle?.labels
      this.dmdCycleData = response?.cycle?.data

      this.dmdEtatLabels = response?.etat?.labels
      this.dmdEtatData = response?.etat?.data

      this.dmdListingData = response?.listing?.data

      // this.loader_obj.demande = true
      // this.apiService.loader_dissmis(this.loader_obj)
    })

    this.msgCycleData = [];
    this.msgCycleLabels = [];

    this.msgEtatData = [];
    this.msgEtatLabels = [];

    this.messagesList = [];

    this.msgInfos = []

    this.apiService.get({period: date, type: "jour"}, "get_messages_new")
    .subscribe(response =>{
      console.log(response);

      this.msgCycleData = response?.cycle?.data;
      this.msgCycleLabels = response?.cycle?.labels;

      this.msgEtatData = response?.etat?.data;
      this.msgEtatLabels = response?.etat?.labels;

      this.messagesList = response?.listing?.data;

      this.msgInfos = response
      // this.loader_obj.message = true

      // this.apiService.loader_dissmis(this.loader_obj)
    })

    this.absentsList =[]
    this.apiService.get({period: date}, "get_absences_perso_new")
    .subscribe(elt => {
      console.log(elt);

      this.absentsList = elt

      
    })

    // this.adminService.getAbsencesPerso(date).subscribe(response =>{
    //   const data=response.result
    //   // Cycle prep
    //   let dataAbs=data.map((d) => ({User:d.User,Role:d.Role}));
    //   dataAbs.map((a)=>{
    //     this.absentsList.push({User:a.User,Role:a.Role})
    //   })
    // })

  }

    // Group By Function
    groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }

  ngOnInit() {


  }

}
