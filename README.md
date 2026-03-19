# 🛒 TechForge - Sistema Web Completo

## 📌 Sobre o Projeto

O **TechForge** é uma aplicação web completa desenvolvida como trabalho acadêmico, com arquitetura separada entre **frontend** e **backend**.

O sistema permite autenticação de usuários e gerenciamento de dados, utilizando boas práticas de desenvolvimento com tecnologias modernas.

---

## 🚀 Tecnologias Utilizadas

### 🔙 Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* SQLite

### 🎨 Frontend

* React
* TypeScript
* Vite
* Axios
* React Router DOM

---

## 🌐 Acesso ao Sistema Online

👉 https://tech-acad5.vercel.app

---

## 🔐 Credenciais de Acesso

```
Email: aluno@techforge.com
Senha: Senha123
```

---

## 📂 Estrutura do Projeto

```
techAcad5/
 ├── backend/
 ├── frontend/
 ├── README.md
```

---

## ⚙️ Como Executar o Projeto Localmente

### 🔹 1. Clonar o repositório

```
git clone https://github.com/karollyna/techAcad5.git
```

---

### 🔹 2. Backend

```
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

### 🔹 3. Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🗄️ Banco de Dados

O projeto utiliza **SQLite** com Prisma.

O banco está localizado em:

```
backend/prisma/dev.db
```

Também foi disponibilizado arquivo de exportação:

```
backend/prisma/banco.sql
```

---

## 👤 Usuário Administrador

```
Email: admin@techforge.com
Senha: Admin123
```

---

## 📌 Funcionalidades

* ✔ Login com autenticação
* ✔ Cadastro de usuários
* ✔ Consumo de API com Axios
* ✔ Estrutura MVC no backend
* ✔ Banco de dados com ORM (Prisma)
* ✔ Interface responsiva

---

## 📎 Observações

* O frontend está hospedado na Vercel.
* O backend roda localmente para fins acadêmicos.
* O projeto segue boas práticas de organização e separação de responsabilidades.

---

## 👩‍💻 Autora

Desenvolvido por **Karollyna** para fins acadêmicos.
