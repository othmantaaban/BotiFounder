import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingFinanceDepenseComponent } from './listing-finance-depense.component';

describe('ListingFinanceDepenseComponent', () => {
  let component: ListingFinanceDepenseComponent;
  let fixture: ComponentFixture<ListingFinanceDepenseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingFinanceDepenseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingFinanceDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
