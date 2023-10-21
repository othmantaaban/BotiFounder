import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
// import { ApiService } from 'src/app/services/api.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finance-jour-dash',
  templateUrl: './finance-jour-dash.page.html',
  styleUrls: ['./finance-jour-dash.page.scss'],
})
export class FinanceJourDashPage implements OnInit {

  @ViewChild('slides') slides;

  public loader_obj = {
    card_infos : false,
    encaiss: false,
    recouvrement: false,
    annulations: false,
    avoirs: false,
    remise: false,
    depense: false
  }
  depenses: any = []
  depensesCategLabels: any = []
  depensesCategData: any = []

  depensesPrestataireLabels: any = []
  depensesPrestataireData: any = []

  listDepenses: any = []

  public itemsEncaissement = [];

  public itemsAnnulations = [];
  public depensesLst = [];
  public itemsDepenses = [];
  public discountsList = [];
  public depensesList = [];

  // recouvrement variables
  public recouvrementsList = [];
  public recouvrementsTitles : any = [];
  // recouvrement variables
  
  // avoirs variables
  
  public avoirsList = [];
  public avoirsTitles : any = []
  
  // avoirs variables
  
  // annulations variables

  public annulationsList = [];
  public annulationsTitles = ""

  // annulations variables


  public absentsList = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    centeredSlides: true,
  };

  pathList = [
    { vue: 'Jour', path: '/tabs/finance-jour-dash', value: 'jour' },
    { vue: 'Mois', path: '/tabs/finance-mois-dash', value: 'mois' },
    // { vue: 'Annee', path:'/tabs/finance-annee-dash', value:'annee'}
  ];


  //BarChart
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    indexAxis: 'x',
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: "#F7643B" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: "#2B2A64" }
  ];

  ionViewWillEnter() {
    this.callApi()
  }

  // remise variables
  public remise = []
  public remise_count = 0
  public remise_titles : any = []
  // remise variables

  // encaissement variables
  public encaiss : any = []

  public encCycleLabels = [];
  public encCycleData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  public encTypeLabels = [];
  public encTypeData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  public encServiceLabels = [];
  public encServiceData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  // encaissement variables



  public depCategorieLabels = [];
  public depCategorieData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];
  public depPrestLabels: string[] = [];
  public depPrestData: ChartData<'pie'> = {
    labels: this.depPrestLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };

  public encSiteLabels = [];
  public encSiteData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];
