import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Work} from '../../models/work';
import {WorkForm} from '../../models/work-form';
import {FormControl, FormControlStatus, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-work-create',
  templateUrl: './work-create.component.html',
  styleUrl: './work-create.component.scss',
  standalone: false
})
export class WorkCreateComponent implements OnInit {
  workForm: FormGroup<WorkForm>;
  @Output() addingWork: EventEmitter<Work> = new EventEmitter<Work>();
  activateCreationButton = false;

  constructor() {
    this.workForm = new FormGroup<WorkForm>({
      workContractID: new FormControl<number>(0,{nonNullable:true, validators: [Validators.required]}),
      workTitle: new FormControl<string>('',{nonNullable:true, validators: [Validators.required]}),
      workManager: new FormControl<string>('',{nonNullable:true, validators: [Validators.required]}),
      workStatus: new FormControl<string>('',{nonNullable:true, validators: [Validators.required]}),
      workType: new FormControl<string>('',{nonNullable:true, validators: [Validators.required]})
    });
  }

  ngOnInit() {
    this.workForm.statusChanges.subscribe((result:FormControlStatus) => {
      this.activateCreationButton = result === 'VALID' && !this.workForm['pristine'];
    });
  }

  createWork(create:boolean){
    if (create){
      this.addingWork.emit(
        {
          workContractID: this.workForm.controls['workContractID'].value,
          workTitle: this.workForm.controls['workTitle'].value,
          workType: this.workForm.controls['workType'].value,
          workStatus: this.workForm.controls['workStatus'].value,
          workManager: this.workForm.controls['workManager'].value,
        }
      );
    } else {
      this.addingWork.emit(undefined);
    }
  }
}
