# ForgeFlux Backend 🚀

Backend da plataforma ForgeFlux - Gerador de conteúdo com IA para lojas de soldagem.

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Conta Supabase
- API Key Anthropic (Claude)
- API Key Stripe

## 🔧 Instalação

### 1. Clone e instale dependências

```bash
cd backend
npm install
```

### 2. Configure variáveis de ambiente

```bash
cp .env.example .env
```

Preencha o arquivo `.env` com suas credenciais:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=seu-anon-key
SUPABASE_SERVICE_KEY=seu-service-key

ANTHROPIC_API_KEY=sk-ant-...

STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...

JWT_SECRET=sua-chave-secreta-super-segura

NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Configure Supabase

1. Vá para [Supabase Dashboard](https://supabase.com/dashboard)
2. Acesse SQL Editor
3. Cole o conteúdo de `database/migrations.sql`
4. Execute para criar as tabelas

## 🚀 Rodando o Backend

### Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Produção

```bash
npm start
```

## 📚 API Endpoints

### Autenticação (Público)

```bash
# Signup
POST /api/auth/signup
Body: { email, password, full_name }

# Login
POST /api/auth/login
Body: { email, password }

# Forgot Password
POST /api/auth/forgot-password
Body: { email }
```

### Configuração (Público)

```bash
# Obter configuração para frontend
GET /api/config
```

### Geração (Protegido)

```bash
# Gerar post com IA
POST /api/generate
Headers: Authorization: Bearer <token>
Body: { produto, promo, objetivo, publico, obs }
```

### Uso (Protegido)

```bash
# Obter status de uso
GET /api/usage
Headers: Authorization: Bearer <token>
```

### Posts Salvos (Protegido)

```bash
# Listar posts salvos
GET /api/saved-posts
Headers: Authorization: Bearer <token>

# Salvar novo post
POST /api/saved-posts
Headers: Authorization: Bearer <token>
Body: { content }
```

### Onboarding (Protegido)

```bash
# Salvar dados de onboarding
POST /api/onboarding
Headers: Authorization: Bearer <token>
Body: { tipo_loja, cidade, objetivo, tipo_conteudo, nome_loja }
```

### Stripe (Protegido)

```bash
# Criar sessão de checkout
POST /api/stripe/checkout
Headers: Authorization: Bearer <token>
```

## 🧪 Testando com cURL

### 1. Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123",
    "full_name":"João Silva"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123"
  }'
```

### 3. Gerar Post (substitua TOKEN)

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "produto":"Máquina de Solda MIG 220A",
    "promo":"40% OFF",
    "objetivo":"Vender produto",
    "publico":"Soldadores profissionais",
    "obs":"Máquina nova no estoque"
  }'
```

## 🏗️ Arquitetura

```
src/
├── config/          # Configurações (Supabase, etc)
├── middleware/      # Middlewares (Auth, etc)
├── routes/          # Rotas da API
├── services/        # Lógica de negócio
└── server.js        # Entry point
```

## 🔒 Segurança

- ✅ JWT para autenticação
- ✅ Row Level Security (RLS) no Supabase
- ✅ Variáveis de ambiente para secrets
- ✅ Validação de entrada
- ✅ Webhook Stripe com verificação de signature

## 📦 Deploy

### Vercel

```bash
vercel deploy
```

### Railway

```bash
railway up
```

### Render

1. Conecte seu repositório GitHub
2. Configure variáveis de ambiente
3. Deploy automático

## 🐛 Troubleshooting

### Supabase não conecta

- Verifique `SUPABASE_URL` e `SUPABASE_SERVICE_KEY`
- Teste conexão com `curl http://localhost:3000/health`

### Claude API retorna erro

- Confirme `ANTHROPIC_API_KEY` está correta
- Verifique quota da conta Anthropic

### Stripe webhook não funciona

- Use `stripe listen` para testar localmente
- Confirme `STRIPE_WEBHOOK_SECRET` está correto

## 📝 Logs

O backend loga eventos importantes:

```
✅ ForgeFlux Backend rodando em http://localhost:3000
✅ Supabase conectado com sucesso
✅ Usuário 123 fez upgrade para Pro
❌ Erro ao gerar post: ...
```

## 📄 Licença

MIT

## 👨‍💻 Desenvolvido por

ForgeFlux Team - 2025
