# CLAUDE.md — Contexto do projeto (para humanos e outras IAs)

> **Espelho de `CONTEXT.md`** (mesmo conteúdo). O Claude Code carrega este arquivo
> automaticamente; `CONTEXT.md` existe para outras IAs/ferramentas. **Ao editar um,
> atualize o outro** (trate o conteúdo como uma fonte única em dois nomes).
>
> Este arquivo explica **o que é este projeto, como ele está organizado e quais
> decisões foram tomadas**, para que qualquer pessoa ou assistente de IA que abra
> esta pasta entenda rapidamente o estado atual e não quebre convenções.

---

## 1. O que é

Site pessoal de **Kenzo Nakagawa** que cumpre dois papéis:

1. **Landing page de produtos digitais** (apps de automação com IA) — cada produto leva ao
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
| `automacao-de-videos.html` | Página de detalhe do app **FacelessOS** (Automação de Vídeos, acento verde). URL mantida de antes do app. |
| `automacao-de-cortes.html` | Página de detalhe do app **ClipOS** (Automação de Cortes, acento violeta). URL mantida de antes do app. |
| `produto.css` | Estilos compartilhados das páginas de produto (hero, timeline, grids, CTA, tabela comparativa `.v-table`, destaque `.v-highlight`, "para quem é" `.v-fit`). Acento definido por classe no `<body>` (`page-video` / `page-cortes`). |
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
| `violet` | ClipOS (Automação de Cortes) | `#8b5cf6` |
| `green` | FacelessOS (Automação de Vídeos) | `#10b981` |
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
4. **ClipOS — App de Cortes** (`violet`) — **app de computador, vendas ABERTAS**. Badge
   "Novo app · Vendas abertas"; botão "Conhecer o ClipOS" → `automacao-de-cortes.html` (que
   converte para o checkout Kiwify).
5. **FacelessOS — App de Vídeos** (`green`) — **app de computador, vendas ABERTAS**. Badge
   "Novo app · Vendas abertas"; botão "Conhecer o FacelessOS" → `automacao-de-videos.html`.
6. **Salesforce Marketing Cloud** (`blue`) — **Em breve** (`panel-soon`): botão
   desabilitado + "Me avise no lançamento" (mailto).

> Para reordenar/adicionar produtos, basta mover/criar o
> `<article class="panel-row" data-accent="...">` dentro do trilho `#carTrack` — não há
> mais regra de posição (o zigue-zague `panel-left/right` acabou); setas, bolinhas e
> atributos aria dos slides são gerados pelo `script.js`.

### Links de checkout (Kiwify)
- FacelessOS (Automação de Vídeos): `https://pay.kiwify.com.br/Uu09KDB`
- ClipOS (Automação de Cortes): `https://pay.kiwify.com.br/1YQ9fto`

### Modelo de venda — APP (desde 2026-09-13)
- Os dois produtos agora entregam um **aplicativo de computador** no lugar do template n8n:
  **FacelessOS** (vídeos longos; projeto `Documents\darktube-app`) e **ClipOS** (cortes para
  Shorts; projeto `Documents\cortes-app`). Mesmos checkouts da Kiwify e mesma promoção
  **"de R$ 597 por R$ 299"** (~50% off desde 2026-08-29; markup `.price-was`/`.price-off`
  compartilhado em `styles.css`, usado no `.panel-price` da home, no `.v-price` e no
  `.v-cta-note` das páginas de produto).
- **Fontes da verdade da copy**: `cortes-app/docs/venda-kiwify.md` (texto de venda do ClipOS,
  verificável no app) e `darktube-app/README.md` + `ferramentas/leiame-windows.txt` (o
  FacelessOS não tem doc de venda). Antes de anunciar recurso novo, confirmar no código.
- **Só Windows 10/11** nas páginas: os instaladores de Mac/Linux existem, mas nunca rodaram
  numa máquina real (recomendação do próprio doc de venda). Incluir quando o Kenzo testar.
