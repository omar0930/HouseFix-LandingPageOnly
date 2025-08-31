import { Routes } from '@angular/router';
import { Home as HomeV1 } from './pages/home/home';
import { HomeV2 } from './pages/home-v2/home-v2';

export const routes: Routes = [
  { path: '', redirectTo: 'home/v1', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/v1', pathMatch: 'full' }, // اختياري
  { path: 'home/v1', component: HomeV1 },
  { path: 'home/v2', component: HomeV2 },
];
