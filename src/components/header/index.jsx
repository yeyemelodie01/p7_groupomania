import { Link } from 'react-router-dom'
import Logo from '../../assets/icon-left-font.png'
import styled from 'styled-components'

const Headerstyle = styled.header`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Navstyle = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Linkimg = styled(Link)`
  width: 30%;
  display: flex;
  padding-left: 20px;
`

const Imgstyle = styled.img`
  width: 53%;
`

const Linkstyle = styled(Link)`
  font-size: 30px;
  font-weight: bold;
`

const Divstyle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 35px;
  width: 30%;
  justify-content: space-around;
`

const Spanstyle = styled.span`
  font-size: 50px;
`

function Header() {
    return(
        <Headerstyle>
            <Navstyle>
                <Linkimg to="/">
                    <Imgstyle src={ Logo } alt="Logo Groupomania"/>
                </Linkimg>
                <Divstyle>
                    <Linkstyle to="/">Accueil</Linkstyle>
                    <Spanstyle>|</Spanstyle>
                    <Linkstyle to="/login">Se connecter </Linkstyle>
                    <Spanstyle>|</Spanstyle>
                    <Linkstyle to="/signup">S'inscrire</Linkstyle>
                </Divstyle>
            </Navstyle>
        </Headerstyle>
    )
}

export default Header
