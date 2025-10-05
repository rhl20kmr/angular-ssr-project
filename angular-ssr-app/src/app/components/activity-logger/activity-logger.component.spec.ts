import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLoggerComponent } from './activity-logger.component';

describe('ActivityLoggerComponent', () => {
  let component: ActivityLoggerComponent;
  let fixture: ComponentFixture<ActivityLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityLoggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
