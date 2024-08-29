import Measure from '@/entities/Measure';

export interface IFindByMonthAndTypeMeasure {
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
}
export type IFindByMonthAndTypeMeasureResponse = Measure | null;

export interface IFindByIdMeasure {
  measure_uuid: string;
}
export type IFindByIdMeasureResponse = Measure | null;

export interface IListByCustomerCodeMeasure {
  customer_code: string;
  measure_type?: string;
}
export type IListByCustomerCodeMeasureResponse = Omit<Measure, 'customer_code' | 'value'>[];

export interface ICreateMeasure {
  measure: Measure;
}

export interface IConfirmMeasure {
  measure_uuid: string;
  value: number;
}

export interface IMeasureRepository {
  findByMonthAndType: (data: IFindByMonthAndTypeMeasure) => Promise<IFindByMonthAndTypeMeasureResponse>;
  findById: (data: IFindByIdMeasure) => Promise<IFindByIdMeasureResponse>;
  listByCustomerCode: (data: IListByCustomerCodeMeasure) => Promise<IListByCustomerCodeMeasureResponse>;
  create: (data: ICreateMeasure) => Promise<void>;
  confirm: (data: IConfirmMeasure) => Promise<void>;
}