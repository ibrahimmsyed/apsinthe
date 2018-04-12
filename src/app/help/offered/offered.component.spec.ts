import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedComponent } from './offered.component';

describe('OfferedComponent', () => {
  let component: OfferedComponent;
  let fixture: ComponentFixture<OfferedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
