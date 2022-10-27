import PropTypes from 'prop-types'
import axios from 'axios'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function Card({ userid, title, media, text, username, hour, avatar, like, dislike}){

  // if (media){
  //   document.getElementById('media').style.display='block';
  //   document.getElementById('text').style.display='none';
  // }
  //
  // if (text){
  //   document.getElementById('text').style.display='block';
  //   document.getElementById('media').style.display='none';
  // }

  function mediaText(){
    if(media){
      return(
          <div id="media">
            <img src={ media } alt=""/>
          </div>
        )
    }
    if(text){
      return (
        <div id="text">
          <div>{ parse( text ) }</div>
        </div>
      )
    }
  }

  function submitLike() {
    let postsId = localStorage.getItem("postId");
    const like = {
      "userId": userDetails._id,
      "like": 1
    }
    console.log(like);
    axios
      .post(`http://localhost:4000/api/posts/${postsId}/like`, like ,{
        headers: {
          Authorization: `Bearer ${userDetails.jwt}`,
        }
      })
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitDislike() {
    let postsId = localStorage.getItem("postId");
    const like = {
      "userId": userDetails._id,
      "like": -1
    }

    axios
      .post(`http://localhost:4000/api/posts/${postsId}/like`, like ,{
        headers: {
          Authorization: `Bearer ${userDetails.jwt}`,
        }
      })
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function postDelete() {
    let postsId = localStorage.getItem("postId");
    axios
      .delete(`http://localhost:4000/api/posts/${postsId}`, {
        headers: {
          Authorization: `Bearer ${userDetails.jwt}`
        }
      })
      .then(() => {
        alert("Votre post a bien été supprimer")
        window.location.href='/';
      })
      .catch((err) => {
        console.log(err);
      })
  }


  let userDetails = JSON.parse(localStorage.getItem('user'));
  if(userDetails) {
    if(userDetails.userId === userid){
      return (
        <>
          <div className="profilpost">
            <ul className="listpost">
              <li>
                <img className="imgprofil" src={ avatar } alt="profil"/>
              </li>
              <li>
                <p className="nameprofil">{ username }</p>
              </li>
              <li>
                <p className="hourpost">{ hour }</p>
              </li>
            </ul>
          </div>
          <div className="divfigurecenter">
            <div className="divfigurewidth">
              <h1 className="titlepost">{ title }</h1>
              <figure>
                { mediaText() }
                <div>
                  <button className="delete" onClick={postDelete}>Supprimer</button>
                </div>
                <figcaption>
                  <div className="stylecomments">
                    <div className="divcomments">
                      <div className="diviconnumber">
                        <div className="likedislike">
                          <button className="buttonicon" onClick={ submitLike }><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />{ like }</button>
                          <button className="buttonicon" onClick={ submitDislike }><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>{ dislike }</button>
                        </div>
                        <button className="number">2 commentaires</button>
                      </div>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </>
      )} else {
      return (
        <>
          <div className="profilpost">
            <ul className="listpost">
              <li>
                <img className="imgprofil" src={ avatar } alt="profil"/>
              </li>
              <li>
                <p className="nameprofil">{ username }</p>
              </li>
              <li>
                <p className="hourpost">{ hour }</p>
              </li>
            </ul>
          </div>
          <div className="divfigurecenter">
            <div className="divfigurewidth">
              <h1 className="titlepost">{ title }</h1>
              <figure>
                { mediaText() }
                <figcaption>
                  <div className="stylecomments">
                    <div className="divcomments">
                      <div className="diviconnumber">
                        <div className="likedislike">
                          <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />{ like }</button>
                          <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>{ dislike }</button>
                        </div>
                        <button className="number">2 commentaires</button>
                      </div>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </>
      )}} else {
          return (
            <>
              <div className="profilpost">
                <ul className="listpost">
                  <li>
                    <img className="imgprofil" src={ avatar } alt="profil"/>
                  </li>
                  <li>
                    <p className="nameprofil">{ username }</p>
                  </li>
                  <li>
                    <p className="hourpost">{ hour }</p>
                  </li>
                </ul>
              </div>
              <div className="divfigurecenter">
                <div className="divfigurewidth">
                  <h1 className="titlepost">{ title }</h1>
                  <figure>
                    { mediaText() }
                    <figcaption>
                      <div className="stylecomments">
                        <div className="divcomments">
                          <div className="diviconnumber">
                            <div className="likedislike">
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />{ like }</button>
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>{ dislike }</button>
                            </div>
                            <button className="number">2 commentaires</button>
                          </div>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </>
          )
        // } else {
        //   return (
        //     <>
        //       <div className="profilpost">
        //         <ul className="listpost">
        //           <li>
        //             <img className="imgprofil" src={ avatar } alt="profil"/>
        //           </li>
        //           <li>
        //             <p className="nameprofil">{ username }</p>
        //           </li>
        //           <li>
        //             <p className="hourpost">{ hour }</p>
        //           </li>
        //         </ul>
        //       </div>
        //       <div className="divfigurecenter">
        //         <div className="divfigurewidth">
        //           <h1 className="titlepost">{ title }</h1>
        //           <figure>
        //             <div id="text">
        //               <div>{ parse( text ) }</div>
        //             </div>
        //             <figcaption>
        //               <div className="stylecomments">
        //                 <div className="divcomments">
        //                   <div className="diviconnumber">
        //                     <div className="likedislike">
        //                       <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />{ like }</button>
        //                       <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>{ dislike }</button>
        //                     </div>
        //                     <button className="number">2 commentaires</button>
        //                   </div>
        //                 </div>
        //               </div>
        //             </figcaption>
        //           </figure>
        //         </div>
        //       </div>
        //     </>
        //   )
        // }
      }
}

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  media: PropTypes.string,
  text: PropTypes.string,
  username: PropTypes.string,
  hour: PropTypes.string,
  avatar: PropTypes.string,
  like: PropTypes.string,
  dislike: PropTypes.string
}

Card.defaultProps = {
  id: '',
  title: '',
  media: '',
  text: '',
  username: '',
  hour: '',
  avatar:'',
  like: '',
  dislike: '',
}

export default Card
