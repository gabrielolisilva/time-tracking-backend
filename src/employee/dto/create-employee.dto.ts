import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'CPF is required' })
  @IsString({ message: 'CPF must be a string' })
  cpf: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsNotEmpty({ message: 'Position is required' })
  @IsString({ message: 'Position must be a string' })
  position: string;

  @IsNotEmpty({ message: 'Department is required' })
  @IsString({ message: 'Department must be a string' })
  department: string;

  @IsNotEmpty({ message: 'Start date is required' })
  @IsString({ message: 'Start date must be a date' })
  start_date: Date;

  @IsNotEmpty({ message: 'Active is required' })
  @IsBoolean({ message: 'Active must be a boolean' })
  active: boolean;
}
