import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetailMotelComponent } from './info-detail-motel.component';

describe('InfoDetailMotelComponent', () => {
  let component: InfoDetailMotelComponent;
  let fixture: ComponentFixture<InfoDetailMotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDetailMotelComponent]
    });
    fixture = TestBed.createComponent(InfoDetailMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
