import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";

@Controller('/produtos')
export class ProdutoController {

    constructor(private produtosRepository: ProdutoRepository) {}

    @Post()
    async setProduto(@Body() produto) {
        this.produtosRepository.salvar(produto)
    }

    @Get()
    async getProduto() {
        return this.produtosRepository.listar()
    }
}