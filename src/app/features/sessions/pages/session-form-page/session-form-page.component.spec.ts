import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFormPageComponent } from './session-form-page.component';

describe('SessionFormPageComponent', () => {
  let component: SessionFormPageComponent;
  let fixture: ComponentFixture<SessionFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
