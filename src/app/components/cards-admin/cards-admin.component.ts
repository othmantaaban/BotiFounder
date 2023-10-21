import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-admin',
  templateUrl: './cards-admin.component.html',
  styleUrls: ['./cards-admin.component.scss'],
})
export class CardsAdminComponent implements OnInit {


  @Input() items: any[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 600,
    // loop: true,
    centeredSlides: true,
    // spaceBetween: 20,
    // autoplay: true
  };
  
  constructor() { }

  ngOnInit() {}

}
