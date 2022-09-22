import { useState, useEffect} from 'react'
import axios from 'axios'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Comment from '../comments'
import '../../utils/styles/post.css'

function Post() {
  //const [ commentList, setCommentList ] = useState([])
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
    if(posts.text){
      const usetext = posts.text.split('&nbsp;').join(" ");
      const postText = usetext.substring(3)
      const text = postText.substring(0, postText.length - 4)

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
                      {text}
                    <figcaption>
                      <div className="likedislike">
                        <FontAwesomeIcon icon={ faThumbsUp } className="margin-icon iconcolor" />
                        <FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>
                      </div>
                      <div>
                        <Comment />
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
              <div>
                <div>
                  <h1 className="titlepost">{posts.title}</h1>
                  <figure>
                    <img src={posts.media} alt=""/>
                    <figcaption>
                      <div className="likedislike">
                        <FontAwesomeIcon icon={ faThumbsUp } className="margin-icon iconcolor" />
                        <FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>
                      </div>
                      <div>
                        <Comment />
                      </div>
                    </figcaption>
                  </figure>
                </div>
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
