import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoCicloEstacionComponent } from './tiempo-ciclo-estacion.component';

describe('TiempoCicloEstacionComponent', () => {
  let component: TiempoCicloEstacionComponent;
  let fixture: ComponentFixture<TiempoCicloEstacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiempoCicloEstacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoCicloEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
