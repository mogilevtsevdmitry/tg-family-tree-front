import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeItemsComponent } from './tree-items.component';

describe('TreeItemsComponent', () => {
  let component: TreeItemsComponent;
  let fixture: ComponentFixture<TreeItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
