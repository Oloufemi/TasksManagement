import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {WorksModule} from './works/works.module';
import {WorksService} from './works/works.service';
import {Work} from './works/models/work';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [WorksModule],
  providers: [WorksService],
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'front';
  workService = inject(WorksService);
  worksList:WritableSignal<Work[]> = signal<Work[]>([]);
  displayFormToModifyWork = false;
  displayFormToAddWork = false;
  workToModify: Work;

  ngOnInit() {
    this.workService.getAllWorks().subscribe((tasks:Work[]) => {
      this.worksList.set(tasks);
    });
  }

  /*
  Display a work in an update component to let the user modifies it
   */
  displayUpdateComponent(contractID: number) {
    if (contractID) {
      this.displayFormToModifyWork = true;
      this.workToModify = {...this.worksList().filter((itemWork: Work):boolean => itemWork.workContractID === contractID)[0]};
    }
  }

  /**
   * Display component to add a Work
   */
  displayCreationComponent() {
    this.displayFormToAddWork = true;
  }

  /**
   * Update information on a Work object
   * @param work
   */
  executeWorkModification(work: Work): void {
    this.displayFormToModifyWork = false;
    if (work) {
      this.workService.updateAWork(work).subscribe((result:any) => {
        if(!result.error){
          const index = this.worksList().findIndex((itemWork: Work) => itemWork.workContractID === work.workContractID);
          this.worksList()[index] = {...work};
        }
      });
    }
  }

  /**
   * Delete a specified Work object
   * @param workToDeleteContractId
   */
  deleteWork(workToDeleteContractId: number) {
    if (workToDeleteContractId) {
      this.workService.deleteWork(workToDeleteContractId).subscribe((result) => {
        if(!result.error) {
          this.worksList.set([...this.worksList().filter((itemWork: Work) => itemWork.workContractID !== workToDeleteContractId)]);
        }
      });
    }
  }

  /**
   * Retrieve a Work/task object and add it to the list
   * @param workValue
   */
  addingWorkToList(workValue:Work) {
    this.displayFormToAddWork = false;
    if(workValue){
      this.workService.addWork(workValue).subscribe((result) => {
        if(!result.error){
          this.worksList().push({...workValue});
        }
      });
    }
  }
}
