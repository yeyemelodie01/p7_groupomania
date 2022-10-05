import { useState, useEffect} from 'react'
import axios from 'axios'
import '../../utils/styles/post.css'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function Post() {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
      axios
        .get('http://localhost:4000/api/posts')
        .then((res) => {
          setPosts(res.data);
        })
        .catch(error => console.error(error))
    },
    []);
  
  const usePosts = posts.map((posts) =>{

    function SendPostId(){
      const detail = posts._id;
      localStorage.setItem("postId", detail);
      window.location.href='/detail';
    }

    const date1 = moment(posts.createdAt);
    const date2 = moment(Date.now());
    let hours = date2.diff(date1, 'minutes');
    let hour;

    if (0 <= hours) {
      hour = hours + "min";
    }

    if( 60 <= hours) {
      hour = date2.diff(date1, 'hours') + "h";
    }

    if (1440 <= hours) {
      hour = date2.diff(date1, 'days') + "j";
    }
    console.log(hour);

    if(posts.text){
      return (
        <div className="postgrid">
          <div className="grid">
            <div className="postdiv" id="postId" key={posts.id}>
              <div className="profilpost">
                <ul className="listpost">
                  <li>
                    <img className="imgprofil" src={ `https://ui-avatars.com/api/?name=${posts.userName}` } alt="profil"/>
                  </li>
                  <li>
                    <p className="nameprofil">{posts.userName}</p>
                  </li>
                  <li>
                    <p className="hourpost">{ hour }</p>
                  </li>
                </ul>
              </div>
                <div className="divfigure">
                  <h1 className="titlepost" onClick={ SendPostId }>{posts.title}</h1>
                  <figure>
                    <div>{parse(posts.text)}</div>
                    <figcaption>
                      <div className="stylecomments">
                        <div className="divcomments">
                          <div className="diviconnumber">
                            <div className="likedislike">
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />2</button>
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>1</button>
                            </div>
                            <button className="number" onClick={ SendPostId }>2 commentaires</button>
                          </div>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
            </div>
          </div>
        </div>
      )
    }
    if (posts.media){
      return (
        <div className="postgrid">
          <div className="grid">
            <div className="postdiv" key={posts._id}>
              <div className="profilpost">
                <ul className="listpost">
                  <li>
                    <img className="imgprofil" src={ `https://ui-avatars.com/api/?name=${posts.userName}` } alt="profil"/>
                  </li>
                  <li>
                    <p className="nameprofil">{posts.userName}</p>
                  </li>
                  <li>
                    <p className="hourpost">{ hour }</p>
                  </li>
                </ul>
              </div>
                <div className="divfigure">
                  <h1 className="titlepost" onClick={ SendPostId }>{posts.title}</h1>
                  <figure>
                    <div className="imgfigure">
                      <img src={posts.media} alt=""/>
                    </div>
                    <figcaption>
                      <div className="stylecomments">
                        <div className="divcomments">
                          <div className="diviconnumber">
                            <div className="likedislike">
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />2</button>
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>1</button>
                            </div>
                            <button className="number" onClick={ SendPostId }>2 commentaires</button>
                          </div>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
            </div>
          </div>
        </div>
      )
    }
    return null;
  });

    return (
      <div>
        { usePosts }
      </div>
      )
}

export default Post
