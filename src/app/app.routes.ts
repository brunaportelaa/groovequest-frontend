import { Routes } from '@angular/router';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { SessionsPageComponent } from './features/sessions/pages/sessions-page/sessions-page.component';
import { SkillsPageComponent } from './features/skills/pages/skills-page/skills-page.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardPageComponent
            },
            {
                path: 'sessions',
                component: SessionsPageComponent
            },
            {
                path: 'skills',
                component: SkillsPageComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
