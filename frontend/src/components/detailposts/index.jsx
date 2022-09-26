//import { useParams } from 'react-router-dom'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/detailposts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function DetailPosts() {
  //const numberComments = useParams();
  let userDetails = localStorage.getItem('user');
  if (!userDetails){
    return (
      <div className="divcomments">
        <div className="diviconnumber">
          <div className="likedislike">
            <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />2</button>
            <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>1</button>
          </div>
          <p className="number">2 commentaires</p>
        </div>
      </div>
    )
  } else {
    return(
      <div className="divcomments">
        <div>
          <div className="likedislike">
            <FontAwesomeIcon icon={ faThumbsUp } className="margin-icon iconcolor" />
            <FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>
          </div>
          <p className="divnumber">{  } commentaires</p>
        </div>
        <div id="commentable">
          <label form="textcomments">
            <textarea id="textcomments"> </textarea>
          </label>
          <div>
            <button>Annuler</button>
            <button>Commenter</button>
          </div>
        </div>
        <div className="divprofilcomments">
          <div className="divpaddingcomments">
            <img className="profilcommentsimg" src={ Profil } alt="profil"/>
            <div className="profilpostcomments">
              <p>{}</p>
            </div>
          </div>
        </div>
        <div className="divprofilcomments">
          <div className="divpaddingcomments">
            <img className="profilcommentsimg" src={ Profil } alt="profil"/>
            <div className="profilpostcomments">
              <p>{}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailPosts
