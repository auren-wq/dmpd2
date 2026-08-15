# Projeto DMDP — Landing page institucional

Site estático de página única, sem frameworks e sem etapa de build.

**No ar:** https://www.dmdp.com.br
**Repositório:** https://github.com/auren-wq/dmpd2
**Hospedagem:** Vercel, projeto `metodo-dmdp`, conectado ao repositório

## Estrutura

```
DMDPSITE/
├─ index.html                    Landing page (página única, navegação por âncoras)
├─ politica-de-privacidade.html  Página de apoio (LGPD)
├─ 404.html                      Página de erro (a Vercel serve automaticamente)
├─ robots.txt                    Libera indexação e aponta o sitemap
├─ sitemap.xml                   As duas páginas indexáveis
├─ vercel.json                   Cabeçalhos de segurança e cache
├─ assets/
│  ├─ css/styles.css             Folha de estilo única
│  ├─ js/main.js                 Menu mobile, animações, header em rolagem
│  └─ img/
│     ├─ logo.png                Logotipo oficial, 400px, fundo transparente
│     ├─ logo-branco.png         Versão branca — usada na 404, de fundo azul
│     ├─ og-image.png            1200×630, prévia de link no WhatsApp e LinkedIn
│     ├─ logo.svg                Reconstrução vetorial, usada como fallback
│     └─ favicon.svg             Ícone da aba
└─ .claude/launch.json           Configuração de preview local
```

O JPEG original do logotipo fica em `assets/img/logo-original.jpeg`, fora do
repositório (listado no `.gitignore`). As três peças PNG foram derivadas dele:
o arquivo entregue tinha fundo sólido claro, sem transparência.

## Publicar alterações

O repositório está conectado à Vercel. Todo `git push` na branch `main`
republica o site sozinho, em cerca de 30 segundos.

```bash
git add -A
git commit -m "descrição da alteração"
git push origin main
```

### ⚠️ Ao mexer no CSS ou no JavaScript

Os arquivos são referenciados com número de versão:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=2">
<script src="assets/js/main.js?v=2" defer></script>
```

Se alterar `styles.css` ou `main.js`, **suba o número para `?v=3`** nos três
HTML. Sem isso, quem já visitou o site fica até uma hora com a versão antiga,
por causa do cache configurado no `vercel.json`.

## Rodar localmente

```bash
python -m http.server 5173
```

Depois abra `http://localhost:5173`.

## Paleta

| Uso | Cor |
|---|---|
| Azul institucional | `#1F4360` |
| Verde sálvia | `#86AB8D` |
| Cinza | `#7A8B99` |
| Branco | `#FFFFFF` |
| Cinza gelo | `#F7F9FA` |
| Texto principal | `#222222` |

Para **texto pequeno**, a folha de estilo usa variantes escurecidas da mesma
família (`--verde-texto: #4E7059`, `--cinza-texto: #5A6B79`,
`--cinza-suave: #63737F`). O verde sálvia e o cinza originais alcançam apenas
2,4:1 e 3,3:1 sobre fundo claro, reprovando no WCAG AA; as variantes ficam
entre 4,6:1 e 5,6:1. As cores oficiais seguem em uso em ícones, bordas,
divisores e elementos gráficos, onde o requisito de contraste é menor.

## Contato configurado

- WhatsApp: `5511991898206` (+55 11 99189-8206)
- E-mail: manuela.thomaz@uol.com.br

São 9 links de WhatsApp (8 na home, 1 na 404), com três mensagens distintas:

| Onde | Mensagem |
|---|---|
| Menu, hero, CTA final, rodapé, flutuante e 404 | `Olá! Gostaria de receber mais informações sobre o Projeto DMDP.` |
| Impacto Social e CTA final | `Olá! Acessei o site e gostaria de solicitar a proposta completa do Projeto DMDP para avaliar uma parceria de Patrocínio Institucional e Impacto Social (ESG).` |
| Para Famílias | `Olá! Gostaria de receber mais informações sobre as vagas e horários disponíveis para Orientação Parental` |

As mensagens vão codificadas na URL. Para trocar o número, procure por
`wa.me/5511991898206` nos três HTML.

## Se o domínio mudar

O endereço aparece em seis lugares e todos precisam mudar juntos:

- `canonical` em `index.html` e em `politica-de-privacidade.html`
- `og:url` e `og:image` em `index.html`
- campo `logo` do bloco JSON-LD em `index.html`
- `robots.txt` e `sitemap.xml`

A Vercel usa `www.dmdp.com.br` como endereço principal; o apex responde com
redirecionamento 308 para o `www`. As URLs canônicas devem usar o `www`.
