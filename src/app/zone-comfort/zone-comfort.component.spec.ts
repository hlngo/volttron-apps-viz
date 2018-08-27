import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneComfortComponent } from './zone-comfort.component';

describe('ZoneComfortComponent', () => {
  let component: ZoneComfortComponent;
  let fixture: ComponentFixture<ZoneComfortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneComfortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneComfortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
