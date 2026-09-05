# CONTEXT.md — Contexto do projeto (para humanos e outras IAs)

> Este arquivo explica **o que é este projeto, como ele está organizado e quais
> decisões foram tomadas**, para que qualquer pessoa ou assistente de IA que abra
> esta pasta entenda rapidamente o estado atual e não quebre convenções.
> Mantenha este arquivo atualizado ao fazer mudanças relevantes.
>
> **Existe uma cópia idêntica em `CLAUDE.md`** (que o Claude Code lê automaticamente).
> Ao editar um, atualize o outro.

---

## 1. O que é

Site pessoal de **Kenzo Nakagawa** que cumpre dois papéis:

1. **Landing page de produtos digitais** (automações com IA) — cada produto leva ao
   checkout (Kiwify) ou a uma página de detalhe que explica e converte.
2. **Link-in-bio** — substitui o Linktree na bio do Instagram. A maior parte do
   tráfego vem do celular ⇒ **mobile-first é obrigatório**.

- **Dono:** Kenzo Pigosso Nakagawa · e-mail `kenzo.nakagawa03@gmail.com`
- **Usuário GitHub:** `nakagawakenzoo`
- **Site no ar:** https://nakagawakenzoo.github.io/
- **Idioma:** Português do Brasil (pt-BR).

---

## 2. Stack e restrições

- **100% estático**: HTML + CSS + JS puro. **Sem build tools, sem framework, sem backend.**
- Hospedado em **GitHub Pages** (repositório `nakagawakenzoo.github.io`, branch `main`, raiz).
- `.nojekyll` presente para o Pages servir os arquivos sem processamento Jekyll.
- Fontes via Google Fonts (Montserrat; UnifrakturCook só para o "K" gótico do hero).
- Ícones = **SVG inline** (nada de bibliotecas pesadas). Meta: Lighthouse 90+.
- Acessibilidade: contraste, `alt`, foco visível, `prefers-reduced-motion`.
- Links externos sempre com `target="_blank" rel="noopener"`.

---

## 3. Estrutura de arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | Home **"tela única"** (2026-08-29): tudo cabe na dobra, sem rolagem — hero compacto, **blocos de links** numa fileira (Telegram/TikTok/YouTube/Instagram/Discord), **produtos em CARROSSEL** (auto-avança), disclaimer e footer enxutos (Pix inline). Header oculto na home (o hero já carrega a marca). |
| `styles.css` | Folha principal: tokens (CSS custom properties), sistema de cores, header, hero + animações, painéis, blocos de links (`.tile`), FAQ, comunidade, Pix, footer. |
| `script.js` | JS compartilhado (home + páginas de produto): sistema de cor por produto, **carrossel de produtos da home**, blur do header, FAQ accordion, digitação do hero, copiar Pix, ano dinâmico. Tudo guardado por `if` — cada página usa só o que tem. |
| `automacao-de-videos.html` | Página de detalhe do produto "Automação de Vídeos" (acento verde). |
| `automacao-de-cortes.html` | Página de detalhe do produto "Automação de Cortes" (acento violeta). |
| `produto.css` | Estilos compartilhados das páginas de produto (hero, timeline, grids, CTA). Acento definido por classe no `<body>` (`page-video` / `page-cortes`). |
| `termos.html` | Termos de Uso (documento jurídico, 21 seções). |
| `legal.css` | Estilos da página de termos. |
| `assets/favicon.svg` | Favicon (olho minimalista violeta). |
| `assets/LEIA-ME.md` | Lista das imagens que faltam subir. |
| `assets/og-cover.jpg` | Imagem OG 1200×630 (gerada por script; capa dos compartilhamentos). |
| `sitemap.xml` / `robots.txt` / `404.html` | Higiene SEO + página de erro do Pages. |
| `BRIEFING-LANDING-PAGE.md` | Briefing original do projeto. |
| `.gitignore` | Ignora `.claude/`. |

---

## 4. Sistema de cores por produto (feature central)

Tema **dark fixo**; a cor de destaque muda conforme o produto com que o visitante interage.

- Variáveis globais em `:root`: `--accent`, `--accent-soft`, `--accent-contrast`, `--accent-glow`.
- Cada produto tem `data-accent="..."`, que define `--card*` (cores fixas do card). Valores:

| accent | Produto | Cor |
|---|---|---|
| `violet` | Automação de Cortes | `#8b5cf6` |
| `green` | Automação de Vídeos | `#10b981` |
| `yellow` | Curso AUVP | `#facc15` |
| `blue` | Salesforce Marketing Cloud | `#38bdf8` |
| `rose` | Aeternum (jogo) | `#f43f5e` |
| `cyan` | bloco TikTok + card PAPO AI | `#22d3ee` |
| `red` | bloco YouTube | `#ef4444` |
| `pink` | bloco Instagram | `#ec4899` |
| `indigo` | bloco Discord | `#6366f1` |
| `blue` | bloco Grupo de ofertas (Telegram) — reaproveita o azul | `#38bdf8` |

