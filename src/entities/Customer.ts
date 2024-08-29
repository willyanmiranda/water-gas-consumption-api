import { randomUUID } from 'node:crypto';

export class Customer {

  public customer_code: string;

  constructor(id?: string) {
    this.customer_code = id ?? randomUUID();
  }
  
}