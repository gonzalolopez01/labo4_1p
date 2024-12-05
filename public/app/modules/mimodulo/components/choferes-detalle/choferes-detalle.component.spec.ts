import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesDetalleComponent } from './choferes-detalle.component';

describe('ChoferesDetalleComponent', () => {
  let component: ChoferesDetalleComponent;
  let fixture: ComponentFixture<ChoferesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoferesDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoferesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
