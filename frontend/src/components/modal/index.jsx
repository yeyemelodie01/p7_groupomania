import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5)
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  display: flex;
  align-items: center;
`

const ModalDiv = styled.div`
  z-index: 100;
  background: #fff;
  position: relative;
  margin: auto;
  border-radius: 5px;
  max-width: 500px;
  width: 80px;
  padding: 1rem;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalCloseButton = styled.button`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border: none;
  background: transparent;
`

const ModalBody = styled.div`

`

const Modal = ({ isShow, hide, title, ...props }) => isShow

  ? ReactDOM.createPortal(
    <ModalOverlay>
      <ModalWrapper>
        <ModalDiv>
          <ModalHeader>
            <h4>{title}</h4>
            <ModalCloseButton type="button" onClick={hide}>
              <span>&times;</span>
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>{props.children}</ModalBody>
        </ModalDiv>
      </ModalWrapper>
    </ModalOverlay>
  )

  : null;

Modal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title:PropTypes.string.isRequired
};

export default Modal
