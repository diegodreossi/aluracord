//Arquivo que envolve todas as outras páginas do projeto
//o next.js é o mecanismo que permite que o _app.js seja lido primeiro
//pois é o lugar onde o CSS global está

function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
            flex: 1;
          }
        #__next > * {
            flex: 1;
          }
        /* ./App fit Height */ 
      `}</style>
    );
}

export default function MyApp({Component, pageProps}){
  
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps}/>
        </>
    
    );
}