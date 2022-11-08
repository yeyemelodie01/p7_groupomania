import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const Styleglobal = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    font-family: 'Lato', sans-serif;
  }
  
  body {
    margin: 0;
    text-align: center;
    color: ${colors.tertiary};
  }
  
  img {
    object-fit: contain;
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
  
  li {
    list-style: none;
  }
`

function GlobalStyle() {
    return(
        <Styleglobal />
    )
}

export default GlobalStyle
