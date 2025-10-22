import { IsString, IsInt, Min, IsDateString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  @Min(1)
  volunteersNeeded: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsInt()
  orgId: number;
}
