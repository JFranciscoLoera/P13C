import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandesPerdidasComponent } from './grandes-perdidas.component';

describe('GrandesPerdidasComponent', () => {
  let component: GrandesPerdidasComponent;
  let fixture: ComponentFixture<GrandesPerdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrandesPerdidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrandesPerdidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
