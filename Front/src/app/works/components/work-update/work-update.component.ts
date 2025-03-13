import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Work} from '../../models/work';
import {WorkForm} from '../../models/work-form';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-work-update',
  templateUrl: './work-update.component.html',
  styleUrl: './work-update.component.scss',
  standalone: false
})
export class WorkUpdateComponent implements OnInit {
  @Input() work: Work;
  workForm: FormGroup<WorkForm>;
  @Output() updatedWork: EventEmitter<Work> = new EventEmitter<Work>();

  constructor() {
    this.workForm = new FormGroup<WorkForm>({
      workContractID: new FormControl<number>(0,{nonNullable:true}),
      workTitle: new FormControl<string>('',{nonNullable:true}),
      workManager: new FormControl<string>('',{nonNullable:true}),
      workStatus: new FormControl<string>('',{nonNullable:true}),
      workType: new FormControl<string>('',{nonNullable:true})
    });
  }

  ngOnInit() {
    console.log(this.work);
    if (this.work) {
      this.workForm.controls['workContractID'].setValue(this.work.workContractID);
      this.workForm.controls['workStatus'].setValue(this.work.workStatus);
      this.workForm.controls['workManager'].setValue(this.work.workManager);
      this.workForm.controls['workType'].setValue(this.work.workType);
      this.workForm.controls['workTitle'].setValue(this.work.workTitle);
    }
  }

  updateWork(update:boolean){
    if (update){
      let modifiedWork:Work = {
        workContractID: this.workForm.controls['workContractID'].value,
        workTitle: this.workForm.controls['workTitle'].value,
        workType: this.workForm.controls['workType'].value,
        workStatus: this.workForm.controls['workStatus'].value,
        workManager: this.workForm.controls['workManager'].value,
      }
      this.updatedWork.emit({...modifiedWork});
    } else {
      this.updatedWork.emit(undefined);
    }
  }
}
