import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'home',
    title: 'Accueil',
		loadComponent: () =>
		import('./home/home').then((h) => h.Home)
  },
  {
    path: 'championship',
    title: 'Championnat',
		loadComponent: () =>
		import('./championship/championship').then((c) => c.Championship)
  },
  {
    path: 'team',
    title: 'Equipe',
		loadComponent: () =>
		import('./team/team').then((t) => t.Team)
  },
  {
    path: 'partner',
    title: 'Partenariat',
		loadComponent: () =>
		import('./partner/partner').then((p) => p.Partner)
  },
  {
    path: 'dashboard',
    title: 'Tableau de bord',
		loadComponent: () =>
		import('./dashboard/dashboard').then((d) => d.Dashboard)
  }
];
