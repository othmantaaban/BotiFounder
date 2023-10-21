import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from './services/api/auth.service';
import { SchoolService } from './services/school.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage,
    private auth: AuthService,
    private schoolService: SchoolService
    ) {
    this.storage.create().then(()=>{
      this.storage.get('founder_school').then((val)=>{
        if(val){
          this.schoolService.currentSchool = JSON.parse(val);
          if(this.schoolService.currentSchool.color){
            document.querySelector('ion-app').style.setProperty('--main-color', this.schoolService.currentSchool.color,'important');
          }
        }else{
          this.schoolService.currentSchool = null;

        }
      });
    });

   }

      // $scope.$on("$ionicView.afterEnter", function(event, data) {
      // window.dispatchEvent(new Event('resize'));}
  ngOnInit(): void {
    // window.dispatchEvent(new Event('resize'));
    const evt = new Event('resize', {bubbles:true, cancelable:true});
    window.dispatchEvent(evt);


  }
}
