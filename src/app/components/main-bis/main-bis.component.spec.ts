import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBisComponent } from './main-bis.component';

describe('MainBisComponent', () => {
  let component: MainBisComponent;
  let fixture: ComponentFixture<MainBisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
