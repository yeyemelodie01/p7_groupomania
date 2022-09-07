import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Logo from '../../assets/icon-left-font.png'
import styled from 'styled-components'
import useModal from '../../utils/hooks'
import Modal from '../../components/modal'



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
    const { register, handleSubmit} = useForm();


    const onSignup = async (data) => {
        axios
          .post("http://localhost:4000/api/auth/signup", data)
          .then(() =>{
              axios
                .post("http://localhost:4000/api/auth/login", data)
                .then((res) => {
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token);
                    const userEmail = data.email;
                    const ArrayUser = userEmail.split('@', 1);
                    const username = String(ArrayUser);
                    console.log(username,"est","connecter")
                })
                .catch((err) => {
                    console.log(err);
                });
          })
          .catch((err) => {
            console.log(err)
        })
    }

    const onLogin = async (data) => {
        axios
          .post("http://localhost:4000/api/auth/login", data)
          .then((res) => {
              localStorage.clear();
              localStorage.setItem("token", res.data.token);
              const userEmail = data.email;
               const ArrayUser = userEmail.split('@', 1);
               const username = String(ArrayUser);
              console.log(username,"est","connecter")
          })
          .catch((err) => {
              console.log(err);
          });
    }

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
          title="Se connecter">

            <form onSubmit={handleSubmit(onLogin)}>
                <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      {...register("email")}
                    />
                </div>
                <div className="form-group">
                    <input
                      type="text"
                      placeholder="Password"
                      required
                      {...register("password")}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" placeholder="Se connecter" onClick={() => {

                    }} />
                </div>
            </form>
        </Modal>
          <Modal
            isShow={isRegistrationForm}
            hide={toggleRegistrationForm}
            title="S'inscrire">

              <form onSubmit={handleSubmit(onSignup)}>
                  <div className="form-group">
                      <input
                        type="text"
                        placeholder="Email"
                        required
                        {...register("email")}
                      />
                  </div>
                  <div className="form-group">
                      <input
                        type="text"
                        placeholder="Mot de Passe"
                        required
                        {...register("password")}
                      />
                  </div>
                  <div className="form-group">
                      <input
                        type="submit"
                        placeholder="Envoyer"
                        onClick={() => {

                        }}
                      />
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
