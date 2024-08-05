import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidezComponent } from './liquidez.component';

describe('LiquidezComponent', () => {
  let component: LiquidezComponent;
  let fixture: ComponentFixture<LiquidezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidezComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiquidezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
