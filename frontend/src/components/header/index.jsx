import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Logo from '../../assets/icon-left-font.png'
import '../../utils/styles/header.css'
import useModal from '../../utils/hooks/usemodal'
import Modal from '../../components/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'


function Header() {
    const { isShow: isLoginFormShow, toggle: toggleLoginForm } = useModal();
    const { isShow: isRegistrationForm, toggle: toggleRegistrationForm } = useModal();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ showBurger, setShowBurger ] = useState(false)

  function setUserDetails (data, res) {
    const userEmail = data.email;
    const ArrayUser = userEmail.split('@', 1);
    const username = String(ArrayUser);
    localStorage.setItem('user', JSON.stringify({
      '_id': res.data.userId,
      'email': data.email,
      'userName': username,
      'jwt': res.data.token,
      'role': res.data.role,
    }));
  }

    const onSignup = (data) => {
      const dataUser = {
        "email": data.email,
        "password": data.password,
      }
        axios
          .post("http://localhost:4000/api/auth/signup", dataUser )
          .then(() => {
              axios
                .post("http://localhost:4000/api/auth/login", data )
                .then((res) => {
                  setUserDetails(data, res);
                  window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
          })
          .catch((err) => {
            console.log(err)
        })
    }

    const onLogin = (data) => {
        axios
          .post("http://localhost:4000/api/auth/login", data )
          .then((res) => {
            setUserDetails(data, res);
            window.location.reload();
          })
          .catch((err) => {
            document.getElementById('LogErr').innerHTML = "Email et/ou mots de passe incorrecte";
            console.log(err)
          });
    }

    function Logout() {
      localStorage.clear();
      window.location.href='/';
    }

  let userDetails = JSON.parse(localStorage.getItem('user'));

    if (userDetails === null) {
      if (isLoginFormShow) {
        return (
          <>
            <Modal
              isShow={isLoginFormShow}
              hide={toggleLoginForm}
              title="Se connecter">
              <form onSubmit={handleSubmit(onLogin)}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="emailError"
                    {...register("email", {
                      required:"Email requis",
                    })}
                  />
                </div>
                <div className="formGroup">
                  <input
                    type="password"
                    placeholder="Mot de Passe"
                    className="passwordError"
                    {...register("password", {
                      required:"Mot de Passe requis",
                    })}
                  />
                  <span id="LogErr" className="error"></span>
                </div>
                <div className="formGroup">
                  <input type="submit" placeholder="Envoyer"/>
                </div>
              </form>
            </Modal>
          </>
        )}
      if (isRegistrationForm) {
        return (
          <>
            <Modal
              isShow={isRegistrationForm}
              hide={toggleRegistrationForm}
              title="S'inscrire">
              <form onSubmit={handleSubmit(onSignup)}>
                <div className="formGroup">
                  <input
                    type="email"
                    placeholder="Email"
                    className="emailError"
                    {...register("email", {
                      required:"Email requis",
                      pattern:{
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:"Email non valide"
                      }
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <div className="error">{errors.email.message}</div>}
                </div>
                <div className="formGroup">
                  <input
                    type="password"
                    placeholder="Mot de Passe"
                    className="passwordError"
                    {...register("password",{
                      required: "Mot de passe requis",
                      pattern:{
                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,10}$/,
                        message:"Mot de passe non valide, 6 characters, Une majuscule, une minuscule, un nombre et un caractère spécial",
                      }
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password && <div className="error">{ errors.password.message }</div>}
                </div>
                <div className="formGroup">
                  <input
                    type="submit"
                    placeholder="Envoyer"
                  />
                </div>
              </form>
            </Modal>
          </>
        )
      }
      return (
        <>
          <header>
            <nav className="navBar">
              <a className="linkImg" href="/">
                <div>
                  <img className="styleImg" src={ Logo } alt="Logo Groupomania"/>
                </div>
              </a>
              <div className={ showBurger ? "divStyle expand" : "divStyle"}>
                <ul className="divLink">
                  <li className="modal-toggle linkStyle" onClick={toggleLoginForm}>Se connecter </li>
                  <li><span>|</span></li>
                  <li className="modal-toggle linkStyle" onClick={toggleRegistrationForm}>S'inscrire</li>
                </ul>
              </div>
              <div className="buttonBurger" onClick={() => {
                setShowBurger(!showBurger);
              }}>
                <FontAwesomeIcon icon={ faBars } />
              </div>
            </nav>
          </header>
        </>
      )
    } else {
      return ( <header>
              <nav className="navBar">
                <a className="linkImg" href="/">
                  <div>
                    <img className="styleImg" src={ Logo } alt="Logo Groupomania"/>
                  </div>
                </a>
                <div className={ showBurger ? "divStyle expand" : "divStyle"}>
                  <ul className="divLink">
                    <li className="textUser">
                      <p>Bienvenue { userDetails.userName }</p>
                    </li>
                    <li><span>|</span></li>
                    <li className="liUser">
                      <button className="buttonHeader" onClick={ Logout }>Déconnecter</button>
                    </li>
                  </ul>
                </div>
                  <div className="buttonBurger" onClick={() => {
                    setShowBurger(!showBurger);
                  }}>
                    <div>
                      <img className="imgProfil" src={ `https://ui-avatars.com/api/?name=${userDetails.userName}` } alt="profil"/>
                    </div>
                  </div>
              </nav>
            </header>
      )}

}

export default Header
