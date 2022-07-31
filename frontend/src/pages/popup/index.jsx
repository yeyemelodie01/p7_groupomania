import React from 'react'
import useModal from '../../utils/hooks'
import Modal from '../../components/modal'

function PopUp() {
  const { isShow: isLoginFormShow, toggle: toggleLoginForm } = useModal();
  const { isShow: isRegistrationForm, toggle: toggleRegistrationForm} = useModal();

  return (
    <>
    <div className="App">
      <button className="modal-toggle" onClick={toggleLoginForm}>
        Se connecter
      </button>
      <button className="modal-toggle" onClick={toggleRegistrationForm}>
        S'inscrire
      </button>

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
    </div>

    <style jsx="true">
      {`
      .App {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

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
  );
}

export default PopUp
