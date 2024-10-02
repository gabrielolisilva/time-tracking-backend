import { Injectable } from '@nestjs/common';
import { IEmployee } from './interface/employee.interface';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { IResponse } from 'src/utils/global.interfaces';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getEmployees(): Promise<IEmployee[]> {
    return await this.prismaService.employee.findMany();
  }

  async getEmployee(id: string): Promise<IResponse | IEmployee> {
    const userDB = await this.prismaService.employee.findUnique({
      where: { id },
    });

    if (!userDB) {
      const response: IResponse = {
        msg: 'Employee not found',
        code: 'ES20',
      };

      return response;
    }

    return userDB;
  }

  async createEmployee(
    data: CreateEmployeeDto,
  ): Promise<IEmployee | IResponse> {
    const isEmailUnique = await this.isEmailUnique(data.email);
    if (!isEmailUnique) {
      const response: IResponse = {
        msg: 'Email already exists',
        code: 'ES34',
      };

      return response;
    }

    const createdEmployee = await this.prismaService.employee.create({ data });
    return createdEmployee;
  }

  async updateEmployee(
    data: CreateEmployeeDto,
    id: string,
  ): Promise<IEmployee | IResponse> {
    const userDB = await this.prismaService.employee.findUnique({
      where: { id },
    });

    if (!userDB) {
      const response: IResponse = {
        msg: 'Employee not found',
        code: 'ES54',
      };

      return response;
    }

    const updatedEmployee = await this.prismaService.employee.update({
      where: { id },
      data,
    });

    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<IEmployee | IResponse> {
    const userDB = await this.prismaService.employee.findUnique({
      where: { id },
    });

    if (!userDB) {
      const response: IResponse = {
        msg: 'Employee not found',
        code: 'ES77',
      };

      return response;
    }

    const deletedEmployee = await this.prismaService.employee.delete({
      where: { id },
    });

    return deletedEmployee;
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const employee = await this.prismaService.employee.findUnique({
      where: { email },
    });

    return employee ? false : true;
  }
}
