import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoVerticalComponent } from './activo-vertical.component';

describe('ActivoVerticalComponent', () => {
  let component: ActivoVerticalComponent;
  let fixture: ComponentFixture<ActivoVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivoVerticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivoVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