- **Entrega (confirmada pelo Kenzo em 2026-09-13, igual nos dois produtos)**: a Kiwify libera
  um **curso com 1 aula por dia durante 7 dias** e o **app no 8º dia** (drip contra o golpe
  comprar → baixar → estornar). A nota de transparência é **OBRIGATÓRIA antes da compra** e
  está em: hero (`.v-cta-note` sob o preço), item "Curso em 7 aulas" + "liberado no 8º dia"
  em "O que você recebe", FAQ "Quando recebo o app?" e nota do CTA final das duas páginas;
  na home, 1º bullet dos cards. O tema do curso não foi informado — não afirmar que é N8N.
- Honestidade específica: no ClipOS, o layout **react** exige marcar a janela do vídeo à mão
  (uma vez, "aplicar a todos"; a detecção automática foi reprovada no app) — o site diz isso.
  Custos: FacelessOS ~US$ 0,47/vídeo com narração na nuvem (medido em produção, manual do
  DarkTube; ~US$ 14/mês com 1 vídeo/dia), voz local grátis; ClipOS com OpenAI opcional,
  US$ 0,25–0,45/vídeo.
- **Estrutura das páginas**: hero (selo "<App> · Novo app") → `#app` "Agora é um app" →
  `#exemplo` → `#como-funciona` (timeline) → diferenciais/robustez → (ClipOS: `#ia`, tabela
  nuvem × no seu PC `.v-table` + `.v-highlight`) → O que você recebe → Discord → (ClipOS:
  "Para quem é / não é" `.v-fit`) → Requisitos honestos → FAQ → CTA "Quero o <App>".
- Histórico: 03/08–13/09/2026 o produto foi **trilha de aulas N8N** + ferramenta n8n bônus no
  8º dia (mesmo drip de hoje); antes disso, lista de espera por mailto (desativada em agosto/2026).

As páginas de detalhe descrevem o que os apps fazem **de forma genérica** — sem expor
chaves de API, IDs de credencial, caminhos de arquivo, voice IDs ou nomes de canal.

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
  `min-height: 100svh`; camadas de compactação por altura no fim do `styles.css`: ≤999px
  esconde os bullets dos painéis (era ≤929px até 2026-09-13), ≤849px compacta hero/tiles e
  limita a descrição a 3 linhas, ≤699px aperto final; largura ≤819px = mobile: descrição em
  3 linhas com reticências, sem bullets nem setas). **A altura do trilho é a do card MAIS
  ALTO** — card novo, bullet que quebra linha ou descrição maior pede nova medição. Medido
  sem rolagem em 2026-09-13: 1920×1080, 1280×1000, 1280×999, 1280×930, 1280×850, 1440×789,
  1536×730, 1280×720, 1024×700, 1366×657, 390×844, 375×812, 375×667 (só a janela atípica
  820×600 rola ~38px). Cards dos apps na home: 4 bullets curtos, sem quebra. Os 5
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
  `https://discord.gg/aDYgBns94`. Sempre numa fileira única (encolhem via `clamp`). O header
  ficou **só com a marca** (os ícones sociais saíram de lá). **Kick foi removido** do site.
- **Removidos da home em 2026-08-22**: título "Soluções" + subtítulo, seção "Como funciona",
  bloco de comunidade, FAQ e o **pop-up de lojas** (Amazon/ML/Shopee + Telegram). Os links
  de afiliado das lojas **não estão mais em lugar nenhum do site** — a porta de entrada das
  ofertas passou a ser o grupo do Telegram.
- **Comunidade no Discord**: bloco de destaque **só nas duas páginas de produto**, + item em
  "O que você recebe". Os blocos ainda **não são botões clicáveis** (TODO) — podem virar
  botão com o convite acima.
- **FAQ**: **só nas páginas de produto** (seção `#faq`, entre "Requisitos honestos" e o CTA
  final): 10 perguntas no ClipOS e 9 no FacelessOS (inclui "Quando recebo o app?"), alinhadas aos requisitos de cada app
  (ClipOS: Windows 10/11, OpenAI opcional, cookies do YouTube para alguns downloads;
  FacelessOS: Windows 10/11, OpenAI + Pexels, ~US$ 0,47/vídeo com narração na nuvem). O
  accordion vem do `script.js`, que as páginas de produto passaram a carregar.
