import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../../../documentation.json';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';

setCompodocJson(docJson);

SyntaxHighlighter.registerLanguage('typescript', typescript);
