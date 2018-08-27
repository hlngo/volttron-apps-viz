import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlcComponent } from './ilc.component';

describe('IlcComponent', () => {
  let component: IlcComponent;
  let fixture: ComponentFixture<IlcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
