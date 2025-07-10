
# dbarbieri-react-ui

Biblioteca de componentes React com foco em reutilização e estilo moderno. Desenvolvida com TypeScript e suporte a CSS Modules.

## 📦 Instalação

```bash
npm install dbarbieri-react-ui
# ou
yarn add dbarbieri-react-ui
````

## 🚀 Uso

```tsx
import { Label, InputMarkdown, Markdown } from 'dbarbieri-react-ui';
```

### Exemplo com `InputMarkdown`

```tsx
import { InputMarkdown } from 'dbarbieri-react-ui';

<InputMarkdown
  label="Conteúdo em Markdown"
  value={value}
  onChange={({ text }) => setValue(text)}
/>
```

### Exemplo com `Markdown`

```tsx
import { Markdown } from 'dbarbieri-react-ui';
import 'dbarbieri-react-ui/styles/markdown.css'; // ⚠️ Importação obrigatória!

<Markdown>
  {`# Título\n\n**Texto em negrito** e _itálico_.`}
</Markdown>
```

## ⚠️ Importação de Estilos

Para usar o componente `Markdown` (visualização de Markdown renderizado), é necessário importar os estilos globais associados ao editor Markdown:

```tsx
import 'dbarbieri-react-ui/styles/markdown.css';
```

Esse CSS inclui os estilos necessários da biblioteca `react-markdown-editor-lite`.

> ⚠️ Se você estiver usando `InputMarkdown`, **não precisa importar nada** — os estilos são carregados automaticamente!