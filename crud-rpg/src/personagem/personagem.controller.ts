import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdateNomeAventureiroDto } from './dto/update-personagem.dto';

@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

  @Post('create')
  async create(@Body() createPersonagemDto: CreatePersonagemDto) {
    try {
      return await this.personagemService.create(createPersonagemDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao criar personagem: " + error.message, 500);
    }
  }

  @Post('addItemMagico/:idPersonagem/:idItemMagico')
  async addItemMagico(@Param('idPersonagem') idPersonagem: number, @Param('idItemMagico') idItemMagico: number) {
    try {
      return await this.personagemService.addItemMagico(idPersonagem, idItemMagico);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao adicionar item mágico ao personagem: " + error.message, 500);
    }
  }

  @Get('listAll')
  async findAll() {
    try {
      return await this.personagemService.findAll();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao buscar personagens: " + error.message, 500);
    }
  }

  @Get('list/:id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.personagemService.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Erro ao buscar personagem com id [${id}]: ${error.message}`, 500);
    }
  }
  
  @Get('listItensMagicosByPersonagem/:id')
  async listItensMagicosByPersonagem(@Param('id') id: number) {
    try {
      return await this.personagemService.listItensMagicosByPersonagem(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao buscar itens mágicos do personagem: " + error.message, 500);
    }
  }

  @Get('buscarAmuleto/:id')
  async buscarAmuleto(@Param('id') id: number) {
    try {
      return await this.personagemService.buscarAmuletosByPersonagem(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao buscar amuleto do personagem: " + error.message, 500);
    }
  }

  @Patch('updateNomeAventureiro/:id')
  async updateNomeAventureiro(
    @Param('id') id: number,
    @Body() updateNomeAventureiroDto: UpdateNomeAventureiroDto,
  ) {
    try {
      return await this.personagemService.updateNomeAventureiro(id, updateNomeAventureiroDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao atualizar o nome do aventureiro: " + error.message, 500);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    try {
      return await this.personagemService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao remover personagem: " + error.message, 500);
    }
  }

  @Delete('removeItemMagico/:idPersonagem/:idItemMagico')
  async removeItemMagico(@Param('idPersonagem') idPersonagem: number, @Param('idItemMagico') idItemMagico: number) {
    try {
      return await this.personagemService.removeItemMagico(idPersonagem, idItemMagico);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException("Erro ao remover item mágico do personagem: " + error.message, 500);
    }
  }
}