- Padrão inicial no CSS: **violeta** (na home o JS aplica logo a cor do 1º slide — amarelo AUVP).
- `script.js` copia os `--card*` do painel ativo para os `--accent*` globais. Na **home**,
  o painel "ativo" é o **slide atual do carrossel** (a cor da página cicla junto com o
  auto-avanço); o IntersectionObserver por rolagem só roda em página SEM carrossel.
  Hover (desktop) também troca. Transição ~400ms.
- Os **blocos de links** (`.tile[data-accent]`) só trocam a cor **no hover** (desktop) — não
  entram no IntersectionObserver (cinco blocos na mesma faixa trocariam a cor sem parar).
- Painéis que já estão dentro da tela no carregamento recebem `.in` na hora (sem esperar a
  faixa central), para o primeiro painel não ficar invisível logo abaixo dos blocos de links.

---

## 5. Produtos (ordem atual na home)

Os produtos são **cards de carrossel** na home (borda + glow na cor do produto, canto
arredondado — o formato facetado/diagonal saiu da home em 2026-08-29, junto com a arte
lateral `panel-art`), um slide por produto:

1. **Curso AUVP** (`yellow`) — afiliado do Raul Sena (Investidor Sardinha). Badge
   "Indicação". Link de desconto: `https://sard.ink/AUVPKenzo` (dá desconto na matrícula;
   trocado em 2026-08-29 — antes era `sard.ink/AUVP-Desenvolvimento` e, antes disso,
   `form.auvp.com.br/...indicacao=...`).
2. **PAPO AI — Atendente de IA no WhatsApp** (`cyan`) — indicação de afiliado (criado em
   2026-08-29): SaaS que responde leads no WhatsApp em segundos, qualifica e agenda reunião
   (API oficial da Meta, no número do cliente). Link de indicação:
   `https://papoai.com.br/52c8d9`; CTA "Testar 7 dias grátis" (trial do fornecedor —
   conferir se ele mudar as condições). **Cupom em destaque** no card: `KENZO`
   (`.panel-coupon`, pílula tracejada acima do CTA).
3. **Aeternum — Hoje na História** (`rose`) — jogo autoral, **gratuito**, jogável no
   navegador. Badge "Indicação". Link com UTM de campanha. https://playaeternum.com/
   (movido para a 3ª posição a pedido do Kenzo em 2026-08-29).
4. **Automação de Cortes** (`violet`) — **vendas ABERTAS** (trilha). Badge
   "Vendas abertas"; botão "Conhecer a trilha" → `automacao-de-cortes.html` (que converte
   para o checkout Kiwify).
5. **Automação de Vídeos** (`green`) — **vendas ABERTAS** (trilha). Badge
   "Vendas abertas"; botão "Conhecer a trilha" → `automacao-de-videos.html`.
6. **Salesforce Marketing Cloud** (`blue`) — **Em breve** (`panel-soon`): botão
   desabilitado + "Me avise no lançamento" (mailto).

> Para reordenar/adicionar produtos, basta mover/criar o
> `<article class="panel-row" data-accent="...">` dentro do trilho `#carTrack` — não há
> mais regra de posição (o zigue-zague `panel-left/right` acabou); setas, bolinhas e
> atributos aria dos slides são gerados pelo `script.js`.

### Links de checkout (Kiwify)
- Automação de Vídeos: `https://pay.kiwify.com.br/Uu09KDB`
- Automação de Cortes: `https://pay.kiwify.com.br/1YQ9fto`

### Modelo de venda — TRILHA (vendas REATIVADAS em 03/08/2026)
- Formato: **trilha de aulas de automação com N8N** liberadas 1/dia na Kiwify (drip); a
  **ferramenta pronta** (fluxo + instalador) é liberada como **BÔNUS no 8º dia** — depois
  da janela de arrependimento de 7 dias, o que neutraliza o golpe do reembolso (comprar →
  baixar → estornar). A área de membros na Kiwify já está montada nesse formato.
- Vendas REATIVADAS: as duas páginas de detalhe têm CTA direto pro checkout Kiwify
  ("Entrar na trilha agora", `target="_blank"`), com a nota de transparência "acesso
  imediato à trilha; ferramenta bônus no 8º dia" (obrigatória ANTES da compra). A antiga
  **lista de espera por mailto foi desativada** (interessados notificados por e-mail em
  agosto/2026). Preço: **promoção "de R$ 597 por R$ 299"** desde 2026-08-29 (~50% off;
  markup `.price-was`/`.price-off` compartilhado em `styles.css` — usado no `.panel-price`
  da home, no `.v-price` e no `.v-cta-note` das páginas de produto).
