import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingFinanceAvoirsComponent } from './listing-finance-avoirs.component';

describe('ListingFinanceAvoirsComponent', () => {
  let component: ListingFinanceAvoirsComponent;
  let fixture: ComponentFixture<ListingFinanceAvoirsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingFinanceAvoirsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingFinanceAvoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
