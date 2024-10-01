import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { IEmployee } from './interface/employee.interface';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { IResponse } from 'src/utils/global.interfaces';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getEmployees(): Promise<IEmployee[]> {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  getEmployee(@Param('id') id: string): Promise<IResponse | IEmployee> {
    return this.employeeService.getEmployee(id);
  }

  @Post()
  createEmployee(
    @Body(new ValidationPipe()) data: CreateEmployeeDto,
  ): Promise<IEmployee> | IResponse {
    data.start_date = new Date(data.start_date);
    return this.employeeService.createEmployee(data);
  }

  @Put(':id')
  updateEmployee(
    @Body() data: CreateEmployeeDto,
    @Param('id') id: string,
  ): Promise<IEmployee | IResponse> {
    return this.employeeService.updateEmployee(data, id);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string): Promise<IResponse | IEmployee> {
    return this.employeeService.deleteEmployee(id);
  }
}
