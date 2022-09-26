import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/detailposts.css'

function DetailPosts() {
  // function ShowDetailPosts(){
  //   const div = document.getElementById("commentable");
  //
  //   if (div.style.display === "none") {
  //     div.style.display = "block";
  //   } else {
  //     div.style.display = "none";
  //   }
  // }

  return(
    <div>
      <div id="commentable">
        <label form="textcomments">
          <textarea id="textcomments"></textarea>
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
}

export default DetailPosts
