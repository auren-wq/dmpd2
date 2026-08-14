# Método DMDP — Landing page institucional

Site estático de página única, sem frameworks e sem dependências de build.

## Estrutura

```
DMDPSITE/
├─ index.html                    Landing page (página única, navegação por âncoras)
├─ politica-de-privacidade.html  Página de apoio (LGPD)
├─ assets/
│  ├─ css/styles.css             Folha de estilo única
│  ├─ js/main.js                 Menu mobile, animações, header em rolagem
│  └─ img/
│     ├─ logo.svg                Reconstrução vetorial do logotipo (usada como fallback)
│     └─ favicon.svg             Ícone da aba
└─ .claude/launch.json           Configuração de preview local
```

## ⚠️ Logotipo oficial — ação necessária

O arquivo do logotipo oficial não estava presente na pasta do projeto. O site funciona hoje com
uma **reconstrução vetorial** (`assets/img/logo.svg`), que se aproxima do original mas não é o
arquivo oficial.

Para usar o logotipo oficial, basta salvar o arquivo como:

```
assets/img/logo.png
```

O HTML já aponta para esse caminho e cai automaticamente no SVG caso o PNG não exista — nenhuma
alteração de código é necessária. Recomenda-se um PNG quadrado com fundo transparente, cerca de
600×600 px.

## Rodar localmente

```bash
python -m http.server 5173
```

Depois abra `http://localhost:5173`.

## Publicação

Basta enviar todos os arquivos para qualquer hospedagem estática (Hostinger, Netlify, Vercel,
GitHub Pages, cPanel). Não há back-end, banco de dados ou etapa de compilação.

Após definir o domínio definitivo, atualize em `index.html`:

- a tag `<link rel="canonical">`;
- a meta `og:image`, que deve usar uma URL absoluta (ex.: `https://seudominio.com.br/assets/img/logo.png`);
- o campo `logo` do bloco JSON-LD.

## Paleta

| Uso | Cor |
|---|---|
| Azul institucional | `#1F4360` |
| Verde sálvia | `#86AB8D` |
| Cinza | `#7A8B99` |
| Branco | `#FFFFFF` |
| Cinza gelo | `#F7F9FA` |
| Texto principal | `#222222` |

Para **texto pequeno**, a folha de estilo usa variantes escurecidas da mesma família
(`--verde-texto: #4E7059`, `--cinza-texto: #5A6B79`, `--cinza-suave: #63737F`). O verde sálvia e o
cinza originais alcançam apenas 2,4:1 e 3,3:1 sobre fundo claro, reprovando no WCAG AA; as
variantes ficam entre 4,6:1 e 5,6:1. As cores oficiais seguem em uso em ícones, bordas, divisores e
elementos gráficos, onde o requisito de contraste é menor.

## Contatos configurados

- WhatsApp: `5511991898206` (+55 11 99189-8206)
- E-mail: manuela.thomaz@uol.com.br

Os 8 links de WhatsApp da página já levam a mensagem pré-preenchida e codificada. Para alterar o
número, procure por `wa.me/5511991898206` em `index.html` e `politica-de-privacidade.html`.
