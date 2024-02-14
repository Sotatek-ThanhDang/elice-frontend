export const lightTheme = {
  body: '#ffffff',
  text: '#24292e',
  border: '#dddddd',
  backgroundFolderHover: 'lightblue',
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  body: '#24292e',
  text: '#f6f8fa',
  border: '#676768',
  backgroundFolderHover: 'darkgray',
} as const;
