import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'


const CommentPost = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 20px;
`

const NumComments = styled.div`

`

const ProfilDiv = styled.div`
`

const ProfilImg = styled.img`
  width: 30px;
  height: 30px;
  background-color: aqua;
  border-radius: 80px 80px 80px 80px;
  float: left;
`

const ProfilPost = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 100%;
`

function Comment({ picture, nameUser, hour, text }) {
  const numberComments = useParams();
  return(
    <CommentPost>
      <NumComments>{ numberComments } commentaires</NumComments>
      <div>
        <label form="comments">
          <textarea id="comments"> </textarea>
        </label>
        <div>
          <button>Annuler</button>
          <button>Commenter</button>
        </div>
      </div>
      <ProfilDiv>
        <div>
          <ProfilImg src={ picture } alt="profil"/>
          <ProfilPost>
            <p>{nameUser}</p>
            <p>{hour}</p>
          </ProfilPost>
        </div>

        <p>{text}</p>
      </ProfilDiv>
    </CommentPost>
  )
}

Comment.propTypes = {
  picture: PropTypes.string,
  nameUser: PropTypes.string,
  hour: PropTypes.number,
  text: PropTypes.string,
}

Comment.defaultProps = {
  picture: Profil,
  nameUser: '',
  hour: '',
  text: '',
}

export default Comment
