import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Logo from '../../assets/icon-left-font.png'
import '../../utils/styles/header.css'
import useModal from '../../utils/hooks'
import Modal from '../../components/modal'
//import authLog from '../../utils/auth'

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

    // const onLogin = (e) => {
    //   e.preventDefault();
    //   authLog.login(email,password).then(
    //     () =>
    //   )
    // }
    const onLogin = async (data) => {
        axios
          .post("http://localhost:4000/api/auth/login", data)
          .then((res) => {
              localStorage.clear();
              localStorage.setItem("token", res.data.token);
              const userEmail = data.email;
               const ArrayUser = userEmail.split('@', 1);
               const username = String(ArrayUser);
               localStorage.setItem("username", username);
              console.log(username,"est","connecter")
          })
          .catch((err) => {
              console.log(err);
          });
    }

    return(
      <>
          <header>
            <nav>
              <a className="linkimg" href="/">
                <div>
                  <img className="styleimg" src={ Logo } alt="Logo Groupomania"/>
                </div>
              </a>
              <div className="divstyle">
                <div className="divlink">
                  <div className="modal-toggle linkstyle" onClick={toggleLoginForm}>Se connecter </div>
                  <span>|</span>
                  <div className="modal-toggle linkstyle" onClick={toggleRegistrationForm}>S'inscrire</div>
                </div>
              </div>
            </nav>
          </header>
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
                      type="password"
                      placeholder="Mot de Passe"
                      required
                      {...register("password")}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" placeholder="Se connecter" onClick={() => {
                      //handleLogin();
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
                        type="password"
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
