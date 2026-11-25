# Minha Lista de Tarefas

Aplicação web desenvolvida com React e Vite para organizar tarefas do dia a dia, utilizando o Back4App para armazenar os dados.

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- CSS
- Back4App
- Parse SDK
- Git e GitHub

## Funcionalidades

- Adicionar novas tarefas.
- Listar tarefas cadastradas.
- Marcar tarefas como concluídas.
- Salvar o estado das tarefas no banco de dados.
- Excluir tarefas.
- Manter os dados salvos mesmo após atualizar a página.

## Banco de dados

O projeto utiliza o Back4App, com uma classe chamada `Tarefa`.

Campos utilizados:

| Campo | Tipo |
|---|---|
| titulo | String |
| concluida | Boolean |

## Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/filipecarvalho07/projeto-minha-todo.git
```

2. Entre na pasta:

```bash
cd projeto-minha-todo
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto com as credenciais da sua aplicação Back4App:

```env
VITE_PARSE_APPLICATION_ID=seu_application_id
VITE_PARSE_JAVASCRIPT_KEY=sua_javascript_key
VITE_PARSE_SERVER_URL=https://parseapi.back4app.com/
```

5. Inicie o projeto:

```bash
npm run dev
```

## Autor

Filipe de Carvalho Laranjeira