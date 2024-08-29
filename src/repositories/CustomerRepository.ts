import { Customer } from '@/entities/Customer';

export interface IFindByCodeCustomer {
  customer_code: string;
}
export type IFindByCodeCustomerResponse = Customer | null;

export interface ICreateCustomer {
  customer: Customer;
}

export interface ICustomerRepository {
  findByCode: (data: IFindByCodeCustomer) => Promise<IFindByCodeCustomerResponse>;
  create: (data: ICreateCustomer) => Promise<void>;
}