# dbarbieri-react-ui

A React component library focused on reusability and modern styling. Built with TypeScript and CSS Modules support.

## 📦 Installation

```bash
npm install dbarbieri-react-ui
# or
yarn add dbarbieri-react-ui
````

## 🚀 Usage

```tsx
import { Label, InputMarkdown, Markdown } from 'dbarbieri-react-ui';
```

### Example with `InputMarkdown`

```tsx
import { InputMarkdown } from 'dbarbieri-react-ui';

<InputMarkdown
  label="Markdown Content"
  value={value}
  onChange={({ text }) => setValue(text)}
/>
```

### Example with `Markdown`

```tsx
import { Markdown } from 'dbarbieri-react-ui';
import 'dbarbieri-react-ui/styles/markdown.css'; // ⚠️ Required import!

<Markdown>
  {`# Title\n\n**Bold text** and _italic_.`}
</Markdown>
```

## ⚠️ Style Import

To use the `Markdown` component (which renders Markdown content as HTML), you must manually import the required global styles from the markdown editor:

```tsx
import 'react-markdown-editor-lite/lib/index.css';
```

This CSS includes necessary styles from the `react-markdown-editor-lite` package.

> ⚠️ If you're using `InputMarkdown`, **you don't need to import anything** — the styles are loaded automatically!

## 🎨 Theme Customization

Some colors used in the components can be customized globally by defining CSS variables in your app. To do this, create a `global.css` (or similar) and include it in your project:

```css
:root {
  --color-primary: #0000FF;
  --color-secondary: #000000;

  --color-dark: #222;
  --color-light: #ffffff;
  --color-gray: #bfbfbf;

  --color-success: #2E7D32;
  --color-success-light: #C8E6C9;
  --color-error: #C62828;
  --color-error-light: #FFCDD2;
  --color-warning: #ED6C02;
  --color-warning-light: #FFE0B2;
}
```