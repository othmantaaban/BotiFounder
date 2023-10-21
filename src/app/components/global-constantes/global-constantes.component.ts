import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-constantes',
  templateUrl: './global-constantes.component.html',
  styleUrls: ['./global-constantes.component.scss'],
})
export class GlobalConstantesComponent implements OnInit {

  // public static dateValue=new Date().toLocaleDateString('fr-FR');;
  public static dateValue=0;

      
  constructor() { }

  ngOnInit() {}

}
