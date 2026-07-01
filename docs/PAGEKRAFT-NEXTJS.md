# Pagekraft no Next.js

Guia rápido para usar os plugins Pagekraft neste projeto (App Router).

---

## O básico

Todo plugin Pagekraft usa **3 coisas**:

1. **Um `<div>`** onde o componente aparece  
2. **Um `<script>` inline** com a config (`window.pagekraft...`) — quando o plugin pede  
3. **Um `<script type="module">`** apontando para o CDN  

```
https://pagekraft.angulare.app/angulare/pagekraft/{nome}-latest.js
```

**Auth é obrigatório em todo o site.** Os outros plugins (booking, catalogue, my-account…) só funcionam depois dele.

---

## Regras no Next.js

| Faça | Não faça |
|------|----------|
| Scripts em **Server Component** (sem `"use client"`) | Carregar script no `useEffect` |
| Auth no `layout.tsx` | Copiar código interno dos repos Pagekraft |
| Config inline **antes** do script module | Usar `<Link>` para páginas com plugin |
| Links com `<a href="/rota">` nessas páginas | Usar `next/script` + `afterInteractive` |

**Por quê?** Plugins carregados no `useEffect` chegam tarde demais e ficam no spinner para sempre.

**Por quê `<a>` e não `<Link>`?** Na navegação SPA o Next não roda os `<script>` de novo.

---

## Passo 1 — Auth (uma vez, no layout)

**Arquivo:** `src/components/pagekraft/config.ts`  
Coloque a URL e a config do auth (copie do `index.html` do repo `pagekraft/auth`).

**Arquivo:** `src/components/pagekraft/PagekraftAuthScripts.tsx`

```tsx
import { AUTH_CONFIG_SCRIPT, AUTH_SRC } from "./config";

export default function PagekraftAuthScripts() {
  return (
    <>
      <script id="pagekraft-auth-config" dangerouslySetInnerHTML={{ __html: AUTH_CONFIG_SCRIPT }} />
      <script id="script-pagekraft-auth" type="module" src={AUTH_SRC} async={false} />
    </>
  );
}
```

**Arquivo:** `src/app/layout.tsx` — no início do `<body>`:

```tsx
<PagekraftAuthScripts />
```

---

## Passo 2 — Plugin em uma página

### Onde achar o que copiar

Abra `pagekraft/{nome}/index.html` no repositório Pagekraft e copie:

- `id` e `class` do `<div>`
- bloco `window.pagekraft.{nome} = { ... }` (se existir)
- URL do script (`*-latest.js`)

### Exemplo: booking (agenda)

**1.** Adicione em `config.ts`:

```ts
export const BOOKING_SRC = "https://pagekraft.angulare.app/angulare/pagekraft/booking-latest.js";

export const BOOKING_CONFIG_SCRIPT = `
window.pagekraft = window.pagekraft || {};
window.pagekraft.booking = {
  type: 'schedule-config',
  config: { isExternalFilters: true, dinamicFilters: true }
};
`.trim();
```

**2.** Crie `PagekraftBooking.tsx`:

```tsx
import { BOOKING_CONFIG_SCRIPT, BOOKING_SRC } from "./config";

export default function PagekraftBooking() {
  return (
    <>
      <div id="pagekraft-booking" className="pagekraft-booking min-h-[400px]" />
      <script id="pagekraft-booking-config" dangerouslySetInnerHTML={{ __html: BOOKING_CONFIG_SCRIPT }} />
      <script id="script-pagekraft-booking" type="module" src={BOOKING_SRC} async={false} />
    </>
  );
}
```

**3.** Use na página:

```tsx
import PagekraftBooking from "@/components/pagekraft/PagekraftBooking";

export default function AgendaPage() {
  return <PagekraftBooking />;
}
```

**4.** Link no menu:

```tsx
<a href="/agenda">Agenda</a>
```

### Exemplo: catalogue (sem config inline)

Alguns plugins só precisam do div + script:

```tsx
export default function PagekraftCatalogue() {
  return (
    <>
      <div id="pagekraft-catalogue" className="pagekraft-catalogue min-h-[400px]" />
      <script
        id="script-pagekraft-catalogue"
        type="module"
        src="https://pagekraft.angulare.app/angulare/pagekraft/catalogue-latest.js"
        async={false}
      />
    </>
  );
}
```

---

## Passo 3 — Botões de login no header

Coloque no header as classes que o auth reconhece. O plugin mostra/esconde sozinho:

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

Referência: `src/components/Navbar.tsx`

---

## Adicionar outro plugin

Sempre o mesmo fluxo:

1. Copiar config do `index.html` do repo Pagekraft → `config.ts`
2. Criar `Pagekraft{Nome}.tsx` (div + config + script)
3. Importar na página Next
4. Atualizar rotas no `AUTH_CONFIG_SCRIPT` (`bookPageUrl`, `packagePageUrl`, etc.)
5. Link com `<a href>`

| Plugin | Div | Config | CDN |
|--------|-----|--------|-----|
| auth | — | `pagekraft.auth` | `auth-latest.js` |
| booking | `#pagekraft-booking` | `pagekraft.booking` | `booking-latest.js` |
| catalogue | `#pagekraft-catalogue` | opcional | `catalogue-latest.js` |
| my-account | `#pagekraft-my-account` | `pagekraft.myAccount` | `my-account-latest.js` |
| event-list | `#pagekraft-event-list` | `pagekraft.eventList` | `event-list-latest.js` |

---

## Ordem de carregamento

```
layout.tsx     → config auth + auth-latest.js
página         → config do plugin (se houver) + {plugin}-latest.js
```

Auth primeiro. Plugin da página depois.

---

## Não funciona?

- Entrou na página com **F5** ou `<a href>`, não com `<Link>`?
- Auth está no `layout.tsx`?
- Config inline vem **antes** do script module?
- `id` e `class` do div batem com o `index.html` do Pagekraft?
- Rotas no auth config (`/agenda`, `/pacotes`…) existem no Next?
- Em `localhost` o backend usa `domain_dev` — domínio liberado no Angulare?

---

## Arquivos deste projeto

```
src/components/pagekraft/
  config.ts                 ← URLs e configs
  PagekraftAuthScripts.tsx  ← layout (global)
  PagekraftBooking.tsx      ← /agenda
  PagekraftCatalogue.tsx    ← /pacotes

src/components/Navbar.tsx   ← botões pagekraft-auth-*
src/app/layout.tsx          ← importa PagekraftAuthScripts
```
