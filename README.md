# DOCUMENTAÇÃO BACKEND ROADROVERS

## INTRODUÇÃO
- O projeto foi desenvolvido utilizando express.js + TypeORM.
- Principais bibliotecas utilizadas: reflect-metadata, dotenv, express-async-errors, bcryptjs, jsonwebtoken, zod,
  
## INICIANDO O PROJETO LOCALMENTE

## CRIE UM BANCO DE DADOS POSTGRE

- Se conecte ao seu user psql, e então crie um banco de dados com o comando “ CREATE DATABASE nome_do_database; ” (NÃO ESQUEÇA DO PONTO E VIRGULA), se não tiver familiaridade com Postgres aqui vai um pequeno tutorial:
- Baixe e instale o PostgresSQL;
- Após instalar abra o terminal e execute o comando ‘ psql ’, digite a senha que definiu na instalação e estará conectado;
- Digite o comando “ CREATE DATABASE nome_do_database; ” e terá criado o bando de dados;
  
## RODANDO O PROJETO LOCALMENTE

- Clone o repositório em sua máquina;
- Abra o clone e no terminal bash use o comando “ npm install ”para instalar todas as dependências necessárias;
- Crie um arquivo chamado “.env” na raiz do projeto e copie o conteúdo do .env.example de maneira a substituir as informações de exemplo por suas informações pessoais (vide exemplo abaixo);
- Agora use o comando para rodar as migrations do TypeORM e assim criar as tabelas no seu banco de dados referenciado no .env:
  
Ex:
DATABASE_URL="postgress://<<nomeuser>>:<<senhauserpsql>>@localhost:5432/<<nome_db_criada>> "
SECRET_KEY="<<chave_secreta>>" 
SMTP_USER="<<emailpararecurarsenha@gmail.com>>"
SMTP_PASS= "<<senha_do_email>>"

Após refatorado:
DATABASE_URL="postgress://pedro:1221@localhost:5432/finalproject"
SECRET_KEY="CHAVE SECRETA"
SMTP_USER="seuemail@gmail.com"
SMTP_PASS= "senhadoemail"

## INICIALIZANDO A APLICAÇÃO

Com tudo devidamente configurado abra o terminal na pasta da aplicação e rode o comando:
npm run dev

Neste momento deverá receber uma mensagem no terminal “Servidor executando!” então tudo correu bem.

Agora só acessar: -------------
Rotas da aplicação: -----------
