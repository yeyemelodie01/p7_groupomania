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

function Card({ userid, title, media, text, username, hour, avatar, like, dislike}){
  const [file, setFile] = useState();
  const [ textEdit, setTextEdit ] = useState("");
  const { register, handleSubmit} = useForm();
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const idAdmin = userDetails._id;
    console.log(userDetails._id)
    axios
      .get(`http://localhost:4000/users/${idAdmin}`)
      .then((res) => {
        console.log(res.data)
        const role = res.data.role;
        localStorage.setItem('role', role);
      })
const roleAdmin = localStorage.getItem('role');
    console.log(roleAdmin)
  function mediaText(){
    if(media){
      if (userDetails._id === userid) {
        return (
          <>
            <div id="media">
              <img src={media} alt="" />
            </div>
            <div className="updatedeletemedia">
              <form onSubmit={handleSubmit(postUpdate)}>
                <label form='img'>
                  <input
                    id="img"
                    className="sizeinputimg"
                    type="file"
                    value={file}
                    onChange={handleFileChange}
                    {...register("img")}
                  />
                </label>
                <button className="update" type="submit" onClick={() => {
                }}>Modifier
                </button>
              </form>
              <div>
                <button className="delete" onClick={postDelete}>Supprimer</button>
              </div>
            </div>
          </>
        )
        } if(roleAdmin === "admin"){
          return(
            <>
              <div id="media">
                <img src={ media } alt=""/>
              </div>
              <div className="updatedeletemedia">
                <form onSubmit={handleSubmit(postUpdate)}>
                  <label form='img'>
                    <input
                      id="img"
                      className="sizeinputimg"
                      type="file"
                      value={ file }
                      onChange={handleFileChange}
                      {...register("img")}
                    />
                  </label>
                  <button className="update" type="submit" onClick={() => {}}>Modifier</button>
                </form>
                <div>
                  <button className="delete" onClick={postDelete}>Supprimer</button>
                </div>
              </div>
            </>
          )
        } else {
        return (
          <div id="media">
            <img src={ media } alt=""/>
          </div>
        )
      }
    }
    if(text){
      if (userDetails._id === userid){
        return (
          <>
            <div id="text">
              <div>{ parse( text ) }</div>
            </div>
            <div className="updatedeletetext">
              <form onSubmit={handleSubmit(postUpdate)}>
                <div id="textupdate">
                  <div className="divwisywig">
                    <div className="divtext">
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
                    <button className="stylebutton" type="submit" onClick={() => {}} >Envoyer</button>
                    {/*<button className="stylebutton" type="submit" onClick={ cancelChoice }>Annuler</button>*/}
                  </div>
                </div>
              </form>
              <div>
                <button className="delete" onClick={postDelete}>Supprimer</button>
              </div>
            </div>
          </>
        )
      } if(roleAdmin){
        return (
          <>
            <div id="text">
              <div>{ parse( text ) }</div>
            </div>
            <div className="updatedeletetext">
              <form onSubmit={handleSubmit(postUpdate)}>
                <div id="textupdate">
                  <div className="divwisywig">
                    <div className="divtext">
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
                    <button className="stylebutton" type="submit" onClick={() => {}} >Envoyer</button>
                    {/*<button className="stylebutton" type="submit" onClick={ cancelChoice }>Annuler</button>*/}
                  </div>
                </div>
              </form>
              <div>
                <button className="delete" onClick={postDelete}>Supprimer</button>
              </div>
            </div>
          </>
        )
      } else {
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
      console.log(formData);
      axios
        .put(`http://localhost:4000/api/posts/${postsId}`, formData, {
          headers: {
            Authorization: `Bearer ${userDetails.jwt}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          window.location.href='/';
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
          window.location.href='/';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if(userDetails) {
    return (
      <>
        <div className="profilpost">
          <ul className="listpost">
            <li>
              <img className="imgprofil" src={avatar} alt="profil" />
            </li>
            <li>
              <p className="nameprofil">{username}</p>
            </li>
            <li>
              <p className="hourpost">{hour}</p>
            </li>
          </ul>
        </div>
        <div className="divfigurecenter">
          <div className="divfigurewidth">
            <h1 className="titlepost">{title}</h1>
            <figure>
              {mediaText()}
              <figcaption>
                <div className="stylecomments">
                  <div className="divcomments">
                    <div className="diviconnumber">
                      <div className="likedislike">
                        <button className="buttonicon" onClick={submitLike}><FontAwesomeIcon icon={faThumbsUp} className="iconcolor" />{like}
                        </button>
                        <button className="buttonicon" onClick={submitDislike}><FontAwesomeIcon icon={faThumbsDown} className="iconcolor" />{dislike}
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
                    { mediaText() }
                    <figcaption>
                      <div className="stylecomments">
                        <div className="divcomments">
                          <div className="diviconnumber">
                            <div className="likedislike">
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />{ like }</button>
                              <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>{ dislike }</button>
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
  id: PropTypes.string,
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
  id: '',
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
