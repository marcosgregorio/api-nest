import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDTO {
    @IsString({ message: 'Tem que ser um texto' })
    @IsNotEmpty({ message: 'nome Não pode ser um campo vazio!' })
    @IsOptional()
    nome: string;
    
    @IsEmail(undefined, { message: 'Não é um email' })
    @IsNotEmpty({ message: 'email - Não pode ser um campo vazio!' })
    @EmailEhUnico({ message: 'Já existe um usuário com esse email' })
    @IsOptional()
    email: string;

    @MinLength(6)
    @IsOptional()
    senha: string;
}