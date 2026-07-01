# Pagekraft no Next.js

Guia para usar os plugins Pagekraft neste projeto (App Router). Tudo que você precisa colar no código está aqui — não depende de outro repositório.

---

## O básico

Todo plugin usa **3 coisas**:

1. **Um `<div>`** onde o componente aparece  
2. **Um `<script>` inline** com config (`window.pagekraft...`) — quando o plugin pede  
3. **Um `<script type="module">`** apontando para o CDN  

```
https://pagekraft.angulare.app/angulare/pagekraft/{nome}-latest.js
```

**Auth é obrigatório em todo o site.** Booking, catalogue e os demais só funcionam depois dele.

---

## Regras no Next.js

| Faça | Não faça |
|------|----------|
| Scripts em **Server Component** (sem `"use client"`) | Carregar script no `useEffect` |
| Auth no `layout.tsx` | Reimplementar lógica que já existe nos `.js` do CDN |
| Config inline **antes** do script module | Usar `<Link>` para páginas com plugin |
| Links com `<a href="/rota">` nessas páginas | Usar `next/script` + `afterInteractive` |

**Por quê?** Scripts no `useEffect` chegam tarde e o plugin fica no spinner.

**Por quê `<a>` e não `<Link>`?** Na navegação SPA o Next não executa os `<script>` da página de novo.

---

## Passo 1 — Auth (uma vez, no layout)

### `src/components/pagekraft/config.ts`

Crie o arquivo com a URL e a config abaixo. Ajuste `domain`, `domain_dev` e as rotas para o seu cliente.

```ts
export const AUTH_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/auth-latest.js";

export const AUTH_CONFIG_SCRIPT = `
const path = window.location.pathname;
const paths = ["/docs/politica-de-privacidade-app"];

if (!paths.includes(path)) {
  window.pagekraft = window.pagekraft || {};
  window.pagekraft.auth = {
    config: {
      domain: 'angulare.studiocomova.com.br',
      domain_dev: 'comova.dev.angular-ecommerce.com',
      angulareVersion: 'latest-v4',
      config: {
        packagePageUrl: '/planos',
        myAccountPageUrl: '/my-account',
        useOTPInForgotPassword: true,
        newVersionMenu: true,
        useBookV2: true,
        allowSetPOSSelectInTerms: true,
        bookPageUrl: '/agenda',
        dataModalRefferal: {
          textBlock: [
            'Copie o seu código de indicação e envie para um amigo que ainda não nos conhece.',
            'No carrinho da primeira compra, seu amigo deverá inserir o seu código no campo "CUPOM".',
            'Ao finalizar a compra, um crédito cortesia será gerado para você (nada acontecerá na conta dele, este não é um cupom de desconto).',
            'O crédito bônus ficará disponível para a reserva de aula por 30 dias.',
            'A cada dois indicados que realizarem compra de crédito, o aluno que indicou ganha um crédito bônus.'
          ]
        },
        pages: [
          { icon: 'home-internal-icon', label: 'Inicio', page: '/' },
          { icon: 'plan-internal-icon', label: 'Planos', page: '/planos' },
          { icon: 'schedule-internal-icon', label: 'Agenda', page: '/agenda' }
        ]
      }
    }
  };
}
`.trim();
```

| Campo | O que é |
|-------|---------|
| `domain` | Domínio Angulare em **produção** |
| `domain_dev` | Domínio Angulare em **dev** (`localhost` usa este) |
| `angulareVersion` | Versão do web-loader (`latest-v4`, etc.) |
| `packagePageUrl` | Rota do site para pacotes/planos |
| `myAccountPageUrl` | Rota da minha conta |
| `bookPageUrl` | Rota da agenda |
| `pages` | Itens do menu interno do plugin |

### `src/components/pagekraft/PagekraftAuthScripts.tsx`

```tsx
import { AUTH_CONFIG_SCRIPT, AUTH_SRC } from "./config";

export default function PagekraftAuthScripts() {
  return (
    <>
      <script
        id="pagekraft-auth-config"
        dangerouslySetInnerHTML={{ __html: AUTH_CONFIG_SCRIPT }}
      />
      <script id="script-pagekraft-auth" type="module" src={AUTH_SRC} async={false} />
    </>
  );
}
```

