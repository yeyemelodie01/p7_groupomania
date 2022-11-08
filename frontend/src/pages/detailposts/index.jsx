import '../../utils/styles/detailposts.css'
import '../../utils/styles/post.css'
import { useEffect, useState } from 'react'
import moment from 'moment';
import axios from 'axios'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import submitLike from "../../utils/hooks/like";
import submitDislike from "../../utils/hooks/dislike";
import postDelete from "../../utils/hooks/delete";
import parse from "html-react-parser";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useForm} from "react-hook-form";

function DetailPosts() {
  const [detail, setDetail] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [ file, setFile ] = useState();
  const [ textEdit, setTextEdit ] = useState("");
  const { register, handleSubmit} = useForm();

  function handleFileChange(event) {
    setFile(event.target.files)
  }



  useEffect(() => {
    const postsId = localStorage.getItem("postId");
    axios
      .get(`http://localhost:4000/api/posts/${postsId}`)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  },[]);

  const postUpdate = (data) =>{
    let postsId = localStorage.getItem("postId");
    if(detail.media){
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

    if (detail.text){
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

  const date1 = moment(detail.createdAt);
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
        if(detail.media){
          return(
            <>
              <div id="media">
                <img src={ detail.media } alt=""/>
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
        if(detail.text){
          return (
            <>
              <div id="text">
                <div>{ parse( detail.text ) }</div>
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
      } else if(userDetails._id === detail.userId){
        if (detail.media) {
          return (
            <>
              <div id="media">
                <img src={ detail.media } alt="" />
              </div>
              <div className="updateDeleteMedia">
                <form onSubmit={handleSubmit(postUpdate)}>
                  <label form='img'>
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
        if (detail.text){
          return (
            <>
              <div id="text">
                <div>{ parse( detail.text ) }</div>
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
                      {/*<button className="stylebutton" type="submit" onClick={ cancelChoice }>Annuler</button>*/}
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
      if(userDetails._id !== detail.userId){
        if(detail.media){
          return (
            <div id="media">
              <img src={ detail.media } alt="userImage"/>
            </div>
          )
        }
        if (detail.text){
          return (
            <div id="text">
              <div>{ parse( detail.text ) }</div>
            </div>
          )
        }
      }
    } else {
      if(detail.media){
        return (
          <div id="media">
            <img src={ detail.media } alt=""/>
          </div>
        )
      }
      if (detail.text){
        return (
          <div id="text">
            <div>{ parse( detail.text ) }</div>
          </div>
        )
      }
    }
  }


  if(userDetails) {
    return (
      <>
        <main>
          <div className="postGridDetail">
            <div className="gridDetail">
              <div className="divCard">
                <div className="profilPost">
                  <ul className="listPost">
                    <li>
                      <img className="imgProfil" src={ `https://ui-avatars.com/api/?name=${detail.userName}` } alt="profil" />
                    </li>
                    <li>
                      <p className="nameProfil">{ detail.userName }</p>
                    </li>
                    <li>
                      <p className="hourPost">{ hour }</p>
                    </li>
                  </ul>
                </div>
                <div className="divFigureCenter">
                  <div className="divFigureWidth">
                    <h1 className="titlePost">{ detail.title }</h1>
                    <figure>
                      { mediaText() }
                      <figcaption className="detailFig">
                        <div className="styleIconLike">
                          <div className="divIconLike">
                            <div className="divIconNumber">
                              <div className="likeDislike">
                                <button className="buttonLikeDislike" onClick={submitLike}><FontAwesomeIcon icon={faThumbsUp} className="iconColor" />{ JSON.stringify(detail.likes) }
                                </button>
                                <button className="buttonLikeDislike" onClick={submitDislike}><FontAwesomeIcon icon={faThumbsDown} className="iconColor" />{ JSON.stringify(detail.dislikes) }
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )} else{
    return (
      <>
        <main>
          <div className="postGridDetail">
            <div className="gridDetail">
              <div className="divCard">
                <div className="profilPost">
                  <ul className="listPost">
                    <li>
                      <img className="imgProfil" src={ `https://ui-avatars.com/api/?name=${detail.userName}` } alt="profil"/>
                    </li>
                    <li>
                      <p className="nameProfil">{ detail.userName }</p>
                    </li>
                    <li>
                      <p className="hourPost">{ hour }</p>
                    </li>
                  </ul>
                </div>
                <div className="divFigureCenter">
                  <div className="divFigureWidth">
                    <h1 className="titlePost">{ detail.title }</h1>
                    <figure>
                      { mediaText() }
                      <figcaption>
                        <div className="styleIconLike">
                          <div className="divIconLike">
                            <div className="divIconNumber">
                              <div className="likeDislike">
                                <button className="buttonIcon"><FontAwesomeIcon icon={ faThumbsUp } className="iconColor" />{ JSON.stringify(detail.likes) }</button>
                                <button className="buttonIcon"><FontAwesomeIcon icon={ faThumbsDown } className="iconColor"/>{ JSON.stringify(detail.dislikes) }</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}

export default DetailPosts;
