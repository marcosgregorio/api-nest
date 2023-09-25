import { Module } from "@nestjs/common"
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidor } from "./validacao/email-eh-unico.validator";

@Module({
    imports: [UsuarioModule],
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailEhUnicoValidor]
})

export class UsuarioModule {}