import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-pedagv2',
  templateUrl: './cards-pedagv2.component.html',
  styleUrls: ['./cards-pedagv2.component.scss'],
})
export class CardsPedagv2Component implements OnInit {

  constructor() { }
  @Input() items=[];
  ngOnInit() {
  }

}
