import { useState, useEffect} from 'react'
import axios from 'axios'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
//import Comment from '../comments'
import '../../utils/styles/post.css'


function Post() {
  //const [ commentList, setCommentList ] = useState([])
  const [ posts, setPosts ] = useState([]);
  //const [ postsList, setPostsList ] = useState([])

  // function EditPost(){
  //   const promise = axios.get("http://localhost:4000/api/posts")
  //   const donnees = promise.then((res) => res.data)
  //     return donnees
  // }

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch(error => console.error(error));
  }, []);


  // useEffect(() => {
  //   async function fetchPost() {
  //     try {
  //       const response = await fetch(`http://localhost:4000/api/posts`)
  //       const { postsList } = await response.json()
  //       setPostsList(postsList)
  //     } catch (err) {
  //       console.log(err)
  //     } finally {
  //     }
  //   }
  //   fetchPost()
  // }, [])

  const usePosts = posts.map((posts) =>{
    if(posts.text){
      const text = posts.text.split(/[",<,>]/);
      return (
        <div className="parentgrid">
          <div className="grid">
            <div className="postdiv" key={posts._id}>
              <div className="profilpost">
                <ul className="listpost">
                  <li>
                    <img className="imgprofil" src={ Profil } alt="profil"/>
                  </li>
                  <li>
                    <p className="nameprofil">{}</p>
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
                      {text}
                    <figcaption>
                      <div className="likedislike">
                        <FontAwesomeIcon icon={ faThumbsUp } className="margin-icon" />
                        <FontAwesomeIcon icon={ faThumbsDown } />
                      </div>
                      {/*<div>*/}
                      {/*  {commentList.map((comment, index) =>*/}
                      {/*    <Comment*/}
                      {/*      key={`${comment.name}-${index}`}*/}
                      {/*      picture={comment.picture}*/}
                      {/*      nameUser={comment.username}*/}
                      {/*      hour={comment.hour}*/}
                      {/*      text={comment.text}*/}
                      {/*    />*/}
                      {/*  )}*/}
                      {/*</div>*/}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (posts.media){
      return (
        <div className="parentgrid">
          <div className="grid">
            <div className="postdiv" key={posts._id}>
              <div className="profilpost">
                <ul className="listpost">
                  <li>
                    <img className="imgprofil" src={ Profil } alt="profil"/>
                  </li>
                  <li>
                    <p className="nameprofil">{}</p>
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
                        <FontAwesomeIcon icon={ faThumbsUp } className="margin-icon" />
                        <FontAwesomeIcon icon={ faThumbsDown } />
                      </div>
                      {/*<div>*/}
                      {/*  {commentList.map((comment, index) =>*/}
                      {/*    <Comment*/}
                      {/*      key={`${comment.name}-${index}`}*/}
                      {/*      picture={comment.picture}*/}
                      {/*      nameUser={comment.username}*/}
                      {/*      hour={comment.hour}*/}
                      {/*      text={comment.text}*/}
                      {/*    />*/}
                      {/*  )}*/}
                      {/*</div>*/}
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
