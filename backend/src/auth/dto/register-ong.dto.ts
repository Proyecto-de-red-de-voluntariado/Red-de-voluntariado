import { IsEmail, IsOptional, IsString, MinLength, IsInt, Min, Max } from "class-validator";


export class RegisterOngDto {
    @IsOptional()
    @IsInt({ message: 'El RUC debe ser un número' })
    ruc?: number;

    @IsEmail({}, { message: 'Debe ser un email válido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

     @IsString()
     name: string;

     @IsOptional()
     @IsString()
     description?: string;

     @IsOptional()
     @IsString()
     phone?: string;

     @IsOptional()
     @IsString()
     website: string;

     @IsOptional()
     @IsString()
     city?: string;

     @IsOptional()
     @IsString()
     country?: string;


}