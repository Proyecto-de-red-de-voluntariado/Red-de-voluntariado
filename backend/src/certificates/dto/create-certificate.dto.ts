import { IsString, IsInt, Min, IsOptional } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  volunteerId: number;

  @IsInt()
  projectId: number;

  @IsInt()
  orgId: number;

  @IsOptional()
  @IsString()
  template?: string;

  @IsOptional()
  @IsString()
  customFields?: string;
}
