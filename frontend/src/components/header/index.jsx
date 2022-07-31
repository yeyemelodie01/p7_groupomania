import { Link } from 'react-router-dom'
import Logo from '../../assets/icon-left-font.png'
import styled from 'styled-components'
import useModal from '../../utils/hooks'
import Modal from '../../components/modal'
import React from 'react'

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
    const { isShow: isLoginFormShow, toggle: toggleLoginForm } = useModal();
    const { isShow: isRegistrationForm, toggle: toggleRegistrationForm} = useModal();


    return(
      <>
        <Headerstyle>
            <Navstyle>
                <Linkimg to="/">
                    <Imgstyle src={ Logo } alt="Logo Groupomania"/>
                </Linkimg>
                <Divstyle>
                    <Linkstyle to="/" className="modal-toggle" onClick={toggleLoginForm}>Se connecter </Linkstyle>
                    <Spanstyle>|</Spanstyle>
                    <Linkstyle to="/" className="modal-toggle" onClick={toggleRegistrationForm}>S'inscrire</Linkstyle>
                </Divstyle>
            </Navstyle>
        </Headerstyle>
        <Modal
          isShow={isLoginFormShow}
          hide={toggleLoginForm}
          title="Login">

            <form>
                <div className="form-group">
                    <input type="text" placeholder="Username" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Password" />
                </div>
                <div className="form-group">
                    <input type="submit" placeholder="Login" />
                </div>
            </form>
        </Modal>
          <Modal
            isShow={isRegistrationForm}
            hide={toggleRegistrationForm}
            title="Register">

              <form>
                  <div className="form-group">
                      <input type="text" placeholder="Email" />
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Username" />
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Password" />
                  </div>
                  <div className="form-group">
                      <input type="submit" placeholder="Register" />
                  </div>
              </form>
          </Modal>

        <style jsx="true">
            {`
                button.modal-toggle,
                input[type="submit"] {
                  background-color: turquoise;
                  cursor: pointer;
                  padding: 1rem 2rem;
                  text-transform: uppercase;
                  border: none;
                }
        
                button.modal-toggle:not(:first-child) {
                  margin-left: 10px;
                }
        
                .form-group {
                  margin-top: 10px;
                }
        
                input[type="text"],
                input[type="password"],
                input[type="email"] {
                  box-sizing: border-box;
                  width: 100%;
                  padding: 0.5rem 0.7rem;
                }
            `}
        </style>
      </>
    )
}

export default Header
