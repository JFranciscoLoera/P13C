import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeJphComponent } from './oee-jph.component';

describe('OeeJphComponent', () => {
  let component: OeeJphComponent;
  let fixture: ComponentFixture<OeeJphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OeeJphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OeeJphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
