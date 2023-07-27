import { Messages } from './Messages';

export interface ResponseDto {
  url: string;
  type: string;
  httpStatus: number | string;
  validationStatus: string;
  expectedResponse: string;
  actualResponse: string;
  expectedType: string;
  body: string;
  messages : Messages[];
  isCollapsed:any;
}
