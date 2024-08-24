import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoProductivoComponent } from './tiempo-productivo.component';

describe('TiempoProductivoComponent', () => {
  let component: TiempoProductivoComponent;
  let fixture: ComponentFixture<TiempoProductivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiempoProductivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoProductivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
