import PropTypes from 'prop-types'
import axios from 'axios'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function Card({ title, media, text, username, hour, avatar }){


  if (media){
    document.getElementById('media').style.display='block';
    document.getElementById('text').style.display='none';
  }

  if (text){
    document.getElementById('text').style.display='block';
    document.getElementById('media').style.display='none';
  }

  let userDetails = JSON.parse(localStorage.getItem('user'));
  if(userDetails) {

    const submitLike = (userId) => {
      let postsId = localStorage.getItem("postId");

      //const userId = userDetails._id ;
      axios
        .post(`http://localhost:4000/api/posts/${postsId}/like`, { userId: userId } ,{
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return(
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
        <div className="divfigure">
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
                      <button className="buttonicon" onClick={ submitLike }><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />2</button>
                      <button className="buttonicon" ><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>1</button>
                    </div>
                    <button className="number">2 commentaires</button>
                  </div>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </>
    )
  } else{
    return(
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
        <div className="divfigure">
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
                      <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />2</button>
                      <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>1</button>
                    </div>
                    <button className="number">2 commentaires</button>
                  </div>
                </div>
              </div>
            </figcaption>
          </figure>
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
}

Card.defaultProps = {
  title: '',
  media: '',
  text: '',
  username: '',
  hour: '',
  avatar:'',
}

export default Card
