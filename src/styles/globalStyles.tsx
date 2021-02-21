import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

body{
  
  font-family: 'Roboto', sans-serif;
  box-sizing:border-box;
  background-color:#1789FC;
  color:#333136;
}
*,::after,::before{
  box-sizing:inherit;
  font-family:inherit;
  margin: 0;
  padding: 0;
 
}
`

export default GlobalStyle
