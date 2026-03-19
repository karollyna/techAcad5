## O que entrega
- Backend em Node.js + Express + TypeScript + POO
- Banco SQLite com Prisma
- Login com email e senha
- JWT e senha criptografada com bcrypt
- Cadastro e edição do próprio usuário
- 3 CRUDs completos: categorias, produtos e pedidos
- Todas as rotas dos CRUDs protegidas
- Paginação nas listagens
- Relacionamento entre os recursos
- Frontend React + TypeScript + Context API
- Componentes reutilizáveis
- Telas separadas de listagem e cadastro/edição
- Testes automatizados no backend

## Estrutura
- `backend/`
- `frontend/`

## Como rodar
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

API: `http://localhost:3333`

### 2) Frontend
Em outro terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Front: `http://localhost:5173`

## Usuário pronto para teste
- Email: `aluno@techforge.com`
- Senha: `Senha123`

## Testes
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm test
```

## Observações para apresentação
- O email do usuário não pode ser alterado na edição
- As senhas precisam de letras e números com mínimo de 8 caracteres
- O CPF é validado no front e no back
- Os CRUDs possuem criação, listagem paginada, busca por id, edição e exclusão
- Pedidos dependem de produtos e produtos dependem de categorias

## Mapeamento com a rubrica
### Back-end
- Autenticação: ok
- Cadastro de usuário: ok
- Edição de usuário: ok
- 3 CRUDs autenticados com paginação e relacionamento: ok
- Código limpo: estrutura por camadas e serviços orientados a objetos
- TS e POO: sem `any` e sem `unknown`, com tipagem explícita
- Testes: arquivo `backend/tests/app.test.ts`

### Front-end
- Login: ok
- Cadastro: ok
- Edição de usuário com contexto: ok
- 3 CRUDs completos: ok
- Componentização: ok
- Visual: interface moderna, limpa e responsiva
