import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkCardComponent} from './components/work-card/work-card.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {WorkUpdateComponent} from './components/work-update/work-update.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {WorkCreateComponent} from './components/work-create/work-create.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatButton
  ],
  declarations: [WorkCardComponent, WorkUpdateComponent, WorkCreateComponent],
  exports: [WorkCardComponent, WorkUpdateComponent, WorkCreateComponent]
})
export class WorksModule { }
