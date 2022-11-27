import { useForm } from 'react-hook-form'
import { useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import '../../utils/styles/home.css'
import Post from '../../components/post'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Home() {
  const [ isHidden, setIsHidden ] = useState(false);
  const { register, handleSubmit } = useForm();
  const [ radioValue, setRadioValue ] = useState(false);
  const [ textEdit, setTextEdit ] = useState('');
  const [file, setFile] = useState();
  let userDetails = JSON.parse(localStorage.getItem('user'));

  function handleFileChange(event) {
    setFile(event.target.files)
  }

  const onSubmit = (data) => {
    const choice = localStorage.getItem("choice");
    if('img' === choice) {
      const formData = new FormData();
      formData.append("userId", userDetails._id);
      formData.append("userName", userDetails.userName);
      formData.append("postType", "media");
      formData.append("title", data.title);
      formData.append("files", data.img[0]);
      axios
          .post("http://localhost:4000/api/posts", formData, {
            headers: {
              Authorization: `Bearer ${userDetails.jwt}`,
              "Content-Type": "multipart/form-data"
            }
          })
          .then(() => {
            window.location.href='/';
          })
          .catch((err) => {
            document.getElementById('titleErr').innerHTML = "Titre deja ajouter";
            console.log(err);
          });
    }

    if ('text' === choice) {
      const dataToSend = {
        "userId": userDetails._id,
        "userName": userDetails.userName,
        "postType": 'text',
        "post": {
          "title": data.textTitle,
          "text": textEdit
        }
      }
      axios
        .post("http://localhost:4000/api/posts", dataToSend, {headers: {Authorization: `Bearer ${userDetails.jwt}`}})
        .then(() => {
          window.location.href='/';
        })
        .catch((err) => {
          document.getElementById('titleErr').innerHTML = "Titre deja ajouter";
          console.log(err);
        });
    }
  }

  function showChoice(){
    const userchoice = localStorage.getItem("choice");

    if(userchoice === 'img'){
      document.getElementById('uploadImg').style.display='block';
      document.getElementById('textWisywig').style.display='none';
    }

    if(userchoice === 'text') {
      document.getElementById('textWisywig').style.display='block';
      document.getElementById('uploadImg').style.display='none';
    }
  }

  const handleChange = (e) => {
    setRadioValue(e.target.value);
    localStorage.setItem("choice", e.target.value)
    showChoice();
  }

    if(userDetails) {
     return (
      <main>
        <div className="parentGrid">
          <div className="grid1">
                  <div className="buttonDiv">
                    <button className="buttonPost" onClick={() => setIsHidden((s) => !s)}>
                      <FontAwesomeIcon icon={ faCirclePlus } />
                      <h1>Créer un post</h1>
                    </button>
                  </div>
                  <div className="hiddenDiv" style={{display: isHidden ? 'block' : 'none'}}>
                    <div className="postCreate">
                      <form className="formFlex"
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form/data"
                      >
                        <div id="radioChoice">
                          <div className="radioDisplay">
                            <h2 className="textIcon">Choisissez entre une image ou un texte</h2>
                            <div className="radioDiv">
                              <label form='radio'>
                                <input
                                  id="radio"
                                  type="radio"
                                  value="img"
                                  checked={ radioValue === 'img' }
                                  onChange={ handleChange }
                                /> Image
                              </label>
                              <label form='radio'>
                                <input
                                  id="radio"
                                  type="radio"
                                  name="text"
                                  value="text"
                                  checked={ radioValue === 'text' }
                                  onChange={ handleChange }
                                /> Texte
                              </label>
                            </div>
                          </div>
                        </div>
                        <div id="uploadImg">
                          <div className="divUploadImg">
                            <div className="divTitle">
                              <label form='title'>Titre du Post :
                                <input
                                  id="title"
                                  className="sizeInput"
                                  type="text"
                                  placeholder="Écrivez votre titre"
                                  maxLength="30"
                                  {...register("title")}
                                />
                              </label>
                              <span id="titleErr" className="errTitle"></span>
                            </div>
                            <div className="divImgText">
                              <div className="divUpload">
                                <label form="img" className="labelIcon">
                                  <div className="iconSize">
                                    <FontAwesomeIcon icon={ faImage } />
                                    <h2>Insérer une image</h2>
                                  </div>
                                  <input
                                    id="img"
                                    className="sizeInputImg"
                                    type="file"
                                    value={ file }
                                    onChange={ handleFileChange }
                                    {...register("img")}
                                  />
                                </label>
                              </div>
                                <button className="styleButton" type="submit" onClick={() => {}}>Envoyer</button>
                          </div>
                        </div>
                        </div>
                        <div id="textWisywig">
                          <div className="divWisywig">
                            <div className="divTitle">
                              <label form='title'>Titre du Post :
                                <input
                                  id="textTitle"
                                  className="sizeInput"
                                  type="text"
                                  placeholder="Écrivez votre titre"
                                  maxLength="30"
                                  {...register("textTitle")}
                                />
                              </label>
                              <span id="titleErr" className="errTitle"></span>
                            </div>
                            <div className="divTextWis">
                              <CKEditor
                                editor={ ClassicEditor }
                                id={'editor'}
                                config={{
                                  placeholder: "Ecrivez votre texte",
                                  toolbar: [ 'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', '|', 'undo', 'redo', ]
                                }}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setTextEdit(data);
                                }}
                              />
                            </div>
                              <button className="styleButton" type="submit" onClick={() => {}} >Envoyer</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
             <div>
               <div className='scrollContainer'>
                   <Post />
               </div>
             </div>
      </main>)
    } else {
      return(
        <div>
          <div className="titleDiv">
            <h1>Vous devez vous connecter pour créer et aimer un post</h1>
          </div>
          <div className='scrollContainer'>
              <Post />
          </div>
      </div>
      )}
}

export default Home;
