import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashloginComponent } from './dashlogin.component';

describe('DashloginComponent', () => {
  let component: DashloginComponent;
  let fixture: ComponentFixture<DashloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
