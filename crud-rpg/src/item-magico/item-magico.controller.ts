import { Controller, Get, Post, Body, Param, Delete, HttpException } from '@nestjs/common';
import { ItemMagicoService } from './item-magico.service';
import { CreateItemMagicoDto } from './dto/create-item-magico.dto';

@Controller('item-magico')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @Post('create')
  async create(@Body() createItemMagicoDto: CreateItemMagicoDto) {
    try {
      return await this.itemMagicoService.create(createItemMagicoDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao criar item mágico: " + error.message, 500);
    }
  }

  @Get('listAll')
  async findAll() {
    try {
      return await this.itemMagicoService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao buscar itens mágicos: " + error.message, 500);
    }
  }

  @Get('list/:id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.itemMagicoService.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Erro ao buscar item mágico com id [${id}]: ${error.message}`, 500);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    try {
      return await this.itemMagicoService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao remover item mágico: " + error.message, 500);
    }
  }
}