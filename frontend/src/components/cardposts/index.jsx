import PropTypes from 'prop-types'
import axios from 'axios'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function Card({ title, media, text, username, hour, avatar, like, dislike}){

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
    if(userDetails.userName === username && userDetails.media.url === media){
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
                <div id="media">
                  <img src={ media } alt=""/>
                </div>
                <div>
                  <button onClick={postDelete}>Supprimer</button>
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
      )}
      if(userDetails.userName === username && userDetails.text === text){
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
                  <div id="text">
                    <div>{ parse( text ) }</div>
                  </div>
                  <div>
                    <button onClick={postDelete}>Supprimer</button>
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
                    <div id="media">
                      <img src={ media } alt=""/>
                    </div>
                    <div id="text">
                      <div>{ parse( text ) }</div>
                    </div>
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
      }} else {
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
                <div id="media">
                  <img src={ media } alt=""/>
                </div>
                <div id="text">
                  <div>{ parse( text ) }</div>
                </div>
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
    }
}

Card.propTypes = {
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
