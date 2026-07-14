# Sophia Medication Service

## Sobre o serviço

O Sophia Medication Service é o microsserviço responsável pelo gerenciamento de medicamentos e de seus lotes dentro do ecossistema Sophia.

Suas principais responsabilidades são:

- criar, listar, atualizar e remover medicamentos;
- gerenciar lotes de medicamentos;
- validar permissões por meio do Sophia Pharmacy Service;
- publicar eventos de auditoria no RabbitMQ;
- persistir os dados no PostgreSQL com Drizzle ORM.

> Este repositório contém apenas o microsserviço de medicamentos. Para executar todas as funcionalidades, alguns componentes compartilhados do ecossistema Sophia também devem estar disponíveis.

## Tecnologias

- Node.js e TypeScript
- NestJS
- PostgreSQL
- Drizzle ORM
- RabbitMQ
- Docker e Docker Compose
- Jest

## Dependências do ecossistema

Para executar o serviço integrado ao restante do sistema, é necessário ter:

- RabbitMQ disponível na rede compartilhada;
- Sophia Pharmacy Service disponível para validação de permissões;
- rede Docker externa `net1`, utilizada para comunicação entre os microsserviços.

No ambiente Docker do sistema completo, os nomes esperados são:

- RabbitMQ: `rabbitmq:5672`;
- Pharmacy Service: `sophia-pharmacy-service:8080`;
- PostgreSQL deste serviço: `medication-postgres:5432`.

## Pré-requisitos

- Git
- Node.js 20.11 ou superior (Node.js 22 LTS recomendado)
- npm
- Docker
- Docker Compose

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/ProjetoEntregador/sophia-medication-service.git
cd sophia-medication-service
```

Instale as dependências:

```bash
npm ci
```

Crie o arquivo de configuração a partir do exemplo:

```bash
cp .env.example .env
```

No PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Depois, revise as credenciais e os endereços no arquivo `.env` de acordo com o modo de execução descrito abaixo.

## Execução com Docker

Este é o modo indicado para executar o microsserviço integrado ao ecossistema Sophia.

### 1. Verifique a rede compartilhada

A rede externa `net1` normalmente é criada pela infraestrutura principal do sistema. Caso ela ainda não exista no ambiente local, crie-a uma única vez:

```bash
docker network create net1
```

### 2. Configure o ambiente do contêiner

Ao executar a aplicação pelo Docker Compose deste repositório, utilize o nome do contêiner do PostgreSQL na `MEDICATION_DATABASE_URL`:

```env
MEDICATION_DB_USER=database_user
MEDICATION_DB_PASSWORD=database_password
MEDICATION_DB_NAME=database_name
MEDICATION_DATABASE_URL=postgres://database_user:database_password@medication-postgres:5432/database_name

PHARMACY_SERVICE_URL=http://sophia-pharmacy-service:8080

MESSAGE_AUDIT_QUEUE=audit.queue
MESSAGE_EXCHANGES=pharmacy.exchange
MESSAGE_AUDIT_ROUTING_KEY=audit
MESSAGE_URL=amqp://admin:admin@rabbitmq:5672
MEDICATION_PORT=3000
```

As credenciais devem coincidir com as utilizadas pela infraestrutura do ambiente.

### 3. Inicie o microsserviço

```bash
docker compose up --build -d
```

A API ficará disponível no host pela porta `3003`.

As migrações são executadas automaticamente pelo `entrypoint` antes da inicialização da aplicação.

Para acompanhar os logs:

```bash
docker compose logs -f sophia-medication-service
```

Para encerrar os contêineres deste repositório:

```bash
docker compose down
```

## Desenvolvimento local

Neste modo, a aplicação NestJS é executada no computador e apenas o PostgreSQL pode ser iniciado pelo Docker.

### 1. Garanta que a rede exista

```bash
docker network create net1
```

Se a rede já existir, o Docker apenas informará que ela já foi criada.

### 2. Inicie o PostgreSQL

```bash
docker compose up -d medication-postgres
```

### 3. Configure os endereços locais

Como a aplicação será executada fora do Docker, o PostgreSQL deve ser acessado pela porta publicada no host:

```env
MEDICATION_DATABASE_URL=postgres://database_user:database_password@localhost:5434/database_name
MEDICATION_PORT=3000
```

Configure também `MESSAGE_URL` e `PHARMACY_SERVICE_URL` com os endereços e as portas publicados no host pelo ambiente completo. Os nomes `rabbitmq` e `sophia-pharmacy-service` são resolvidos somente entre contêineres conectados à rede Docker.

### 4. Execute as migrações

```bash
npm run db:migrate
```

### 5. Inicie a aplicação

```bash
npm run start:dev
```

A API ficará disponível na porta definida em `MEDICATION_PORT`, por padrão `3000`.

## Produção sem Docker

Com as variáveis de ambiente e as dependências externas devidamente configuradas:

```bash
npm run db:migrate
npm run build
npm run start:prod
```

## Variáveis de ambiente

| Variável                    | Descrição                                                   |
| --------------------------- | ----------------------------------------------------------- |
| `MEDICATION_DB_USER`        | Usuário do PostgreSQL criado pelo Docker Compose            |
| `MEDICATION_DB_PASSWORD`    | Senha do PostgreSQL                                         |
| `MEDICATION_DB_NAME`        | Nome do banco de dados                                      |
| `MEDICATION_DATABASE_URL`   | URL completa de conexão usada pela aplicação e pelo Drizzle |
| `PHARMACY_SERVICE_URL`      | URL do Sophia Pharmacy Service                              |
| `MESSAGE_URL`               | URL de conexão com o RabbitMQ                               |
| `MESSAGE_EXCHANGES`         | Exchange utilizado na mensageria                            |
| `MESSAGE_AUDIT_QUEUE`       | Fila de eventos de auditoria                                |
| `MESSAGE_AUDIT_ROUTING_KEY` | Chave de roteamento dos eventos de auditoria                |
| `MEDICATION_PORT`           | Porta interna da aplicação                                  |

## Migrações do banco

Para aplicar manualmente as migrações do Drizzle:

```bash
npm run db:migrate
```

No contêiner da aplicação, esse comando já é executado automaticamente durante a inicialização.

## Testes

Testes unitários:

```bash
npm test
```

Testes end-to-end:

```bash
npm run test:e2e
```

Cobertura de testes:

```bash
npm run test:cov
```

## Comandos úteis

| Comando              | Descrição                                     |
| -------------------- | --------------------------------------------- |
| `npm run start:dev`  | Inicia a aplicação em modo de desenvolvimento |
| `npm run build`      | Compila o projeto                             |
| `npm run start:prod` | Executa a versão compilada                    |
| `npm run db:migrate` | Aplica as migrações do banco                  |
| `npm test`           | Executa os testes unitários                   |
| `npm run test:e2e`   | Executa os testes end-to-end                  |
| `npm run lint`       | Executa a análise de código                   |

## Estrutura principal

- `src/medication`: gestão de medicamentos;
- `src/medication-batch`: gestão de lotes;
- `src/database`: configuração, conexão e schema do banco;
- `src/messaging`: integração com RabbitMQ e publicação de auditoria;
- `src/pharmacy`: comunicação com o Sophia Pharmacy Service;
- `drizzle`: migrações do banco de dados;
- `test`: testes end-to-end.
