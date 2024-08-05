import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasivoHorizontalComponent } from './pasivo-horizontal.component';

describe('PasivoHorizontalComponent', () => {
  let component: PasivoHorizontalComponent;
  let fixture: ComponentFixture<PasivoHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasivoHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasivoHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
