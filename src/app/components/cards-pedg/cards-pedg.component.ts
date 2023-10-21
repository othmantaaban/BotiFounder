import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-pedg',
  templateUrl: './cards-pedg.component.html',
  styleUrls: ['./cards-pedg.component.scss'],
})
export class CardsPedgComponent implements OnInit {

  constructor() { }
  @Input() items:any[] = [];

  ngOnInit() {
  }

}
