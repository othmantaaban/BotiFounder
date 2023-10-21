import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-finance',
  templateUrl: './cards-finance.component.html',
  styleUrls: ['./cards-finance.component.scss'],
})
export class CardsFinanceComponent implements OnInit {
  

  @Input() items:any = [];
  @Input() loader:boolean = true;
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
