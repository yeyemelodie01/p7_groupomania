import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../assets/icon-left-font.png'
import '../../utils/styles/header.css'
import useModal from '../../utils/hooks'
import Modal from '../../components/modal'


function Header() {
    const { isShow: isLoginFormShow, toggle: toggleLoginForm } = useModal();
    const { isShow: isRegistrationForm, toggle: toggleRegistrationForm} = useModal();
    const { register, handleSubmit} = useForm();
    const notify = () => toast("Wow trop facile");

  function setUserDetails (data, res) {
    const userEmail = data.email;
    const ArrayUser = userEmail.split('@', 1);
    const username = String(ArrayUser);
    localStorage.setItem('user', JSON.stringify({
      '_id': res.data.userId,
      'email': data.email,
      'userName': username,
      'jwt': res.data.token
    }));
  }

    const onSignup = async (data) => {
        axios
          .post("http://localhost:4000/api/auth/signup", data)
          .then(() =>{
              axios
                .post("http://localhost:4000/api/auth/login", data)
                .then((res) => {
                  localStorage.clear();
                  setUserDetails(data, res);
                  window.location.href='/';
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
            setUserDetails(data, res);
            window.location.href='/';
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function Logout(){
      localStorage.clear();
      window.location.href='/';
    }


  let userDetails = JSON.parse(localStorage.getItem('user'));

    if(userDetails === null) {
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
                  type="email"
                  placeholder="Email"
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
                <input type="submit" placeholder="Se connecter" onClick={notify}/>
                <ToastContainer />
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
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Mot de Passe"
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
                  background-color: #091F43FF;
                  color: #fff;
                  cursor: pointer;
                  padding: 7px 10px;
                  text-transform: uppercase;
                  border-radius: 3px;
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
                  width: 72%;
                  padding: 0.5rem 0.7rem;
                  border-radius: 3px;
                  border: 2px #091F43FF solid;
                  font-size: 13.4px;
                }
            `}
          </style>
        </>
      )
    } else {
      return <header>
              <nav>
                <a className="linkimg" href="/">
                  <div>
                    <img className="styleimg" src={ Logo } alt="Logo Groupomania"/>
                  </div>
                </a>
                <div className="divstyle">
                  <div className="divlink">
                    <p>Bienvenue { userDetails.userName }</p>
                    <span>|</span>
                    <button onClick={ Logout }>Déconnecter</button>
                  </div>
                </div>
              </nav>
            </header>

    }

}

export default Header
