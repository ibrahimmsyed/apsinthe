import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekedComponent } from './seeked.component';

describe('SeekedComponent', () => {
  let component: SeekedComponent;
  let fixture: ComponentFixture<SeekedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