- O produto Vídeos tem modo inglês e opção sem legenda (card "Português ou inglês").

As páginas de detalhe descrevem o pipeline real das automações (vindo de fluxos n8n),
mas **de forma genérica** — sem expor chaves de API, IDs de credencial, caminhos de
arquivo, voice IDs ou nomes de canal.

---

## 6. Hero e animações

- Avatar com "**K**" em fonte gótica (UnifrakturCook); bio = "**Tèknolōdiæ**".
- Efeitos (todos CSS, exceto digitação):
  - **Neon ciclando** pela paleta (violeta→verde→amarelo→azul) no avatar e na bio (8s).
  - **Digitação** do "Tèknolōdiæ" ao carregar (JS, `Array.from` p/ acentos) + **cursor piscando**.
  - **Glitch** no "Kenzo Nakagawa" a cada 5s (tremida + fragmentação com split de cor).
- Tudo respeita `prefers-reduced-motion` (se o SO pede menos movimento, as animações não rodam).
  Obs.: o Windows do dono estava com "efeitos de animação" desligados, o que os navegadores
  leem como `reduce` — foi reativado no sistema para ele ver as animações no PC.

---

## 7. Outras seções

- **Home "tela única" + carrossel (2026-08-29)**: feedback de que muita gente não rolava a
  página até o fim ⇒ a home inteira agora cabe na dobra (`body.home` = flex column com
  `min-height: 100svh`; camadas de compactação por altura no fim do `styles.css`: ≤929px
  esconde os bullets dos painéis, ≤849px compacta hero/tiles, ≤699px aperto final; largura
  ≤819px = mobile: descrição em 3 linhas com reticências, sem bullets nem setas). Os 5
  produtos viraram slides de um **carrossel com peek** (`.carousel > .panels#carTrack`):
  o slide ativo fica **centralizado** (`--slide-w` = 74% desktop / 86% mobile, snap center)
  e os vizinhos aparecem **translúcidos de amostra** nas laterais (`.is-active` no ativo;
  inativos com opacity 0.32 + scale 0.94) — pedido do Kenzo para o visitante VER que tem
  mais coisa pro lado. Auto-avança a cada **2 s** (`AUTO_MS` no script.js) e, se o
  visitante interagir (seta/bolinha/swipe/wheel/foco), fica **estático por 30 s**
  (`RESUME_MS`; hover pausa e, ao sair o mouse, respeita o que restar da janela de 30 s
  via `holdUntil`). Setas e bolinhas são injetadas pelo JS (sem JS o trilho continua
  rolável no dedo, com scroll-snap). **Gotcha técnica**: com
  `scroll-snap-type: x mandatory` o Chrome rebate/cancela `scrollTo` suave e até atribuição
  de `scrollLeft` fora de ponto de snap — por isso a animação é via requestAnimationFrame
  com o snap temporariamente em `none` (função `animateTo`). O box grande "Apoie" virou a
  linha `.pix-inline` no footer (mantidos os ids `copyPix`/`pixKey`).
- **Link-in-bio = blocos de links** (2026-08-22, a partir de um rascunho do Kenzo): logo
  abaixo do hero, uma **fileira de mini-cards arredondados** (`.tiles > a.tile`) com borda +
  glow na cor da rede via `box-shadow`, mesma linguagem dos cards do carrossel. O formato
  facetado original (`clip-path` + `filter: drop-shadow`) foi aposentado em **2026-08-29**:
  essa combinação compõe um **retângulo preto** em volta dos blocos no Chrome/Windows, com o
  glow cortado em bordas retas (feedback do Kenzo em vídeo) — não reintroduzir, e **nunca
  clipar `.tiles` com overflow** (corta o glow). Ordem: **Grupo de ofertas (Telegram)**
  `https://t.me/ofertasdokenzo` → TikTok → YouTube → Instagram → Discord
  `https://discord.gg/aJTsQ9AXE`. Sempre numa fileira única (encolhem via `clamp`). O header
  ficou **só com a marca** (os ícones sociais saíram de lá). **Kick foi removido** do site.
- **Removidos da home em 2026-08-22**: título "Soluções" + subtítulo, seção "Como funciona",
  bloco de comunidade, FAQ e o **pop-up de lojas** (Amazon/ML/Shopee + Telegram). Os links
  de afiliado das lojas **não estão mais em lugar nenhum do site** — a porta de entrada das
  ofertas passou a ser o grupo do Telegram.
