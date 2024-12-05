import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesTablaComponent } from './choferes-tabla.component';

describe('ChoferesTablaComponent', () => {
  let component: ChoferesTablaComponent;
  let fixture: ComponentFixture<ChoferesTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoferesTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoferesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
