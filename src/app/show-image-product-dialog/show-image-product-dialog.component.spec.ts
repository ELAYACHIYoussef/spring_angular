import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImageProductDialogComponent } from './show-image-product-dialog.component';

describe('ShowImageProductDialogComponent', () => {
  let component: ShowImageProductDialogComponent;
  let fixture: ComponentFixture<ShowImageProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowImageProductDialogComponent]
    });
    fixture = TestBed.createComponent(ShowImageProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
