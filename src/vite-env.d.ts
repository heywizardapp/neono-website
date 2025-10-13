/// <reference types="vite/client" />

// Markdown file imports
declare module '*.md' {
  const content: string;
  export default content;
}
