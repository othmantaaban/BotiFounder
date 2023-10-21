import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanceAnneeDashPage } from './finance-annee-dash.page';

describe('FinanceAnneeDashPage', () => {
  let component: FinanceAnneeDashPage;
  let fixture: ComponentFixture<FinanceAnneeDashPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAnneeDashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceAnneeDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
