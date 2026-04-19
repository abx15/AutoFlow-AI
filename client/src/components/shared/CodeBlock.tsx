import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from './CopyButton';

export function CodeBlock({ code, language }: { code: string, language: string }) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-surface-border">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} className="bg-surface-muted/50 hover:bg-surface-muted" />
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1rem', background: '#111120', fontSize: '0.875rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