- **Comunidade no Discord**: bloco de destaque **só nas duas páginas de produto**, + item em
  "O que você recebe". Os blocos ainda **não são botões clicáveis** (TODO) — podem virar
  botão com o convite acima.
- **FAQ**: **só nas páginas de produto** (seção `#faq`, entre "Requisitos honestos" e o CTA
  final), 6 perguntas, com respostas alinhadas aos requisitos de cada produto (Cortes:
  Windows 10/11 + OpenAI por uso; Vídeos: Win/mac/Linux + ~US$ 14/mês). O accordion vem do
  `script.js`, que as páginas de produto passaram a carregar (substituiu o script inline).
- **Apoio via Pix** (footer da home, linha compacta `.pix-inline` desde 2026-08-29): chave
  `kenzo.nakagawa03@gmail.com` com botão "Copiar".
- **Termos de Uso** (`termos.html`): linkado no footer de todas as páginas.

---

## 8. Deploy

- Git **não está no PATH**; use o caminho completo: `"C:\Program Files\Git\cmd\git.exe"`.
- GitHub CLI (`gh`) instalado em `"C:\Program Files\GitHub CLI\gh.exe"`, autenticado como `nakagawakenzoo`.
- Fluxo padrão a cada mudança: `git add -A` → `git commit` → `git push origin main`.
  O GitHub Pages republica sozinho em ~1 min.
- **Atenção no commit (PowerShell):** aspas duplas na mensagem quebram o parser — use
  here-string `@'...'@` e evite `"` no texto da mensagem.
- Assinatura de commit usada no projeto: `Co-Authored-By: Claude ...`.

---

## 9. Decisões e guardrails (NÃO quebrar)

- **Proibido promessa de ganho/renda** ("ganhe R$ X"). Tom: honesto, foco em automação,
  economia de tempo e eficiência. Há disclaimers de "resultados não garantidos".
- **Privacidade**: o CPF do dono aparece **mascarado** (`493.***.***-64`) nos Termos. O CPF
  completo **não está no repositório**. Não publicar dados sensíveis.
- **Não expor internos dos fluxos n8n** (chaves, credenciais, paths, IDs, nome de canal).
- **Acessibilidade**: manter contraste (texto escuro sobre amarelo!), foco visível e
  `prefers-reduced-motion`.
- **Termos de Uso**: é uma minuta forte, **não revisada por advogado**. O CDC (Lei 8.078/90)
  é de ordem pública — não dá para negar por contrato o arrependimento de 7 dias de quem age
  de boa-fé; a estratégia antifraude ataca só a **má-fé** (comprar, baixar e estornar p/ ficar
  com os arquivos) via revogação de licença + violação de direitos autorais.

---

## 10. Pendências / TODO

- [ ] **Blocos de comunidade viram botão** com o convite `https://discord.gg/aJTsQ9AXE`
      (o bloco de link do Discord na home já usa esse convite).
- [ ] **Imagens** em `assets/`: `perfil.jpg` e as capas dos produtos (hoje há
      placeholders/anéis). Ver `assets/LEIA-ME.md`. (`og-cover.jpg` feita em 2026-07-19.)
- [x] ~~Meta `og:image`~~ — `og-cover.jpg` criada e og:url/og:image da home corrigidos (2026-07-19).
- [ ] **GoatCounter**: criar conta gratuita em goatcounter.com com o código `kenzonakagawa`
      e descomentar o script nas 4 páginas (snippet já está lá, comentado).
- [x] ~~Prova social~~ — vídeos reais embutidos nas 2 páginas (seção `#exemplo`, antes
      da `#trilha`): `assets/exemplo-cortes.mp4` (Short 45s, 1,5 MB) e
      `assets/exemplo-videos.mp4` (trecho de 75s em 720p, ~17 MB — o original de 9 min
      tinha 168 MB, acima do limite de 100 MB do GitHub). `preload="metadata"` + poster
      jpg = a página segue leve; o vídeo só baixa no play (2026-08-03).
- [ ] **Salesforce Marketing Cloud**: sair de "Em breve" quando lançar (tem CTA de compra a criar).
- [ ] **Revisão jurídica** dos Termos (Seções 8 e 9) e, se abrir **MEI/CNPJ**, trocar a
      identificação do fornecedor de CPF para CNPJ.
- [ ] Avaliar **Política de Privacidade** separada (hoje LGPD resumida na Seção 17 dos Termos).
- [ ] (Opcional) frase de "possibilidade de renda, não garantia" nas páginas de automação — pendente de decisão.

---

_Última atualização deste contexto: 2026-08-29._
