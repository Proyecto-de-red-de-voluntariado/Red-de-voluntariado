import { IsOptional, IsString } from 'class-validator';

export class UpdateVolunteerDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() skills?: string;
  @IsOptional() @IsString() availability?: string;
}