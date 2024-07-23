import { Routes } from '@angular/router';
import { FamilyComponent } from './pages/family/family.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TreeComponent } from './pages/tree/tree.component';

export const routes: Routes = [
  { path: 'tree', component: TreeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'family', component: FamilyComponent },
  { path: '', pathMatch: 'full', redirectTo: '/tree' },
];
