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
    pager: true,
    // loop: true,
    centeredSlides: true,
    spaceBetween: 5,
    // autoplay: true
  };
  
  constructor() { }

  ngOnInit() {}

}
