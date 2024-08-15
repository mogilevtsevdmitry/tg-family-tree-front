import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyTreeComponent } from './genealogy-tree.component';

describe('GenealogyTreeComponent', () => {
  let component: GenealogyTreeComponent;
  let fixture: ComponentFixture<GenealogyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenealogyTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenealogyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
