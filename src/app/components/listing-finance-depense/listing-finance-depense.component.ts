import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-finance-depense',
  templateUrl: './listing-finance-depense.component.html',
  styleUrls: ['./listing-finance-depense.component.scss'],
})
export class ListingFinanceDepenseComponent implements OnInit {
  

  @Input() items=[];
  @Input() Title:string;
  constructor() { }

  ngOnInit() {}

}
