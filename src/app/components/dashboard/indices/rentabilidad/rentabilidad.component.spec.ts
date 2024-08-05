import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentabilidadComponent } from './rentabilidad.component';

describe('RentabilidadComponent', () => {
  let component: RentabilidadComponent;
  let fixture: ComponentFixture<RentabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentabilidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
