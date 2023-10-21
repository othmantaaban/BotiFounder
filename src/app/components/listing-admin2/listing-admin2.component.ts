import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-admin2',
  templateUrl: './listing-admin2.component.html',
  styleUrls: ['./listing-admin2.component.scss'],
})
export class ListingAdmin2Component implements OnInit {

  constructor() { }
  // @ts-ignore
  @Input() Title:string;
  @Input() items=[];
  ngOnInit() {}

}
