import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoLimadoComponent } from './tiempo-limado.component';

describe('TiempoLimadoComponent', () => {
  let component: TiempoLimadoComponent;
  let fixture: ComponentFixture<TiempoLimadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiempoLimadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoLimadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
