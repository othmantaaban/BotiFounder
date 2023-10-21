import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
