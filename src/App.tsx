import { lazy, Suspense } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { useAppSelector } from '@/store';
import { selectAppTheme } from '@/store/common/common.selector';
import { darkTheme, lightTheme } from '@/theme';

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
    font-family: "Roboto", sans-serif;
  }

  body {
    min-height: 100vh;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s;
  }
`;

const CodeEditer = lazy(() => import('@pages/code-editor'));

function App() {
  const theme = useAppSelector(selectAppTheme);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Suspense fallback={<h1>Loading....</h1>}>
        <CodeEditer />
      </Suspense>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
