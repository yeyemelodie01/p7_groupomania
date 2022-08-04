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
`

const NumComments = styled.div`

`

const ProfilDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
  width: 160px;
`

const ProfilImg = styled.img`
  width: 30px;
  height: 30px;
  background-color: aqua;
  border-radius: 80px 80px 80px 80px;
`

const ProfilPost = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 100%;
`

function Comment() {
  return(
    <CommentPost>
      <NumComments>2 commentaires</NumComments>
      <div>
        <label form="comments">
          <textarea id="comments"> </textarea>
        </label>
        <button>Annuler</button>
        <button>Commenter</button>
      </div>
      <ProfilDiv>
        <ProfilImg src={ Profil } alt="profil"/>
        <ProfilPost>
          <li>
            <p>Mélodie</p>
          </li>
          <li>
            <p>1h</p>
          </li>
        </ProfilPost>
        <p>Cute :-)</p>
      </ProfilDiv>
      <input />
    </CommentPost>
  )
}

export default Comment
