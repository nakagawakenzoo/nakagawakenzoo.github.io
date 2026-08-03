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
| `index.html` | Home: header, hero, produtos (painéis diagonais), como funciona, comunidade, FAQ, disclaimer, footer (com apoio Pix). |
| `styles.css` | Folha principal: tokens (CSS custom properties), sistema de cores, header, hero + animações, painéis, FAQ, comunidade, Pix, footer. |
| `script.js` | JS da home: sistema de cor por produto, blur do header, FAQ accordion, digitação do hero, pop-up de lojas, copiar Pix, ano dinâmico. |
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

- Padrão inicial da página: **violeta**.
- `script.js` copia os `--card*` do painel ativo para os `--accent*` globais quando o
  painel entra na viewport (IntersectionObserver) ou no hover (desktop). Transição ~400ms.

---

## 5. Produtos (ordem atual na home)

Os produtos são **painéis largos sangrados com corte diagonal** (`clip-path`), empilhados,
alternando o lado de origem (zigue-zague esquerda/direita):

1. **Curso AUVP** (`yellow`, esquerda) — afiliado do Raul Sena (Investidor Sardinha).
   Badge "Indicação". Link de desconto: `https://sard.ink/AUVP-Desenvolvimento` (dá desconto
   na matrícula). Substituiu o antigo link `form.auvp.com.br/...indicacao=...`.
2. **Aeternum — Hoje na História** (`rose`, direita) — jogo autoral, **gratuito**, jogável no
   navegador. Badge "Indicação". Link com UTM de campanha. https://playaeternum.com/
3. **Automação de Cortes** (`violet`, esquerda) — **vendas ABERTAS** (trilha). Badge
   "Vendas abertas"; botão "Conhecer a trilha" → `automacao-de-cortes.html` (que converte
   para o checkout Kiwify).
4. **Automação de Vídeos** (`green`, direita) — **vendas ABERTAS** (trilha). Badge
   "Vendas abertas"; botão "Conhecer a trilha" → `automacao-de-videos.html`.
5. **Salesforce Marketing Cloud** (`blue`, esquerda) — **Em breve** (`panel-soon`): botão
   desabilitado + "Me avise no lançamento" (mailto).

> Ao reordenar/adicionar painéis, mantenha o zigue-zague: posições ímpares = `panel-left`,
> pares = `panel-right`. As variações de `clip-path` por posição estão em `styles.css`
> (`.panel-row:nth-of-type(3|4)`).

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
  agosto/2026). Preço: **R$ 597** (`.panel-price` na home, `.v-price` nas páginas).
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

- **Link-in-bio**: os canais (TikTok, YouTube, Kick, Instagram, Discord) ficam como **ícones no header**.
- **Pop-up de lojas** (afiliado): sobe ao passar da **metade** da página; oferece Amazon,
  Mercado Livre e Shopee. Fecha no X ou Esc; não reaparece na sessão (`sessionStorage`).
- **Comunidade no Discord**: bloco de destaque na home e nas duas páginas de produto, +
  item em "O que você recebe". Link de convite: `https://discord.gg/aJTsQ9AXE` (já é o
  **ícone do Discord no header**). Os blocos de comunidade ainda **não são botões
  clicáveis** (TODO) — podem virar botão com esse convite.
- **Apoio via Pix** (footer da home): chave `kenzo.nakagawa03@gmail.com` com botão "Copiar".
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
      (o ícone do Discord no header já usa esse link).
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

_Última atualização deste contexto: 2026-08-03._
