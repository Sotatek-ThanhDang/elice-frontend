import { AppTheme } from './src/theme/index';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
