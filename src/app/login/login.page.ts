import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// import { FinanceJourDashPage } from '../pages/finance-jour-dash/finance-jour-dash.page';
import { AuthService } from '../services/api/auth.service';
import { SchoolService } from '../services/school.service';
import { SharedService } from '../services/shared.service';
// import { SharedService } from '../services/shared.service';
// import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  school: any;
  public loginForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public auth: AuthService,
    public schoolService: SchoolService,
    private toastController: ToastController,
    private sharedService: SharedService
  ) {
    this.school = schoolService.currentSchool;
    console.log(this.school);

    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSignIn() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
        this.auth.login(this.loginForm.value)
        .then(
          (res) => {
            console.log(res);
            if (res) {
              this.router.navigate(['/tabs']);
            }else{
              this.toastController.create({
                message: 'Login and password are incorrect!',
                duration: 0,
                cssClass: 'custom-toast',
                position: 'middle',
                buttons: [
                  {
                    cssClass: 'btn-main',
                    text: 'OK',
                    role: 'cancel'
                  }
                ]
              }).then((toast)=>{
                toast.present();
              });
            }
          },
          (err) => {
            this.toastController.create({
              message: 'Login and password are incorrect!',
              duration: 0,
              cssClass: 'custom-toast',
              position: 'middle',
              buttons: [
                {
                  cssClass: 'btn-main',
                  text: 'OK',
                  role: 'cancel'
                }
              ]
            }).then((toast)=>{
              toast.present();
            });
            console.log(err);
          },
        );
    }
  }

  changeSchool(){
    document.querySelector('ion-app').style.setProperty('--main-color', '#241752','important');
    
    this.router.navigate(['/']);
  }

}
