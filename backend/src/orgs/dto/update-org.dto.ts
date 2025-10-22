import { IsOptional, IsString } from 'class-validator';

export class UpdateOrgDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() website?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() country?: string;
}