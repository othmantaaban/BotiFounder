import { Component, OnInit,Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listing-discount',
  templateUrl: './listing-discount.component.html',
  styleUrls: ['./listing-discount.component.scss'],
})
export class ListingDiscountComponent implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }
  @Input() items=[];
  // @ts-ignore
  @Input() Title:string;

  ngOnInit() {}

  navigateTo(link: string){
    this.navCtrl.navigateForward([link]);
  }

}