### `src/app/layout.tsx`

No **início do `<body>`**, antes do header:

```tsx
import PagekraftAuthScripts from "@/components/pagekraft/PagekraftAuthScripts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <PagekraftAuthScripts />
        {/* header, main, footer... */}
        {children}
      </body>
    </html>
  );
}
```

---

## Passo 2 — Plugin em uma página

Cada plugin precisa de:

- **Container** — `id` e `class` fixos (não invente outros nomes)
- **Config inline** — objeto em `window.pagekraft.{nome}` (se o plugin usar)
- **Script CDN** — `{nome}-latest.js`

---

### Booking (agenda)

**Config em `config.ts`:**

```ts
export const BOOKING_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/booking-latest.js";

export const BOOKING_CONFIG_SCRIPT = `
window.pagekraft = window.pagekraft || {};
window.pagekraft.booking = {
  type: 'schedule-config',
  config: {
    isExternalFilters: true,
    dinamicFilters: true,
  }
};
`.trim();
```

| Campo | Valores comuns |
|-------|----------------|
| `type` | `'schedule-config'` (agenda com filtros), `'weekly-new'`, `'court'` |
| `isExternalFilters` | `true` — filtros fora do componente |
| `dinamicFilters` | `true` — filtros dinâmicos |

**Componente `PagekraftBooking.tsx`:**

```tsx
import { BOOKING_CONFIG_SCRIPT, BOOKING_SRC } from "./config";

export default function PagekraftBooking() {
  return (
    <>
      <div id="pagekraft-booking" className="pagekraft-booking min-h-[400px]" />
      <script
        id="pagekraft-booking-config"
        dangerouslySetInnerHTML={{ __html: BOOKING_CONFIG_SCRIPT }}
      />
      <script id="script-pagekraft-booking" type="module" src={BOOKING_SRC} async={false} />
    </>
  );
}
```

**Página `src/app/agenda/page.tsx`:**

```tsx
import PagekraftBooking from "@/components/pagekraft/PagekraftBooking";

export default function AgendaPage() {
  return (
    <main>
      <h1>Agenda de Aulas</h1>
      <PagekraftBooking />
    </main>
  );
}
```

**Link no menu:**

```tsx
<a href="/agenda">Agenda</a>
```

---

### Catalogue (pacotes)

Não precisa de config inline — só container + script.

**Em `config.ts`:**

```ts
export const CATALOGUE_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/catalogue-latest.js";
```

**Componente `PagekraftCatalogue.tsx`:**

```tsx
import { CATALOGUE_SRC } from "./config";

export default function PagekraftCatalogue() {
  return (
    <>
      <div id="pagekraft-catalogue" className="pagekraft-catalogue min-h-[400px]" />
      <script id="script-pagekraft-catalogue" type="module" src={CATALOGUE_SRC} async={false} />
    </>
  );
}
```

**Config opcional** (filtros de unidade/POS):

```ts
export const CATALOGUE_CONFIG_SCRIPT = `
window.pagekraft = window.pagekraft || {};
window.pagekraft.catalogue = {
  config: {
    // paramsFilterRequestLocationsSelect: '{"tag": "exemplo"}',
    // paramsFilterRequestPOSSelect: '{"tags": "exemplo"}'
  }
};
`.trim();
```

Se usar config, adicione o `<script id="pagekraft-catalogue-config" ... />` **antes** do script module (mesmo padrão do booking).

---

### My Account (minha conta)

**Config em `config.ts`:**

```ts
export const MY_ACCOUNT_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/my-account-latest.js";

export const MY_ACCOUNT_CONFIG_SCRIPT = `
window.pagekraft = window.pagekraft || {};
window.pagekraft.myAccount = {
  config: {
    config: {
      coverImage: "https://exemplo.com/imagem-capa.jpg",
      excludeRoutes: ['performance', 'creditcards']
    },
    hidePreferredUnit: false,
    hideCreditSlider: true
  }
};
`.trim();
```

**Componente:**

