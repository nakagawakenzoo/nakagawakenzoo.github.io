# BRIEFING — Página pessoal: produtos + link-in-bio (substitui o Linktree)

## Objetivo

Criar um site estático de uma página que cumpre DOIS papéis:

1. **Landing page dos meus produtos digitais** — cada produto leva à sua página de compra (Kiwify ou link de afiliado).
2. **Link-in-bio** — este site vai substituir o Linktree na bio do meu Instagram, então precisa também listar meus canais e lojas de forma rápida e bonita no celular.

Publicação no **GitHub Pages** (repositório `<USUARIO>.github.io`), portanto 100% estático: HTML + CSS + JS puro, sem build tools, sem backend. A MAIOR PARTE do tráfego vem da bio do Instagram = **mobile-first é obrigatório**.

## Sistema de cores por produto (feature central do design)

O site tem tema dark fixo, mas a **cor de destaque muda conforme o produto** com que o visitante interage:

- Implementar com **CSS custom properties** (ex.: `--accent`, `--accent-soft`, `--accent-glow`) definidas no `:root` e trocadas via JS.
- Cada card de produto tem um atributo `data-accent`. Ao passar o mouse (desktop) ou tocar/entrar na viewport (mobile), a cor de destaque global da página faz transição suave (~400ms) para a cor daquele produto: botões, glows, bordas, anéis decorativos, tudo acompanha.
- Cor padrão da página (estado inicial): violeta.

| Produto | Cor de destaque | Hex sugerido |
|---|---|---|
| Automação de Cortes (Shorts) | Violeta | `#8b5cf6` (claro `#a78bfa`) |
| Automação de Vídeos (vídeos longos) | Verde esmeralda neon | `#10b981` (claro `#34d399`) |
| Curso AUVP (investimentos) | Amarelo | `#facc15` (claro `#fde047`) |
| Curso Salesforce Marketing Cloud | Azul | `#38bdf8` (claro `#7dd3fc`) |

Cada card usa a própria cor na borda, no badge e no botão, mesmo sem hover — a página inteira só "muda de humor" na interação.

## Produtos (4 cards)

1. **Automação de Vídeos** — Canal Dark de IA no YouTube (produto principal, card em destaque). [VERDE]
   - Descrição: "Um canal dark publicando 1 vídeo por dia sozinho: roteiro, narração, legendas, cenas, música, thumbnail e agendamento — 100% automático com IA."
   - Bullets: fluxo pronto para importar (n8n) · instalador automático · manual passo a passo (PDF) · aula de configuração em vídeo.
   - CTA: "Quero minha fábrica de vídeos" → `[LINK_KIWIFY_VIDEOS]`
   - Badge: "Mais vendido"

2. **Automação de Cortes** — Shorts para YouTube no piloto automático. [VIOLETA]
   - Descrição: "Transforme vídeos longos em cortes virais (9:16) publicados automaticamente. Sem editor, sem edição manual."
   - CTA: "Quero automatizar meus cortes" → `[LINK_KIWIFY_CORTES]`
   - Badge: "Disponível"

3. **Curso de Investimentos AUVP** — do Raul Sena (Investidor Sardinha). Sou afiliado/indicador. [AMARELO]
   - Descrição: "Aprenda a investir do zero com a AUVP, a escola de investimentos do Investidor Sardinha. Indicação minha — é por onde eu aprendo a cuidar do meu dinheiro."
   - CTA: "Conhecer a AUVP" → usar EXATAMENTE o link da AUVP da seção "Links reais" abaixo (copiar e colar, o parâmetro `indicacao` não pode ser alterado)
   - Badge: "Indicação"
   - Nota pequena no card: "link de indicação"

4. **Curso Salesforce Marketing Cloud** — em produção. [AZUL]
   - Descrição: "Domine a maior plataforma de marketing cloud do mercado. Do zero ao avançado."
   - CTA desabilitado: "Em breve" + botão secundário "Me avise no lançamento" → `[LINK_INSTAGRAM]`
   - Badge: "Em breve" (card com opacidade levemente reduzida, mas ainda participa do sistema de cores)

## Seção link-in-bio: "Meus canais e lojas"

Grid de botões compactos (estilo Linktree, mas no visual do site), cada um com ícone SVG inline monocromático que herda a cor de destaque atual. Dois grupos:

**Conteúdo:**
- TikTok → https://tiktok.com/@kenzonakagawa
- YouTube → https://www.youtube.com/@naka_z0
- Kick (lives) → https://kick.com/kenzoonakagawa
- Instagram → `[LINK_INSTAGRAM]`

**Minhas lojas / recomendações:**
- Amazon → https://www.amazon.com.br/shop/kenzonakagawa_
- Mercado Livre → https://meli.la/2eB33vZ
- Shopee → https://s.shopee.com.br/9KfiJU8k7n

