import {NgModule} from '@angular/core';
import {DrebinComponent} from "./drebin.component";
import {ThemeModule} from "../../theme/theme.module";
import {NgxEchartsModule} from "ngx-echarts";
import {Ng2SmartTableModule} from "ng2-smart-table";
// import {NetworkGrapherService} from "./networkGrapher.service";
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {DrebinRoutingModule} from "./drebin-routing.module";
import {DrebinService} from "./drebin.service";

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    DrebinRoutingModule,
    Ng2SmartTableModule,
    CodemirrorModule
  ],
  declarations: [
    DrebinComponent,
  ],
  providers:[
    DrebinService
  ]
})
export class DrebinModule {
}
