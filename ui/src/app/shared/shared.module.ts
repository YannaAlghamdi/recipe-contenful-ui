import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LinkifyPipe } from '../pipes/linkify.pipe';



@NgModule({
  declarations: [HeaderComponent, LinkifyPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, LinkifyPipe]
})
export class SharedModule { }
