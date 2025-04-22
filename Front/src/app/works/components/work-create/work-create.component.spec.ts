import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkCreateComponent} from './work-create.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {DebugElement} from '@angular/core';
import {getDebugElementByDataRole} from '../../core/functions';
import {workMock} from '../../core/mocks';

describe('WorkCreateComponent', () => {
  let component: WorkCreateComponent;
  let fixture: ComponentFixture<WorkCreateComponent>;
  let inputWorkContractID:DebugElement;
  let inputWorkTitle:DebugElement;
  let inputWorkType:DebugElement;
  let inputWorkManager:DebugElement;
  let inputWorkStatus:DebugElement;
  let workContractIDControl:FormControl;
  let workStatusControl:FormControl;
  let workTitleControl:FormControl;
  let workTypeControl:FormControl;
  let workManagerControl:FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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
      declarations: [WorkCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WorkCreateComponent);
    component = fixture.componentInstance;
    inputWorkContractID = getDebugElementByDataRole(fixture,'input-workContractID');
    inputWorkTitle = getDebugElementByDataRole(fixture,'input-workTitle');
    inputWorkType = getDebugElementByDataRole(fixture,'input-workType');
    inputWorkManager = getDebugElementByDataRole(fixture,'input-workManager');
    inputWorkStatus = getDebugElementByDataRole(fixture,'input-workStatus');
    workContractIDControl = component.workForm.controls['workContractID'];
    workManagerControl = component.workForm.controls['workManager'];
    workStatusControl = component.workForm.controls['workStatus'];
    workTitleControl = component.workForm.controls['workTitle'];
    workTypeControl = component.workForm.controls['workType'];
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
      expect(workTypeControl.value).toEqual('');
      expect(workTitleControl.value).toEqual('');
      expect(workManagerControl.value).toEqual('');
      expect(workStatusControl.value).toEqual('');
      expect(workContractIDControl.value).toEqual(0);
    });
    it('should initialize inputs', () => {
      expect(Number(inputWorkContractID.nativeElement.value)).toEqual(0);
      expect(inputWorkTitle.nativeElement.value).toEqual("");
      expect(inputWorkType.nativeElement.value).toEqual("");
      expect(inputWorkManager.nativeElement.value).toEqual("");
      expect(inputWorkStatus.nativeElement.value).toEqual("");
    });
    it('should initialize inputs with set values', () => {
      workContractIDControl.setValue(1234);
      workTypeControl.setValue('type');
      workManagerControl.setValue('John Doe');
      workStatusControl.setValue('En cours');
      workTitleControl.setValue('title');
      expect(Number(inputWorkContractID.nativeElement.value)).toEqual(1234);
      expect(inputWorkTitle.nativeElement.value).toEqual("title");
      expect(inputWorkType.nativeElement.value).toEqual("type");
      expect(inputWorkManager.nativeElement.value).toEqual("John Doe");
      expect(inputWorkStatus.nativeElement.value).toEqual("En cours");
    });
  })

    describe('ngOnInit', () => {
      it('should subscribe to workForm changes ', () => {
        component.workForm.statusChanges.subscribe = jest.fn();
        component.ngOnInit();
        expect(component.workForm.statusChanges.subscribe).toHaveBeenCalled();
      });
    });

  describe('createWork', () => {
    it('should NOT emit a Work', () => {
      component.addingWork.emit = jest.fn();
      component.createWork(false);
      expect(component.addingWork.emit).toHaveBeenCalledWith(undefined);
    });

    it('should emit a Work information', () => {
      component.addingWork.emit = jest.fn();
      component.workForm.controls['workContractID'].setValue(123456789);
      component.workForm.controls['workTitle'].setValue("Projet de rénovation de biens");
      component.workForm.controls['workType'].setValue("Travaux");
      component.workForm.controls['workStatus'].setValue("En cours");
      component.workForm.controls['workManager'].setValue("John ADEKAMBI");
      component.createWork(true);
      expect(component.addingWork.emit).toHaveBeenCalledWith({...workMock});
    });
  });
});
