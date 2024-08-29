import { prisma } from '@/prisma';

import { ICreateCustomer, ICustomerRepository, IFindByCodeCustomer, IFindByCodeCustomerResponse } from '@/repositories/CustomerRepository';

export class PrismaCustomerRepository implements ICustomerRepository {

  async findByCode(data: IFindByCodeCustomer): Promise<IFindByCodeCustomerResponse> {

    const customer = await prisma.customer.findFirst({
      where: {
        customer_code: data.customer_code
      }
    });

    return customer;

  }
  
  async create(data: ICreateCustomer) {

    await prisma.customer.create({
      data: data.customer
    });

  }

}