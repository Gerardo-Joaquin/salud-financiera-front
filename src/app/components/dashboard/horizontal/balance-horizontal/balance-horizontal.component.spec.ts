import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceHorizontalComponent } from './balance-horizontal.component';

describe('BalanceHorizontalComponent', () => {
  let component: BalanceHorizontalComponent;
  let fixture: ComponentFixture<BalanceHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalanceHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
