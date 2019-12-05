import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DrebinComponent} from "./drebin.component";

const routes: Routes = [{
    path: '',
    component: DrebinComponent,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DrebinRoutingModule {
}


