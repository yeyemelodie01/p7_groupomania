import { useState, useEffect} from 'react'
import axios from 'axios'
import '../../utils/styles/post.css'
import parse from 'html-react-parser'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import LazyLoad from 'react-lazy-load'
import submitLike from '../../utils/hooks/like'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import submitDislike from '../../utils/hooks/dislike'

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

  const usePosts = postsSort.map((posts) => {
    function sendPostId(postId) {
      window.location.href=`/detail/${postId}`;
    }

    function postMediaText() {
        if (posts.text) {
          return (
            <div className="textFigure">{parse(posts.text)}</div>
          )
        }

        if (posts.media) {
          return (
            <div className="imgWidth">
              <img src={posts.media} alt=""/>
            </div>
          )
        }
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

    const userDetails = JSON.parse(localStorage.getItem('user'));
    if (userDetails === null) {
        return (
          <div key={ posts._id }>
            <div className="postGrid">
              <div className="grid">
                <LazyLoad className="widthLazy">
                  <div className="postDiv" id="postId" >
                    <div className="profilPost">
                      <ul className="listPost">
                        <li>
                          <img className="imgProfil" src={ `https://ui-avatars.com/api/?name=${posts.userName}` } alt={`profil de ${posts.userName}`}/>
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
                        <h2 className="titlePost" onClick={() => { sendPostId(posts._id) }}>{posts.title}</h2>
                        <figure>
                          { postMediaText() }
                          <figcaption>
                            <div className="styleIconLike">
                              <div className="divIconLike">
                                <div className="divIconNumber">
                                    <button className="buttonIcon">
                                      <FontAwesomeIcon icon={ faThumbsUp } className="iconColor degrade" /><span id='likeSpan'>{ posts.likes }</span>
                                    </button>
                                    <button className="buttonIcon">
                                      <FontAwesomeIcon icon={ faThumbsDown } className="iconColor degrade" /><span id='likeSpan'>{ posts.dislikes }</span>
                                    </button>
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
          </div>
        )
      } else {
        return (
          <div key={posts._id}>
            <div className="postGrid">
              <div className="grid">
                <LazyLoad className="widthLazy">
                  <div className="postDiv" id="postId">
                    <div className="profilPost">
                      <ul className="listPost">
                        <li>
                          <img className="imgProfil" src={ `https://ui-avatars.com/api/?name=${posts.userName}` } alt={`profil de ${posts.userName}`}/>
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
                        <h2 className="titlePost" onClick={() => { sendPostId(posts._id) }}>{posts.title}</h2>
                        <figure>
                          { postMediaText() }
                          <figcaption>
                            <div className="styleIconLike">
                              <div className="divIconLike">
                                <div className="divIconNumber">
                                  <button className="buttonIcon" onClick={() => { submitLike(posts._id) }}>
                                    <FontAwesomeIcon icon={ faThumbsUp } className="iconColor degrade" /><span id={'likeSpan'+posts._id}>{ posts.likes }</span>
                                  </button>
                                  <button className="buttonIcon" onClick={() => { submitDislike(posts._id); }}>
                                    <FontAwesomeIcon icon={ faThumbsDown } className="iconColor degrade" /><span id={'dislikeSpan'+posts._id}>{ posts.dislikes }</span>
                                  </button>
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
          </div>
        )
      }
  });

    return (
      <>
        { usePosts }
      </>
      )
}

export default Post
