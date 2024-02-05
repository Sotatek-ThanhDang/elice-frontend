import { lazy, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; //1 rem = 10px; 10px/16px = 62.5%
    scroll-behavior: smooth;
  }
`;

const CodeEditer = lazy(() => import('@pages/code-editor'));

function App() {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <CodeEditer />
      <GlobalStyle />
    </Suspense>
  );
}

export default App;
