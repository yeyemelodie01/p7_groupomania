import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/detailposts.css'

function DetailPosts() {
  const userDetails = JSON.parse(localStorage.getItem('user'));

if(userDetails){
  return(
    <div>
      <div id="commentable">
        <label form="textcomments">
          <textarea id='textcomments'/>
        </label>
        <div>
          <button>Annuler</button>
          <button>Commenter</button>
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
    </div>
  )
} else {
  return (
    <div id="commentable">
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