- **Apoio via Pix** (footer da home, linha compacta `.pix-inline` desde 2026-08-29): chave
  `kenzo.nakagawa03@gmail.com` com botão "Copiar".
- **Termos de Uso** (`termos.html`): linkado no footer de todas as páginas. Atualizados em
  2026-09-13 para cobrir os apps: definições (Seções 2 e 3) incluem aplicativos; requisitos
  (Seção 4) só exigem n8n para fluxos e remetem custos/requisitos à página de cada Produto
  (saiu o "~US$ 14/mês" fixo); Seções 6, 7 e 8 citam aplicativos.

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
- **Não expor internos dos apps/fluxos** (chaves, credenciais, paths, IDs, nome de canal).
- **Acessibilidade**: manter contraste (texto escuro sobre amarelo!), foco visível e
  `prefers-reduced-motion`.
- **Termos de Uso**: é uma minuta forte, **não revisada por advogado**. O CDC (Lei 8.078/90)
  é de ordem pública — não dá para negar por contrato o arrependimento de 7 dias de quem age
  de boa-fé; a estratégia antifraude ataca só a **má-fé** (comprar, baixar e estornar p/ ficar
  com os arquivos) via revogação de licença + violação de direitos autorais.

---

## 10. Pendências / TODO

- [x] ~~Confirmar como a Kiwify libera os apps~~ — curso 1 aula/dia por 7 dias + app no 8º
      dia, nos dois produtos (Kenzo, 2026-09-13); nota de transparência de volta nas páginas.
- [ ] **Mac e Linux nas páginas dos apps** quando o Kenzo testar numa máquina real.
- [ ] (Opcional) **Capturas de tela dos apps** nas páginas — sem mostrar nome de canal nem chaves.
- [ ] **Blocos de comunidade viram botão** com o convite `https://discord.gg/aDYgBns94`
      (o bloco de link do Discord na home já usa esse convite).
- [ ] **Imagens** em `assets/`: `perfil.jpg` e as capas dos produtos (hoje há
      placeholders/anéis). Ver `assets/LEIA-ME.md`. (`og-cover.jpg` feita em 2026-07-19.)
- [x] ~~Meta `og:image`~~ — `og-cover.jpg` criada e og:url/og:image da home corrigidos (2026-07-19).
- [ ] **GoatCounter**: criar conta gratuita em goatcounter.com com o código `kenzonakagawa`
      e descomentar o script nas 4 páginas (snippet já está lá, comentado).
- [x] ~~Prova social~~ — vídeos reais embutidos nas 2 páginas (seção `#exemplo`, logo
      depois de `#app`): `assets/exemplo-cortes.mp4` (Short 45s, 1,5 MB) e
      `assets/exemplo-videos.mp4` (trecho de 75s em 720p, ~17 MB — o original de 9 min
      tinha 168 MB, acima do limite de 100 MB do GitHub). `preload="metadata"` + poster
      jpg = a página segue leve; o vídeo só baixa no play (2026-08-03).
- [ ] **Salesforce Marketing Cloud**: sair de "Em breve" quando lançar (tem CTA de compra a criar).
- [ ] **Revisão jurídica** dos Termos (Seções 8 e 9) e, se abrir **MEI/CNPJ**, trocar a
      identificação do fornecedor de CPF para CNPJ. Levar a pergunta: com o app liberado só
      no 8º dia, de quando conta o arrependimento de 7 dias? A Seção 8 diz "da compra ou do
      recebimento do acesso, o que ocorrer por último" e o art. 49 do CDC fala em
      "recebimento do produto".
- [ ] Avaliar **Política de Privacidade** separada (hoje LGPD resumida na Seção 17 dos Termos).
- [ ] (Opcional) frase de "possibilidade de renda, não garantia" nas páginas de automação — pendente de decisão.

---

_Última atualização deste contexto: 2026-09-13._
