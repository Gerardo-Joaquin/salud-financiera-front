import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasivoVerticalComponent } from './pasivo-vertical.component';

describe('PasivoVerticalComponent', () => {
  let component: PasivoVerticalComponent;
  let fixture: ComponentFixture<PasivoVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasivoVerticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasivoVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
