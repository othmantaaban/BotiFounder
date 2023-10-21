import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-pedg',
  templateUrl: './cards-pedg.component.html',
  styleUrls: ['./cards-pedg.component.scss'],
})
export class CardsPedgComponent implements OnInit {

  constructor() { }
  @Input() items:any[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 600,
    pager: true,
    // loop: true,
    centeredSlides: true,
    spaceBetween: 5,
    // autoplay: true
  };

  ngOnInit() {
  }

}