Todos com `target="_blank" rel="noopener"`. No mobile, essa seção deve estar a no máximo um scroll do topo (visitante de bio quer link rápido).

## Links reais (copiar e colar EXATAMENTE — não reescrever)

```
AUVP:          https://form.auvp.com.br/to/DSo4JgH8?indicacao=a2Vuem8ubmFrYWdhd2FAYXV2cC5jb20uYnI=
Amazon:        https://www.amazon.com.br/shop/kenzonakagawa_
Mercado Livre: https://meli.la/2eB33vZ
Shopee:        https://s.shopee.com.br/9KfiJU8k7n
TikTok:        https://tiktok.com/@kenzonakagawa
YouTube:       https://www.youtube.com/@naka_z0
Kick:          https://kick.com/kenzoonakagawa
```

## Identidade visual

Estética "dark tech premium":

- **Fundo**: quase-preto arroxeado `#0d0b14` (variações `#070510`, `#100c1c`, `#1b1430` em gradientes radiais sutis)
- **Texto**: branco `#f5f3fa` (títulos), cinza-lavanda `#b0a8c8` (parágrafos), `#6f6590` (terciário)
- **Tipografia**: Montserrat (Google Fonts, `display=swap`) — títulos Bold/ExtraBold em CAIXA ALTA com letter-spacing
- **Decoração**: anéis/círculos concêntricos com stroke na cor de destaque atual, opacidade 8–12%, animação lenta; glow suave em botões e cards
- **Cards**: fundo `#14101f`, borda 1px na cor do produto a 25% de opacidade, cantos 16px, hover eleva com glow
- **Botões CTA**: fundo na cor do produto, texto escuro ou branco conforme contraste (no amarelo, texto escuro!), cantos 12px, hover com glow + leve scale
- Layout limpo, muito espaço negativo

## Estrutura da página (ordem)

1. **Header fixo** — nome/marca `[SUA_MARCA]` + âncoras (Produtos · Links · FAQ). Fundo translúcido com blur ao rolar.
2. **Hero compacto** — foto/avatar redondo `[FOTO_PERFIL]`, nome, 1 linha de bio ("Automações, conteúdo e tecnologia"), 2 botões: "Ver produtos" (âncora) e "Meus links" (âncora). Hero curto — não é para ocupar a tela inteira no mobile.
3. **Produtos** (`#produtos`) — grid responsivo com os 4 cards e o sistema de cores.
4. **Meus canais e lojas** (`#links`) — a seção link-in-bio.
5. **Como funciona** (das automações) — 3 passos: configura uma vez → produz e publica sozinha → você acompanha e escala. Ícones SVG inline.
6. **FAQ** — accordion JS puro: "Preciso saber programar?" (não — manual + instalador + aula) · "Funciona no meu computador?" (Windows 10/11) · "Tem custo além do produto?" (sim, ~US$ 14/mês em ferramentas de IA) · "Tem garantia?" (7 dias, padrão Kiwify) · "A renda é garantida?" (não — resultado depende de consistência e das regras das plataformas).
7. **Disclaimer** — resultados não garantidos; produtos educacionais/ferramentas; o link da AUVP é indicação de afiliado; marcas citadas pertencem aos respectivos donos.
8. **Footer** — marca, e-mail `[EMAIL_SUPORTE]`, ano dinâmico.

## Requisitos técnicos

- Mobile-first, responsivo, Lighthouse 90+ (sem libs pesadas; ícones = SVG inline, nunca font-awesome via CDN pesado)
- SEO + Open Graph (og:title, og:description, og:image) — o link será compartilhado no Instagram/WhatsApp
- Acessibilidade: contraste (cuidado especial com o amarelo — usar texto escuro sobre amarelo), `alt`, foco visível, `prefers-reduced-motion` para desligar animações
- Links externos com `target="_blank" rel="noopener"`
- Pasta `assets/` para imagens (usar placeholders com gradiente + nome até eu subir as capas)
- Favicon: olho minimalista SVG (violeta sobre fundo escuro)

## Deploy (me guiar ao final)

1. Repositório público `<USUARIO>.github.io`, site na raiz da branch `main`
2. Settings → Pages → Deploy from branch `main` / root
3. Confirmar em `https://<USUARIO>.github.io`

## Placeholders que EU preencho depois (marcar com `<!-- TODO -->`)

- `[SUA_MARCA]`, `[FOTO_PERFIL]`, `[LINK_KIWIFY_VIDEOS]`, `[LINK_KIWIFY_CORTES]`, `[LINK_INSTAGRAM]`, `[EMAIL_SUPORTE]`, imagens em `assets/`

## Tom de copy

Direto, confiante e honesto. PROIBIDO promessa de ganho ("ganhe R$ X/mês"). Ângulo: automação real, economia de tempo, sistema que produz sozinho. Português do Brasil, frases curtas.
