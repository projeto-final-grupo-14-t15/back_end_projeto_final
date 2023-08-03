# back_end_projeto_final Documentação inicial

## Introdução 
- O repositorio foi criado usando express.js + TypeORM assim Seguindo os padroes do M4, nenhuma rota foi criada apenas arquivos de configurações e pastas de organição.
  - Os arquivos de index foram criados apenas para subir as pastas no github
    
 ## Banco de dados 

- Por padrão, a aplicação está configurada com o banco de dados PostgreSQL.

- Agora, crie  o arquivo .env e ajuste a DATABASE_URL variável de ambiente com as imformações do seu banco de dados, segue o exemplo abaixo:
```
   DATABASE_URL="postgres://Micro:123456@localhost:5432/lista_contato" //( DATABASE_URL="postgres://<Usuario>:<Senha>@localhost:<Porta>/<Nome do db>")
```

## Inicializando a aplicação
```bash
npm run dev
```

## Dependências instaladas até o momento. 
- Node.js
- Express
- TypeORM
- reflect-metadata
- express-async-errors
- dotenv
- JavaScript
- TypeScript
- Zod
- JsonWebToken
- Bcryptjs
- Cors
- SGBD = PostgreSQL
