import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class CriaUsuarioDTO {
    @IsString({ message: 'Tem que ser um texto' })
    @IsNotEmpty({ message: 'nome Não pode ser um campo vazio!' })
    nome: string;
    
    @IsEmail(undefined, { message: 'Não é um email' })
    @IsNotEmpty({ message: 'email - Não pode ser um campo vazio!' })
    @EmailEhUnico({ message: 'Já existe um usuário com esse email' })
    email: string;

    @MinLength(6)
    senha: string;
}