import {Component, inject, OnInit} from '@angular/core';
import {WorksModule} from './works/works.module';
import {WorksService} from './works/works.service';
import {NgForOf, NgIf} from '@angular/common';
import {Work} from './works/models/work';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [WorksModule, NgForOf, NgIf],
  providers: [WorksService],
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'front';
  workService = inject(WorksService);
  worksList: Work[] = [];
  displayFormToModifyWork = false;
  displayFormToAddWork = false;
  workToModify: Work;

  ngOnInit() {
    this.workService.getAllWorks().subscribe((result: Work[]) => {
      this.worksList = [...result];
    });
  }

  displayUpdateComponent(contractID: number) {
    if (contractID) {
      this.displayFormToModifyWork = true;
      this.workToModify = {...this.worksList.filter((itemWork: Work):boolean => itemWork.workContractID === contractID)[0]};
    }
  }

  displayCreationComponent() {
    this.displayFormToAddWork = true;
  }

  executeWorkModification(work: Work): void {
    this.displayFormToModifyWork = false;
    if (work) {
      this.workService.updateAWork(work).subscribe((result:any) => {
        if(!result.error){
          const index = this.worksList.findIndex((itemWork: Work) => itemWork.workContractID === work.workContractID);
          this.worksList[index] = {...work};
        }
      });
    }
  }

  deleteWork(workToDeleteContractId: number) {
    if (workToDeleteContractId) {
      this.workService.deleteWork(workToDeleteContractId).subscribe((result) => {
        if(!result.error) {
          this.worksList = [...this.worksList.filter((itemWork: Work) => itemWork.workContractID !== workToDeleteContractId)];
        }
      });
    }
  }

  addingWorkToList(workValue:Work) {
    this.displayFormToAddWork = false;
    if(workValue){
      this.workService.addWork(workValue).subscribe((result) => {
        if(!result.error){
          this.worksList.push({...workValue});
        }
      });
    }
  }
}
