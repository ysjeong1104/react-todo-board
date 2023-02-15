import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './Theme';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './styles/GlobalStyle';
import { HelmetProvider,Helmet } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}> 
      <HelmetProvider>
        <Helmet>
          {/*<!--글꼴-->*/}
          <link
            type="text/css"
            media="screen"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&family=Source+Sans+Pro:wght@300&display=swap"
          />        
          <title>Todo Board </title> 
        </Helmet>
        <GlobalStyle/>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </RecoilRoot>
  
);