;

  slideChanged() {
  }

  clickEventSubscription: Subscription;
  constructor(
    private api : ApiService,  
    private financeService: FinanceService, 
    private cdr: ChangeDetectorRef, 
    public loadingController: LoadingController, 
    private sharedService: SharedService,
    private navCtrl : NavController 

  ) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe((elt) => {
      // this.callApi();

      if (elt.value == "jour"&&elt.tab=='fin') {
        this.callApi()
      }
    })
  }

  // getEncaissementList :get_encaissements

  // getDepensesList: get_depenses

  callApi() {
    this.loader()

    const formatedDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : formatedDate();
    console.log(date);


        // Cards Prep
    this.financeService.getEncaissementCardsList(JSON.stringify({date: date, type: "jour"}))
    .subscribe(response => {
      
      this.itemsEncaissement = []
      response.forEach(element => {
        console.log(element);
        
        let item = {
          title: element.title,
          montant: element.result.montant,
          alias: element.note,
          unite: "MAD",
          count: element.result.countEleves
        }
        this.itemsEncaissement.push(item)
      });

      this.loader_obj.card_infos = true
      this.loader_dissmis()
    })
    
    // Donut Chart Prep(Encaissement)

    this.encaiss = []

    this.encCycleLabels = []
    this.encCycleData = []

          
    this.encTypeLabels = []
    this.encTypeData = [] 

    this.encServiceLabels = []
    this.encServiceData = []

    this.api.get({period: date, type: "jour"}, "get_encaissements_data")
    .subscribe(response => {
      this.encaiss = response

      this.encCycleLabels = response?.cycle?.labels
      this.encCycleData = response?.cycle?.data

            
      this.encTypeLabels = response?.paiement?.labels
      this.encTypeData = response?.paiement?.data 

      this.encServiceLabels = response?.service?.labels
      this.encServiceData = response?.service?.data

      this.loader_obj.encaiss = true
      this.loader_dissmis()
    })

    
    this.recouvrementsList = []
    this.financeService.getRecouvrementsList(date)
    .subscribe(response => {
      this.recouvrementsList = response.list
      this.recouvrementsTitles = response.titles;

      this.loader_obj.recouvrement = true
      this.loader_dissmis()

    })


    // Listing Annulation:
    // "2022-08-02"
    this.annulationsList = []
    this.financeService.getEncaissementAnnulationsList(date)
    .subscribe(response => {
      this.annulationsList = response.list 
      this.annulationsTitles = response.titles 

      // console.log("Annulation items here: ",this.annulationsList)
      this.loader_obj.annulations = true;
      this.loader_dissmis()
    })


    // this.financeService.getDiscountsList(date)
    // .subscribe(response => {
    //   this.discountsList = []

    //   const data = response.result
    //   // Cycle prep
    //   let dataDiscounts = data.map((d) => ({ Eleve: d.Eleve, Service: d.Service, DiscountAmountTotal: d.DiscountAmountTotal, DiscountAmount: d.DiscountAmount, nbMois: d.nbMois }));

    //   // dataDiscounts.map((d) => {
    //   //   this.discountsList.push({ Eleve: d.Eleve, Service: d.Service, DiscountAmount: d.DiscountAmount, DiscountAmountTotal: d.DiscountAmountTotal })
    //   // })
    //   this.discountsList = [...dataDiscounts]

    //   done6 = true

    // })


    this.avoirsList = []
    this.financeService.getAvoirsList(date)
    .subscribe(response => {

      this.avoirsList = response.list
      this.avoirsTitles = response.Titles

      this.loader_obj.avoirs = true
      this.loader_dissmis()
    })
    // let d = "2023-08-26"
    this.api.get({"period": date},"remises_jour")
    .subscribe(elt => {
      this.remise = elt.requests
      this.remise_count = elt.total
      this.remise_titles = elt.titles
      this.loader_obj.remise = true
      this.loader_dissmis()
    })

    this.api.get({period: date, type: "jour"}, "get_depenses_data")
    .subscribe(response => {
      this.depenses = response
      this.depensesCategLabels = response.category.labels
      this.depensesCategData = response.category.data

      this.depensesPrestataireLabels = response.prestataire.labels
      this.depensesPrestataireData = response.prestataire.data

      this.listDepenses = response.listDepense.list

      this.loader_obj.depense = true
      this.loader_dissmis()
    })
  }


  // Group By Function
  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: '<h3>Loading Data, Please wait...</h3>',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present().then(() => {
      this.callApi();
    }).then(() => {
      loading.dismiss()
    });
    // loading.dismiss()
  }

  // async presentLoadingWithOptions() {
  //   const loading = await this.loadingController.create({
  //     spinner: null,
  //     duration: 3000,
  //     message: '<h3>Loading Data, Please wait...</h3>',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading'
  //   });
  //   return await loading.present();
  // }

  public data: any[];

  ngOnInit() {
    this.cdr.markForCheck();
    console.log("first exec")
    // this.presentLoadingWithOptions() 

    // this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
    //   this.presentLoadingWithOptions()
    // })
  }

  navigateTo(link: string){
    this.navCtrl.navigateRoot([link]);
  }

  
  async loader_dissmis() {
    console.log(this.loader_obj);
    
    if(
      this.loader_obj.card_infos  == true &&
      this.loader_obj.encaiss == true &&
      this.loader_obj.recouvrement == true &&
      this.loader_obj.annulations == true &&
      this.loader_obj.avoirs == true &&
      this.loader_obj.remise == true &&
      this.loader_obj.depense == true 
    ) {
      const loading = await this.loadingController.getTop();
      console.log("cwfcewfwe");
      
      await loading.dismiss()
    }
  }

  async loader() {
    this.loader_obj = {
      card_infos : false,
      encaiss: false,
      recouvrement: false,
      annulations: false,
      avoirs: false,
      remise: false,
      depense: false
    }
    const top = await this.loadingController.getTop()
    if(top == undefined) {
      const loading = await this.loadingController.create({
        spinner: null,
        message: '<h3>Loading Data, Please wait...</h3>',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
  
      await loading.present();
    }

  }

}
