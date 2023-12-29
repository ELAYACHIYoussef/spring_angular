import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiremAddToCartComponent } from './confirem-add-to-cart.component';

describe('ConfiremAddToCartComponent', () => {
  let component: ConfiremAddToCartComponent;
  let fixture: ComponentFixture<ConfiremAddToCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiremAddToCartComponent]
    });
    fixture = TestBed.createComponent(ConfiremAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
