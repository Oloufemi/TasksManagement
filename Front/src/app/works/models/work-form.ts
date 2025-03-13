import {FormControl} from '@angular/forms';
export interface WorkForm {
  workTitle: FormControl<string>;
  workType: FormControl<string>;
  workManager: FormControl<string>;
  workStatus: FormControl<string>;
  workContractID: FormControl<number>;
}
