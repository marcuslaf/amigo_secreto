# Amigo Secreto

App de sorteio de amigos secretos, desenvolvido com HTML, CSS e JavaScript vanilla.

![Preview do Amigo Secreto](assets/amigo-secreto.png)

## Funcionalidades

- **Sorteio seguro** — Algoritmo circular shift que garante que ninguém sorteie a si mesmo
- **Persistência** — Lista salva em localStorage, persiste ao recarregar a página
- **Modo escuro** — Toggle dark/light com detecção automática da preferência do sistema
- **Modal customizado** — Confirmações e notificações com overlay acessível
- **Acessibilidade** — Labels ARIA, contraste WCAG, `prefers-reduced-motion`
- **SEO** — Meta tags Open Graph, Twitter Cards, JSON-LD, sitemap.xml
- **Responsivo** — Layout adaptável para mobile e desktop

## Como Usar

1. Digite o nome de um participante no campo de texto
2. Clique em "Adicionar" ou pressione `Enter`
3. Repita para todos os participantes
4. Clique em "Sortear amigo" para ver os pares
5. Use o botão de sol/lua no canto superior para alternar o tema

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Markup | HTML5 semântico |
| Estilo | CSS3 com Design Tokens (variáveis) |
| Lógica | JavaScript vanilla (ES6+, IIFE) |
| Fontes | DM Sans + Playfair Display (Google Fonts) |
| Ícones | SVG inline |
| Deploy | Vercel |

## Estrutura

```
amigo_secreto/
├── index.html          # Entry point com meta tags SEO
├── style.css           # Design system com dark mode
├── app.js              # Lógica da aplicação (IIFE)
├── robots.txt          # Regras para crawlers
├── sitemap.xml         # Sitemap para motores de busca
├── assets/
│   ├── amigo-secreto.png
│   └── play_circle_outline.png
└── README.md
```

## Conceitos Aplicados

- **CSS Design Tokens** — Todas as cores, sombras, border-radius e fontes são variáveis
- **Dark mode via CSS** — Classe `.dark` no body alterna todas as variáveis
- **IIFE** — Código encapsulado, zero variáveis globais
- **Event delegation** — Listeners em vez de `onclick` inline
- **Accessibility-first** — `aria-live`, `aria-label`, `role="dialog"`, `prefers-reduced-motion`

## Local Development

Basta abrir `index.html` no navegador. Não há necessidade de build ou servidor local.

## Autor

Marcus Lafaiete

---

<div align="center">
Feito com carinho
</div>
