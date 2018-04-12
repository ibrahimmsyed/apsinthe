import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekdetailComponent } from './seekdetail.component';

describe('SeekdetailComponent', () => {
  let component: SeekdetailComponent;
  let fixture: ComponentFixture<SeekdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
