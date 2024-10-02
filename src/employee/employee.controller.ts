import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { IEmployee } from './interface/employee.interface';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { IResponse } from '../utils/global.interfaces';
import { Response } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getEmployees(
    @Res() res: Response,
  ): Promise<Response<IEmployee[], Record<string, any>>> {
    try {
      const employees = await this.employeeService.getEmployees();
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  @Get(':id')
  async getEmployee(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<IResponse | IEmployee, Record<string, any>>> {
    try {
      const employee = await this.employeeService.getEmployee(id);
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  @Post()
  async createEmployee(
    @Body(new ValidationPipe()) data: CreateEmployeeDto,
    @Res() res: Response,
  ): Promise<Response<IEmployee | IResponse, Record<string, any>>> {
    try {
      data.start_date = new Date(data.start_date);
      const result = await this.employeeService.createEmployee(data);
      if ('code' in result) {
        return res.status(400).json(result);
      } else {
        return res.status(201).json(result);
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  @Put(':id')
  async updateEmployee(
    @Body() data: CreateEmployeeDto,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<IEmployee | IResponse, Record<string, any>>> {
    try {
      const result = await this.employeeService.updateEmployee(data, id);
      if ('code' in result) {
        return res.status(400).json(result);
      } else {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  @Delete(':id')
  async deleteEmployee(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<IEmployee | IResponse, Record<string, any>>> {
    try {
      const result = await this.employeeService.deleteEmployee(id);
      if ('code' in result) {
        return res.status(404).json(result);
      } else {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
}
