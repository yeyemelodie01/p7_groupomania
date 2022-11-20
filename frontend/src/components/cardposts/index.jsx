import PropTypes from 'prop-types'
import axios from 'axios'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import postDelete from '../../utils/hooks/delete'
import submitLike from '../../utils/hooks/like'
import submitDislike from '../../utils/hooks/dislike'

function Card({ title, media, text, username, hour, avatar, like, dislike}){
  const [file, setFile] = useState();
  const [ textEdit, setTextEdit ] = useState("");
  const { register, handleSubmit} = useForm();
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userId = localStorage.getItem('userId');
  const postsId = localStorage.getItem("postId");

  function mediaText(){
    if(userDetails){
      const roleAdmin = localStorage.getItem('role');
      const idAdmin = userDetails._id;

      axios
        .get(`http://localhost:4000/users/${idAdmin}`)
        .then((res) => {
          const role = res.data.role;
          localStorage.setItem('role', role);
        })

      if(roleAdmin === "admin"){
        if(media){
          return(
            <>
              <div id="media">
                <img src={ media } alt=""/>
              </div>
              <div className="updateDeleteMedia">
                <form onSubmit={handleSubmit(postUpdate)}>
                  <label form='img'>
                    <input
                      id="img"
                      className="sizeInputImg"
                      type="file"
                      value={ file }
                      onChange={handleFileChange}
                      {...register("img")}
                    />
                  </label>
                  <button className="styleButton" type="submit" onClick={() => {}}>Modifier</button>
                </form>
                <div>
                  <button className="styleButton" onClick={postDelete}>Supprimer</button>
                </div>
              </div>
            </>
          )
        }
        if(text){
          return (
            <>
              <div id="text">
                <div>{ parse( text ) }</div>
              </div>
              <div className="updateDeleteText">
                <form onSubmit={handleSubmit(postUpdate)}>
                  <div id="textUpdate">
                    <div className="divWisywig">
                      <div className="divText">
                        <CKEditor
                          editor={ ClassicEditor }
                          id={'editor'}
                          config={{
                            placeholder: "Ecrivez votre texte",
                            removePlugins: [
                              'MediaEmbed', 'Link', 'Image', 'EasyImage', 'CKFinder',
                              'ImageUpload', 'ImageToolbar', 'ImageStyle',
                              'ImageCaption'
                            ],
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setTextEdit(data)
                          }}
                        />
                      </div>
                      <button className="styleButton" type="submit" onClick={() => {}} >Envoyer</button>
                    </div>
                  </div>
                </form>
                <div>
                  <button className="styleButton" onClick={postDelete}>Supprimer</button>
                </div>
              </div>
            </>
          )}
      } else if(userDetails._id === userId){
        if (media) {
          return (
            <>
              <div id="media">
                <img src={media} alt="" />
              </div>
              <div className="updateDeleteMedia">
                <form onSubmit={handleSubmit(postUpdate)}>
                  <label htmlFor="img" form='img'>
                    <input
                      id="img"
                      className="sizeInputImg"
                      type="file"
                      value={file}
                      onChange={handleFileChange}
                      {...register("img")}
                    />
                  </label>
                  <button className="styleButton" type="submit" onClick={() => {}}>Modifier</button>
                </form>
                <div>
                  <button className="styleButton" onClick={postDelete}>Supprimer</button>
                </div>
              </div>
            </>
          )}
        if (text){
          return (
            <>
              <div id="text">
                <div>{ parse( text ) }</div>
              </div>
              <div className="updateDeleteText">
                <form onSubmit={handleSubmit(postUpdate)}>
                  <div id="textUpdate">
                    <div className="divWisywig">
                      <div className="divText">
                        <CKEditor
                          editor={ ClassicEditor }
                          id={'editor'}
                          config={{
                            placeholder: "Ecrivez votre texte",
                            removePlugins: [
                              'MediaEmbed', 'Link', 'Image', 'EasyImage', 'CKFinder',
                              'ImageUpload', 'ImageToolbar', 'ImageStyle',
                              'ImageCaption'
                            ],
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setTextEdit(data)
                          }}
                        />
                      </div>
                      <button className="styleButton" type="submit" onClick={() => {}} >Envoyer</button>
                    </div>
                  </div>
                </form>
                <div>
                  <button className="styleButton" onClick={postDelete}>Supprimer</button>
                </div>
              </div>
            </>
          )}
      }
      if(userDetails._id !== userId){
        if(media){
          return (
            <div id="media">
              <img src={ media } alt="userImage"/>
            </div>
          )
        }
        if (text){
          return (
            <div id="text">
              <div>{ parse( text ) }</div>
            </div>
          )
        }
      }
    } else {
      if(media){
        return (
          <div id="media">
            <img src={ media } alt=""/>
          </div>
        )
      }
      if (text){
        return (
          <div id="text">
            <div>{ parse( text ) }</div>
          </div>
        )
      }
    }
  }

  function handleFileChange(event) {
    setFile(event.target.files)
  }

  const postUpdate = (data) =>{
    let postsId = localStorage.getItem("postId");
    if(media){
      const formData = new FormData();
      formData.append("files", data.img[0]);
      formData.append("postType", "media");
      axios
        .put(`http://localhost:4000/api/posts/${postsId}`, formData, {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (text){
      const updateText = {
        "postType": 'text',
        "text": textEdit
      }
      axios
        .put(`http://localhost:4000/api/posts/${postsId}`, updateText, {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if(userDetails) {
    return (
      <>
        <div className="profilPost">
          <ul className="listPost">
            <li>
              <img className="imgProfil" src={avatar} alt="profil" />
            </li>
            <li>
              <p className="nameProfil">{username}</p>
            </li>
            <li>
              <p className="hourPost">{hour}</p>
            </li>
          </ul>
        </div>
        <div className="divFigureCenter">
          <div className="divFigureWidth">
            <h1 className="titlePost">{title}</h1>
            <figure>
              {mediaText()}
              <figcaption className="detailFig">
                <div className="styleIconLike">
                  <div className="divIconLike">
                    <div className="divIconNumber">
                      <div className="likeDislike">
                        <button className="buttonIcon" aria-label="j'aime" onClick={() => { submitLike(postsId) }}>
                          <FontAwesomeIcon icon={ faThumbsUp } className="iconColor degrade" /><span id={'likeSpan'+postsId}>{ like }</span>
                        </button>
                        <button className="buttonIcon" aria-label="je n'aime pas" onClick={() => { submitDislike(postsId); }}>
                          <FontAwesomeIcon icon={ faThumbsDown } className="iconColor degrade" /><span id={'dislikeSpan'+postsId}>{ dislike }</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </>
    )} else{
    return (
      <>
        <div className="profilPost">
          <ul className="listPost">
            <li>
              <img className="imgProfil" src={ avatar } alt="profil"/>
            </li>
            <li>
              <p className="nameProfil">{ username }</p>
            </li>
            <li>
              <p className="hourPost">{ hour }</p>
            </li>
          </ul>
        </div>
        <div className="divFigureCenter">
          <div className="divFigureWidth">
            <h1 className="titlePost">{ title }</h1>
            <figure>
              { mediaText() }
              <figcaption>
                <div className="styleIconLike">
                  <div className="divIconLike">
                    <div className="divIconNumber">
                      <div className="likeDislike">
                        <button className="buttonIcon" aria-label="j'aime">
                          <FontAwesomeIcon icon={ faThumbsUp } className="iconColor degrade" /><span id='likeSpan'>{ like }</span>
                        </button>
                        <button className="buttonIcon" aria-label="je n'aime pas">
                          <FontAwesomeIcon icon={ faThumbsDown } className="iconColor degrade" /><span id='likeSpan'>{ dislike }</span>
                        </button>
                      </div>
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
  dislike: PropTypes.string,
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
