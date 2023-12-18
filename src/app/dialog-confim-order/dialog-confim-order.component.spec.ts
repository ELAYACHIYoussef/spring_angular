import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfimOrderComponent } from './dialog-confim-order.component';

describe('DialogConfimOrderComponent', () => {
  let component: DialogConfimOrderComponent;
  let fixture: ComponentFixture<DialogConfimOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfimOrderComponent]
    });
    fixture = TestBed.createComponent(DialogConfimOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
