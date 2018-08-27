import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixTargetComponent } from './fix-target.component';

describe('FixTargetComponent', () => {
  let component: FixTargetComponent;
  let fixture: ComponentFixture<FixTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
