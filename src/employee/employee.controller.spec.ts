import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Response } from 'express';
import * as httpMocks from 'node-mocks-http';
import { IEmployee } from './interface/employee.interface';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            getEmployees: jest.fn().mockResolvedValue([
              {
                id: '1',
                name: 'John Doe',
                cpf: '12345678901',
                email: 'john.doe@example.com',
                position: 'Developer',
                department: 'IT',
                start_date: new Date(),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEmployees', () => {
    it('should return an array of employees', async () => {
      const mockResponse = httpMocks.createResponse();
      await controller.getEmployees(mockResponse as Response);

      const expectedData: IEmployee[] = [
        {
          id: '1',
          name: 'John Doe',
          cpf: '12345678901',
          email: 'john.doe@example.com',
          position: 'Developer',
          department: 'IT',
          start_date: expect.any(String),
          active: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ];

      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getJSONData()).toEqual(expectedData);
    });

    /* it('should return 500 if there is an error', async () => {
      jest.spyOn(service, 'getEmployees').mockRejectedValueOnce(new Error('Internal server error'));
      const mockResponse = httpMocks.createResponse();
      const result = await controller.getEmployees(mockResponse as Response);

      expect(result.statusCode).toBe(500);
      expect(result._getJSONData()).toEqual({ msg: 'Internal server error' });
    }); */
  });
});
