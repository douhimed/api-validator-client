import {Operation} from "./Operation";

export interface Project {
  id: number;
  name : string;
  operationDtos: Operation[];
}
