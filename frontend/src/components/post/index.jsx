import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import ImgPost from '../../assets/marcel-eberle-n4boKCT_RLk-unsplash.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Comment from '../comments'
import '../../utils/styles/post.css'


function Post({ picture, picturePost, nameUser, hour, title }) {
  const [ commentList, setCommentList ] = useState([])

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:8000/api/post`)
        const { commentList } = await response.json()
        setCommentList(commentList)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPost()
  }, [])
  return(
    <div className="parentgrid">
      <div className="grid">
        <div className="postdiv">
          <div className="profilpost">
            <ul className="listpost">
              <li>
                <img className="imgprofil" src={ picture } alt="profil"/>
              </li>
              <li>
                <p className="nameprofil">{nameUser}</p>
              </li>
              <li>
                <p className="hourpost">{hour}</p>
              </li>
            </ul>
          </div>
          <h1 className="titlepost">{title}</h1>
          <figure>
            <img src={ picturePost } alt="born" />
            <figcaption>
              <div className="likedislike">
                <FontAwesomeIcon icon={ faThumbsUp } className="margin-icon" />
                <FontAwesomeIcon icon={ faThumbsDown } />
              </div>
              <div>
                {commentList.map((comment, index) =>
                  <Comment
                    key={`${comment.name}-${index}`}
                    picture={comment.picture}
                    nameUser={comment.username}
                    hour={comment.hour}
                    text={comment.text}
                  />
                )}
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

Post.prototype = {
  picture: PropTypes.string,
  picturePost: PropTypes.string,
  nameUser: PropTypes.string,
  hour: PropTypes.number,
  title: PropTypes.string,
}

Post.defaultProps = {
  picture: Profil,
  picturePost: ImgPost,
  nameUser: '',
  hour: '',
  title: '',
}

export default Post
