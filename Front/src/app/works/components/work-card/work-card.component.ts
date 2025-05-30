import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import { Work } from '../../models/work';

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.scss',
  standalone:false
})
export class WorkCardComponent {
  work:InputSignal<Work> = input.required<Work>({alias:'workInput'});
  workToUpdateContractID:OutputEmitterRef<number> = output<number>();
  workToDeleteContractID:OutputEmitterRef<number> = output<number>();

  /**
   * Emit the ID of task the user want to update
   */
  updateWork() {
    this.workToUpdateContractID.emit(this.work().workContractID);
  }

  /**
   * Emit the ID of task the user want to update
   */
  deleteItem(){
    this.workToDeleteContractID.emit(this.work().workContractID);
  }
}
