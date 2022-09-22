//import { useParams } from 'react-router-dom'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/comments.css'

function Comment() {
  //const numberComments = useParams();
  let userDetails = localStorage.getItem('user');
  if (!userDetails){
    return (
      <div className="divcomments">
        <p className="divnumber">2 commentaires</p>
        <div className="profilcomments">
          <div>
            <img className="profilcommentsimg" src={ Profil } alt="profil"/>
            <div className="profilpostcomments">
              <p>{}</p>
              <p>{}</p>
            </div>
          </div>
          <p>{}</p>
        </div>
      </div>
    )
  } else {
    return(
      <div className="divcomments">
        <p className="divnumber">{  } commentaires</p>

        <div id="commentable">
          <label form="textcomments">
            <textarea id="textcomments"> </textarea>
          </label>
          <div>
            <button>Annuler</button>
            <button>Commenter</button>
          </div>
        </div>
        <div className="profilcomments">
          <div>
            <img className="profilcommentsimg" src={ Profil } alt="profil"/>
            <div className="profilpostcomments">
              <p>{}</p>
              <p>{}</p>
            </div>
          </div>
          <p>{}</p>
        </div>
      </div>
    )
  }
}

export default Comment
