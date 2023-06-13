import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUsernameComponent } from './set-username.component';

describe('SetUsernameComponent', () => {
  let component: SetUsernameComponent;
  let fixture: ComponentFixture<SetUsernameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SetUsernameComponent]
    });
    fixture = TestBed.createComponent(SetUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
