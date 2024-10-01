import { Injectable } from '@nestjs/common';
import { IEmployee } from './interface/employee.interface';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { IResponse } from 'src/utils/global.interfaces';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) {}

  getEmployees(): Promise<IEmployee[]> {
    return this.prismaService.employee.findMany();
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

  createEmployee(data: CreateEmployeeDto): Promise<IEmployee> | IResponse {
    const isEmailUnique = this.isEmailUnique(data.email);
    if (!isEmailUnique) {
      const response: IResponse = {
        msg: 'Email already exists',
        code: 'ES34',
      };

      return response;
    }

    return this.prismaService.employee.create({ data });
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

    return this.prismaService.employee.update({
      where: { id },
      data,
    });
  }

  async deleteEmployee(id: string): Promise<IResponse | IEmployee> {
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

    return this.prismaService.employee.delete({
      where: { id },
    });
  }

  isEmailUnique(email: string): boolean {
    const employee = this.prismaService.employee.findUnique({
      where: { email },
    });

    return employee ? false : true;
  }
}
