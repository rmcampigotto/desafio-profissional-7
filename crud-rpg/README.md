
# RPG Manager API - NestJS

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS" />
</p>

<p align="center">Sistema de gerenciamento de Personagens e Itens Mágicos para RPG, desenvolvido com NestJS.</p>

---

## 📄 Descrição

API REST para cadastro de Personagens e Itens Mágicos. Cada personagem pode possuir vários itens, com lógica de soma de atributos (força e defesa). Desenvolvido com:

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)

---

## ⚖️ Regras de Negócio

### Personagem
- Pode distribuir no máximo **10 pontos entre força e defesa**.
- Pode carregar **apenas 1 amuleto**.
- A força e defesa finais do personagem são calculadas somando os valores dos itens mágicos.

### Item Mágico
- Deve possuir pelo menos 1 ponto entre força e defesa.
- Se tipo `ARMA`, a defesa deve ser `0`.
- Se tipo `ARMADURA`, a força deve ser `0`.

---

## 🚀 Como rodar o projeto localmente

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run start:dev

# Rodar em produção
npm run start:prod
```

⚠️ **É necessário ter o Docker instalado para rodar o MongoDB.**  
Suba o container com o seguinte comando:

```bash
docker run --name mongodb-rpg -p 27017:27017 -d mongo
```

O projeto se conecta por padrão em:  
`mongodb://localhost:27017/rpg`

---

## ✍️ Exemplos de uso da API

### POST `/personagem/create`

Cria um personagem

```json
{
  "identificador": 1,
  "nome": "Aragorn",
  "nome_aventureiro": "Ranger do Norte",
  "classe": "GUERREIRO",
  "level": 10,
  "list_itens_magicos": [],
  "forca": 6,
  "defesa": 4
}
```

### GET `/personagem/listAll`
Retorna todos os personagens com atributos somados e itens populados

### GET `/personagem/list/:id`
Retorna um personagem pelo identificador com força/defesa somadas

### PATCH `/personagem/updateNomeAventureiro/:id`
Atualiza apenas o nome de aventureiro do personagem

```json
{
  "nome_aventureiro": "Lorde das Sombras"
}
```

### GET `/personagem/addItemMagico/:idPersonagem/:idItemMagico`
Adiciona um item mágico ao personagem

### DELETE `/personagem/removeItemMagico/:idPersonagem/:idItemMagico`
Remove um item mágico do personagem

### GET `/personagem/listItensMagicosByPersonagem/:id`
Retorna a lista de itens mágicos populados do personagem

### GET `/personagem/buscarAmuleto/:id`
Retorna apenas os itens do tipo `AMULETO` do personagem

### DELETE `/personagem/delete/:id`
Remove o personagem do banco

---

### POST `/item-magico/create`

Cria um item mágico

```json
{
  "identificador": 101,
  "nome": "Espada Flamejante",
  "tipo_item": "ARMA",
  "forca": 3,
  "defesa": 0
}
```

### GET `/item-magico/listAll`
Lista todos os itens mágicos

### GET `/item-magico/list/:id`
Retorna um item mágico pelo identificador

### DELETE `/item-magico/delete/:id`
Remove um item mágico do banco

---

### ✨ Autor

Rafael Manso Campigotto  
RA: 22014205-2