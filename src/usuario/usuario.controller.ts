import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}
    
    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity)
        return { id: usuarioEntity.id, message: "Usuario criado!" }
    }

    @Get()
    async listUsuarios(): Promise<ListaUsuarioDTO[]> {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista: ListaUsuarioDTO[] =
            usuariosSalvos.map(usuario => {
                return new ListaUsuarioDTO(
                    usuario.id,
                    usuario.nome
                );
        })
        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

        this.usuarioRepository.salvar(usuarioAtualizado)
        return {
            usuario: usuarioAtualizado.nome,
            message: 'Usuario atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async deletaUsuario(@Param('id') id: string) {
        const usuarioDeletado = await this.usuarioRepository.deleta(id)

        return {
            usuario: usuarioDeletado.nome,
            message: 'Usuario deletado com sucesso!'
        }
    }
}