import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUpdateComponent } from './work-update.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {workMock} from '../../core/mocks';

describe('WorkUpdateComponent', () => {
  let component: WorkUpdateComponent;
  let fixture: ComponentFixture<WorkUpdateComponent>;
  let workContractIDControl:FormControl;
  let workStatusControl:FormControl;
  let workTitleControl:FormControl;
  let workTypeControl:FormControl;
  let workManagerControl:FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkUpdateComponent],
      imports:[ReactiveFormsModule,
        MatFormFieldModule,MatInputModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkUpdateComponent);
    component = fixture.componentInstance;
    workManagerControl = component.workForm.controls['workManager'];
    workContractIDControl = component.workForm.controls['workContractID'];
    workStatusControl = component.workForm.controls['workStatus'];
    workTitleControl = component.workForm.controls['workTitle'];
    workTypeControl = component.workForm.controls['workType'];
    fixture.detectChanges();
  });

  it('should create and initialize form group controls values ', () => {
    expect(component).toBeTruthy();
    expect(workTypeControl.value).toEqual('');
    expect(workTitleControl.value).toEqual('');
    expect(workManagerControl.value).toEqual('');
    expect(workStatusControl.value).toEqual('');
    expect(workContractIDControl.value).toEqual(0);
  });

  describe('ngOnInit', () => {
    it('should not update form group controls values', () => {
      expect(workContractIDControl.value).toEqual(0);
      expect(workTypeControl.value).toEqual('');
      expect(workTitleControl.value).toEqual('');
      expect(workManagerControl.value).toEqual('');
      expect(workStatusControl.value).toEqual('');
    });

    it('should update form group controls values', () => {
      component.work = {...workMock};
      component.ngOnInit();
      expect(workContractIDControl.value).toBe(123456789);
      expect(workTypeControl.value).toEqual('Travaux');
      expect(workTitleControl.value).toEqual('Projet de rénovation de biens');
      expect(workManagerControl.value).toEqual('John ADEKAMBI');
      expect(workStatusControl.value).toEqual('En cours');
    });
  });
  describe('updateWork', () => {
    it('should emit undefined value', () => {
      component.updatedWork.emit = jest.fn();
      component.updateWork(false);
      expect(component.updatedWork.emit).toHaveBeenCalledWith(undefined);
    });
    it('should emit a value', () => {
      component.updatedWork.emit = jest.fn();
      component.workForm.controls['workTitle'].setValue("Projet de rénovation de biens");
      component.workForm.controls['workType'].setValue("Travaux");
      component.workForm.controls['workContractID'].setValue(123456789);
      component.workForm.controls['workStatus'].setValue("En cours");
      component.workForm.controls['workManager'].setValue("John ADEKAMBI");
      component.updateWork(true);
      expect(component.updatedWork.emit).toHaveBeenCalledWith({...workMock});
    });
  })
});
