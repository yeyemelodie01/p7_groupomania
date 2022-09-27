import { useState, useEffect} from 'react'
import axios from 'axios'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/post.css'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

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

    if(posts.text){
      return (
        <div className="postgrid">
          <div className="grid">
            <div className="postdiv" id="postId" key={posts.id}>
              <div className="profilpost">
                <ul className="listpost">
                  <li>
                    <img className="imgprofil" src={ Profil } alt="profil"/>
                  </li>
                  <li>
                    <p className="nameprofil">{posts.userName}</p>
                  </li>
                  <li>
                    <p className="hourpost">2h</p>
                  </li>
                </ul>
              </div>
                <div className="divfigure">
                  <h1 className="titlepost">{posts.title}</h1>
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
                    <img className="imgprofil" src={ Profil } alt="profil"/>
                  </li>
                  <li>
                    <p className="nameprofil">{posts.userName}</p>
                  </li>
                  <li>
                    <p className="hourpost">2h</p>
                  </li>
                </ul>
              </div>
                <div className="divfigure">
                  <h1 className="titlepost">{posts.title}</h1>
                  <figure>
                    <img src={posts.media} alt=""/>
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
