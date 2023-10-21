import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-finance',
  templateUrl: './listing-finance.component.html',
  styleUrls: ['./listing-finance.component.scss'],
})
export class ListingFinanceComponent implements OnInit {
  

  @Input() items=[];
  @Input() Title:string;
  constructor() { }

  ngOnInit() {}

}
