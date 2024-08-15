import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyTreeItemComponent } from './genealogy-tree-item.component';

describe('GenealogyTreeItemComponent', () => {
  let component: GenealogyTreeItemComponent;
  let fixture: ComponentFixture<GenealogyTreeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenealogyTreeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenealogyTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
