import { FormControl } from '@angular/forms';

export interface Project {
  id: number;
  name: string;
  withAuth: FormControl;
  operationDtos: any[];
}
