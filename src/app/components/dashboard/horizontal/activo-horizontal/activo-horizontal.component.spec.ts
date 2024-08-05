import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoHorizontalComponent } from './activo-horizontal.component';

describe('ActivoHorizontalComponent', () => {
  let component: ActivoHorizontalComponent;
  let fixture: ComponentFixture<ActivoHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivoHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivoHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
