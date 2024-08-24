import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoCicloRobotsComponent } from './tiempo-ciclo-robots.component';

describe('TiempoCicloRobotsComponent', () => {
  let component: TiempoCicloRobotsComponent;
  let fixture: ComponentFixture<TiempoCicloRobotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiempoCicloRobotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoCicloRobotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
