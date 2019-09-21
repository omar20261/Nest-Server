import { Controller, Get, Res, Req, HttpStatus, NotFoundException, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private CustomersSrv: CustomersService) {}

  @Get('list')
  //@UseGuards(new AuthGuard())
  async getCustomers(@Res() res,@Req() req) {
    const Customers = await this.CustomersSrv.getCustomers();
    return res.status(HttpStatus.OK).json(Customers);
  }

  @Get(':id')
  async getCustomer(@Res() res, @Param('id'/*, new ValidateObjectId() */) id) {
    const Customer = await this.CustomersSrv.getCustomer(id);
    if (!Customer) {
      throw new NotFoundException('Customer does not exist');
    }
    return res.status(HttpStatus.OK).json(Customer);
  }

  @Post()
  async AddCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
    const addedCustomer = await this.CustomersSrv.AddCustomer(
      createCustomerDTO,
    );
    res.status(HttpStatus.OK).json({
      message: 'Customer added successfully',
      customer: addedCustomer,
    });
  }

  @Put()
  async UpdateCustomer( @Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
    const updatedCustomer = await this.CustomersSrv.UpdateCustomer(createCustomerDTO);
    if (!updatedCustomer) { throw new NotFoundException('Customer does not exist');}
    return res.status(HttpStatus.OK).json({
      message: 'Customer updated successfully',
      customer: updatedCustomer,
    });
  }

  @Delete(':id')
  async DeleteCustomer(@Res() res, @Param('id'/*, new ValidateObjectId()*/) id) {
    const DeletedCustomer = await this.CustomersSrv.RemoveCustomer(id);
    if (!DeletedCustomer) {
      throw new NotFoundException('Customer does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Customer Deleted successfully',
      customer: DeletedCustomer,
    });
  }
}
