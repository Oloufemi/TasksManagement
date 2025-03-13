import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Work } from '../../models/work';

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.scss',
  standalone:false
})
export class WorkCardComponent implements OnInit{
  @Input() work: Work | null = null;
  @Output() workToUpdateContractID:EventEmitter<number> = new EventEmitter<number>();
  @Output() workToDeleteContractID:EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  updateWork() {
    this.workToUpdateContractID.emit(this.work?.workContractID);
  }

  deleteItem(){
    this.workToDeleteContractID.emit(this.work?.workContractID);
  }
}
