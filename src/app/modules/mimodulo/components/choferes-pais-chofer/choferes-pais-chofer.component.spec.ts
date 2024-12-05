import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesPaisChoferComponent } from './choferes-pais-chofer.component';

describe('ChoferesPaisChoferComponent', () => {
  let component: ChoferesPaisChoferComponent;
  let fixture: ComponentFixture<ChoferesPaisChoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoferesPaisChoferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoferesPaisChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
