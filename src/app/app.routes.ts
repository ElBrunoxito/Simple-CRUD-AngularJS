import { Routes } from '@angular/router';
import { NavTopComponent } from './components/file/nav-top/nav-top.component';
import { AddComponent } from './components/file/add/add.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'auth',pathMatch:'full'
    },
    {
        path:'auth', 
        loadChildren:()=>import('./components/auth/auth.routes').then(a=>a.AUTH_ROUTES)
    },
    {
        path:'autha', 
        component: AddComponent
    },
    {
        path:'main',
        component:NavTopComponent,
        loadChildren:()=>import('./components/file/file.routes').then(a=>a.FILE_ROUTES)
    }
];
