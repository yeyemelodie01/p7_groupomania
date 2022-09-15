import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const Styleglobal = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif;
  }
  
  body {
    margin: 0;
    text-align: center;
    color: ${colors.tertiary};
  }
  
  img {
    width: 100%;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: ${colors.black};
  }

  main {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`

function GlobalStyle() {
    return(
        <Styleglobal />
    )
}

export default GlobalStyle
