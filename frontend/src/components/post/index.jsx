import { useState, useEffect} from 'react'
import axios from 'axios'
import '../../utils/styles/post.css'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import LazyLoad from 'react-lazy-load'


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

  const postsSort = posts.sort(function (a, b) {
    return b.createdAt.localeCompare(a.createdAt);
  })

  const usePosts = postsSort.map((posts) =>{

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

    if(posts.text){
      return (
        <div className="postGrid">
          <div className="grid">
            <LazyLoad className="widthLazy">
              <div className="postDiv" id="postId" key={posts.id}>
                <div className="profilPost">
                  <ul className="listPost">
                    <li>
                      <img className="imgProfil" src={ `https://ui-avatars.com/api/?name=${posts.userName}` } alt="profil"/>
                    </li>
                    <li>
                      <p className="nameProfil">{posts.userName}</p>
                    </li>
                    <li>
                      <p className="hourpost">{ hour }</p>
                    </li>
                  </ul>
                </div>
                <div className="divFigureCenter">
                  <div className="divFigureWidth">
                    <h1 className="titlePost" onClick={ SendPostId }>{posts.title}</h1>
                    <figure>
                      <div className="textFigure">{parse(posts.text)}</div>
                      <figcaption>
                        <div className="styleIconLike">
                          <div className="divIconLike">
                            <div className="divIconNumber">
                              <div className="likeDislike">
                                <button className="buttonIcon"><FontAwesomeIcon icon={ faThumbsUp } className="iconColor" />{ posts.likes }</button>
                                <button className="buttonIcon"><FontAwesomeIcon icon={ faThumbsDown } className="iconColor"/>{ posts.dislikes }</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </LazyLoad>
          </div>
        </div>
      )
    }
    if (posts.media){
      return (
        <div className="postGrid">
          <div className="grid">
            <LazyLoad className="widthLazy">
              <div className="postDiv" key={posts._id}>
                <div className="profilPost">
                  <ul className="listPost">
                    <li>
                      <img className="imgProfil" src={ `https://ui-avatars.com/api/?name=${posts.userName}` } alt="profil"/>
                    </li>
                    <li>
                      <p className="nameProfil">{posts.userName}</p>
                    </li>
                    <li>
                      <p className="hourPost">{ hour }</p>
                    </li>
                  </ul>
                </div>
                <div className="divFigureCenter">
                  <div className="divFigureWidth">
                    <h1 className="titlePost" onClick={ SendPostId }>{posts.title}</h1>
                    <figure>
                      <div className="imgFigure">
                          <img src={posts.media} alt=""/>
                      </div>
                      <figcaption>
                        <div className="styleIconLike">
                          <div className="divIconLike">
                            <div className="divIconNumber">
                              <div className="likeDislike">
                                <button className="buttonIcon"><FontAwesomeIcon icon={ faThumbsUp } className="iconColor"/>{ posts.likes }</button>
                                <button className="buttonIcon"><FontAwesomeIcon icon={ faThumbsDown } className="iconColor"/>{ posts.dislikes }</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </LazyLoad>
          </div>
        </div>
      )
    }
    return null;
  });

    return (
      <>
        { usePosts }
      </>
      )
}

export default Post
