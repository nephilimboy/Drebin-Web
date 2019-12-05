import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        // {
        //     path: 'dashboard',
        //     component: DashboardComponent,
        // },
        // {
        //     path: 'networkGrapher',
        //     loadChildren: './networkGrapher/networkGrapher.module#NetworkGrapherModule',
        // },
        {
            path: 'Drebin',
            loadChildren: './Drebin/drebin.module#DrebinModule',
        },
        {
            path: 'grapherEntities',
            loadChildren: './grapherEntities/grapherEntities.module#GrapherEntitiesModule',
        },
        {
            path: 'logParser',
            loadChildren: './logParser/logParser.module#LogParserModule',
        },
        // {
        //     path: '',
        //     redirectTo: 'dashboard',
        //     pathMatch: 'full',
        // },
        {
            path: '',
            redirectTo: 'Drebin',
            pathMatch: 'full',
        },
        {
            path: '**',
            redirectTo: 'Drebin',
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
