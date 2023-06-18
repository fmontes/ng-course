import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUserInfoComponent } from './nav-user-info.component';

describe('NavUserInfoComponent', () => {
  let component: NavUserInfoComponent;
  let fixture: ComponentFixture<NavUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavUserInfoComponent]
    });
    fixture = TestBed.createComponent(NavUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
