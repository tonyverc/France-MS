import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProduitsComponent } from './card-produits.component';

describe('CardProduitsComponent', () => {
  let component: CardProduitsComponent;
  let fixture: ComponentFixture<CardProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProduitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
