import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario)
    }

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            user => user.email === email
        )

        return possivelUsuario !== undefined;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
        const possivelUsuario = this.procuraUsuarioPorId(id)

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave == 'id') {
                return;
            }

            possivelUsuario[chave] = valor;
        });

        return possivelUsuario
    }

    private procuraUsuarioPorId(id: string): UsuarioEntity {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id == id
        )

        if (!possivelUsuario) {
            throw new Error('Usuário não existe');
        }

        return possivelUsuario
    }

    async deleta(id: string): Promise<UsuarioEntity> {
        const possivelUsuario = this.procuraUsuarioPorId(id)
        this.usuarios = this.usuarios.filter(
            usuario => usuario.id !== id
        )

        return possivelUsuario;
    }
}