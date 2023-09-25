import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidor implements ValidatorConstraintInterface {

    constructor(private usuarioRepository: UsuarioRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value)

        return !usuarioComEmailExiste
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new Error("Method not implemented.");
    }

}

// decorator
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    console.log('Opcoes:  ', opcoesDeValidacao);
           // minha classe
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidor
        })
    }
}