# Amigo Secreto | Secret Santa

## 🇧🇷 Português

App de sorteio de amigos secretos desenvolvido com **HTML, CSS e JavaScript vanilla**. Algoritmo circular shift garante que ninguém sorteie a si mesmo, com persistência localStorage, modo escuro e acessibilidade ARIA.

## 🇺🇸 English

Secret Santa drawing app built with **vanilla HTML, CSS, and JavaScript**. Circular shift algorithm ensures nobody draws themselves, with localStorage persistence, dark mode, and ARIA accessibility.

---

**🔗 Demo** → [amigo-secreto.vercel.app](https://amigo-secreto.vercel.app)

---

## ✨ Features | Funcionalidades

| Feature | Descrição | Description |
|---------|-----------|-------------|
| 🎲 Sorteio seguro | Algoritmo circular shift, ninguém sorteia a si mesmo | Circular shift, no self-draw |
| 💾 Persistência | Lista salva em localStorage | Saved to localStorage |
| 🌙 Modo escuro | Toggle dark/light com detecção automática | Dark/light toggle, system detection |
| 🖼️ Modal customizado | Overlay acessível com ARIA | Accessible overlay dialog |
| ♿ Acessibilidade | ARIA labels, contraste WCAG, prefers-reduced-motion | ARIA labels, WCAG contrast |
| 🔍 SEO | Open Graph, Twitter Cards, JSON-LD, sitemap.xml | Meta tags, structured data |
| 📱 Responsivo | Layout adaptável mobile e desktop | Responsive layout |

---

## 🛠️ Tech Stack | Pilha Tecnológica

| Camada / Layer | Tecnologia / Technology |
|----------------|------------------------|
| Markup | HTML5 semântico / Semantic HTML5 |
| Estilo / Style | CSS3 com Design Tokens (variáveis) |
| Lógica / Logic | JavaScript vanilla (ES6+, IIFE) |
| Fontes | DM Sans + Playfair Display (Google Fonts) |
| Ícones / Icons | SVG inline |
| Deploy | Vercel |

---

## 🚀 How to Use | Como Usar

1. Digite o nome de um participante / Enter a participant name
2. Clique "Adicionar" ou pressione Enter / Click "Add" or press Enter
3. Repita para todos / Repeat for all participants
4. Clique "Sortear amigo" / Click "Draw" to see pairs
5. Use o botão sol/lua para alternar tema / Use sun/moon button to toggle theme

---

## 📁 Structure | Estrutura

`
amigo_secreto/
├── index.html          # Entry point with SEO meta tags
├── style.css           # Design system with dark mode
├── app.js              # Application logic (IIFE)
├── robots.txt          # Crawler rules
├── sitemap.xml         # Search engine sitemap
├── assets/
│   ├── amigo-secreto.png
│   └── play_circle_outline.png
└── README.md
`

---

## 🧠 Concepts Applied | Conceitos Aplicados

- **CSS Design Tokens** — cores, sombras, border-radius e fontes como variáveis
- **Dark mode via CSS** — classe .dark no body alterna variáveis
- **IIFE** — código encapsulado, zero globais
- **Event delegation** — listeners em vez de onclick inline
- **Accessibility-first** — ria-live, ria-label, ole="dialog"

---

## 💻 Local Development

Basta abrir index.html no navegador. Sem build ou servidor local.

Just open index.html in your browser. No build step or local server needed.

---

## 📬 Contact | Contato

**Marcus Lafaiete** — [GitHub](https://github.com/marcuslaf) · [LinkedIn](https://www.linkedin.com/in/marcuslaf)
