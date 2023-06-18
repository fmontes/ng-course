import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePreviewComponent } from './device-preview.component';

describe('DevicePreviewComponent', () => {
  let component: DevicePreviewComponent;
  let fixture: ComponentFixture<DevicePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DevicePreviewComponent]
    });
    fixture = TestBed.createComponent(DevicePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
