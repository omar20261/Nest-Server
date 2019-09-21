import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customers)
        private readonly customerRepository: Repository<Customers>,
    ) {}
    
    async getCustomers(): Promise<Customers[]> {
        return await this.customerRepository.find();
    }

    async getCustomer(id): Promise<Customers> {
        const customer = await this.customerRepository.findOne({ id: id });
        return customer;
    }
    
    async AddCustomer(item: CreateCustomerDTO): Promise<Customers> {
        const addedCustomer = await this.customerRepository.create(item);
        return this.customerRepository.save(addedCustomer);
    }
    
    async UpdateCustomer(item): Promise<Customers> {
        if (!item.id) { throw new BadRequestException('Invalid ID!');}
        await this.customerRepository.update(item.id,item);
        return this.customerRepository.findOne(item.id);
    }
    
    async RemoveCustomer(id): Promise<Customers> {
        let RemovedCustomer = await this.customerRepository.findOne(id);
        return await this.customerRepository.remove(RemovedCustomer);
    }


   }
