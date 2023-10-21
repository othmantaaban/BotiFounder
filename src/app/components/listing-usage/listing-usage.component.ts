import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-usage',
  templateUrl: './listing-usage.component.html',
  styleUrls: ['./listing-usage.component.scss'],
})
export class ListingUsageComponent implements OnInit {

  constructor() { }

  @Input() items=[];
  @Input() Title:string;

  ngOnInit() {}

}
