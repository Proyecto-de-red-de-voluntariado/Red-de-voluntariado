import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class RegisterVolunteerDto {
    @IsEmail({}, {message: 'Deebe ser un email válido'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    password: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    skills?: string;

    @IsOptional()
    @IsString()
    availability?: string;
}
