import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SpatialTreeComponent } from './spatial-tree/spatial-tree.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { PropertyMenuComponent } from './property-menu/property-menu.component';
import { IfcService } from './services/ifc.service';
import { SummaryPipe } from './pipes/summary';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ContextMenuComponent,
    SpatialTreeComponent,
    ClickStopPropagationDirective,
    PropertyMenuComponent,
    SummaryPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTreeModule,
    MatCheckboxModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [IfcService],
  bootstrap: [AppComponent]
})
export class AppModule {}
