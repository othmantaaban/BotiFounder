import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  school: any;

  constructor(
    public schoolService: SchoolService,
  ) { 
    this.school = schoolService.currentSchool;
  }

  ngOnInit() {
  }

}
