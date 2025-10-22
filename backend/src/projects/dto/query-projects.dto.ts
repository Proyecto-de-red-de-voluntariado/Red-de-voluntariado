import { IsInt, IsOptional, IsString, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProjectsDto {
  @IsOptional() @IsString()
  q?: string;

  @IsOptional() @IsString()
  city?: string;

  @IsOptional() @IsString()
  category?: string;

  @IsOptional() @IsDateString()
  dateFrom?: string;

  @IsOptional() @IsDateString()
  dateTo?: string;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  orgId?: number;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number = 1;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  limit?: number = 10;
}