```tsx
<>
  <div id="pagekraft-my-account" className="pagekraft-my-account min-h-[400px]" />
  <script id="pagekraft-my-account-config" dangerouslySetInnerHTML={{ __html: MY_ACCOUNT_CONFIG_SCRIPT }} />
  <script id="script-pagekraft-my-account" type="module" src={MY_ACCOUNT_SRC} async={false} />
</>
```

Lembre de alinhar `myAccountPageUrl` no auth config com a rota real (ex.: `/my-account`).

---

### Event List (lista de eventos)

**Config em `config.ts`:**

```ts
export const EVENT_LIST_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/event-list-latest.js";

export const EVENT_LIST_CONFIG_SCRIPT = `
window.pagekraft = window.pagekraft || {};
window.pagekraft.eventList = {
  useOldDefaultTemplate: false,
  params_new: {
    days_consider: 5
  }
};
`.trim();
```

**Componente:**

```tsx
<>
  <div id="pagekraft-event-list" className="pagekraft-event-list min-h-[400px]" />
  <script id="pagekraft-event-list-config" dangerouslySetInnerHTML={{ __html: EVENT_LIST_CONFIG_SCRIPT }} />
  <script id="script-pagekraft-event-list" type="module" src={EVENT_LIST_SRC} async={false} />
</>
```

---

## Passo 3 — Botões de login no header

Coloque no header. O auth controla visibilidade e cliques sozinho:

```html
<span class="pagekraft-auth-login">Login</span>
<span class="pagekraft-auth-logout">Logout</span>
<span class="pagekraft-auth-register">Cadastrar</span>
<span class="pagekraft-auth-passwordforgot">Esqueci minha senha</span>
<span class="pagekraft-auth-checkout">Carrinho</span>
<span class="pagekraft-auth-my-account">Minha conta</span>
<span class="pagekraft-auth-fullname">Olá usuário</span>
<div class="pagekraft-auth-credits"></div>
```

Exemplo completo: `src/components/Navbar.tsx`

---

## Resumo dos plugins

| Plugin | Container | `window.pagekraft.*` | CDN |
|--------|-----------|----------------------|-----|
| auth | — (layout) | `auth` | `auth-latest.js` |
| booking | `id="pagekraft-booking"` `class="pagekraft-booking"` | `booking` | `booking-latest.js` |
| catalogue | `id="pagekraft-catalogue"` `class="pagekraft-catalogue"` | `catalogue` (opcional) | `catalogue-latest.js` |
| my-account | `id="pagekraft-my-account"` `class="pagekraft-my-account"` | `myAccount` | `my-account-latest.js` |
| event-list | `id="pagekraft-event-list"` `class="pagekraft-event-list"` | `eventList` | `event-list-latest.js` |

**Ordem no HTML:** config inline → script module. Auth no layout; demais plugins na página.

---

## Adicionar um plugin novo

1. Pegue na tabela acima o **container**, a **chave** `window.pagekraft.*` e a **URL** do CDN  
2. Coloque URL + config em `config.ts`  
3. Crie `Pagekraft{Nome}.tsx` (div + scripts)  
4. Importe na página Next  
5. Atualize rotas no `AUTH_CONFIG_SCRIPT` se necessário  
6. Link com `<a href="/rota">`

---

## Não funciona?

- Abriu a página com **F5** ou `<a href>`, não com `<Link>`?
- Auth está no `layout.tsx`?
- Config inline vem **antes** do script module?
- `id` e `class` do div são exatamente os da tabela acima?
- Rotas no auth (`bookPageUrl`, `packagePageUrl`…) existem no Next?
- Em `localhost` usa `domain_dev` — domínio liberado no Angulare?

---

## Arquivos deste projeto

```
src/components/pagekraft/
  config.ts                 ← URLs e configs (cole o conteúdo deste guia)
  PagekraftAuthScripts.tsx  ← layout (global)
  PagekraftBooking.tsx      ← /agenda
  PagekraftCatalogue.tsx    ← /pacotes

src/components/Navbar.tsx   ← botões pagekraft-auth-*
src/app/layout.tsx          ← importa PagekraftAuthScripts
```
