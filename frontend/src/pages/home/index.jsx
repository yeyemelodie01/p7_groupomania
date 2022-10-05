import LazyLoad from 'react-lazy-load'
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
  const [ textEdit, setTextEdit ] = useState("");
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
          .post("http://localhost:4000/api/posts/create", formData, {
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
        .post("http://localhost:4000/api/posts/create", dataToSend, {headers: {Authorization: `Bearer ${userDetails.jwt}`}})
        .then(() => {
          window.location.href='/';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function showChoice(){
    const userchoice = localStorage.getItem("choice");

    if(userchoice === 'img'){
      document.getElementById('uploadimg').style.display='block';
      document.getElementById('textwisywig').style.display='none';
    }

    if(userchoice === 'text') {
      document.getElementById('textwisywig').style.display='block';
      document.getElementById('uploadimg').style.display='none';
    }
  }

  const handleChange = (e) => {
    setRadioValue(e.target.value);
    localStorage.setItem("choice", e.target.value)
    showChoice();
  }

    if(userDetails) {
     return <main>
        <div className="parentgrid">
          <div className="grid1">
            <div className="buttondiv">
              <button className="buttonpost" onClick={() => setIsHidden((s) => !s)}>
                <FontAwesomeIcon icon={ faCirclePlus } />
                Créer un post
              </button>
            </div>
            <div className="hiddendiv" style={{display: isHidden ? 'block' : 'none'}}>
              <div className="postcreate">
                <form className="formflex"
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form/data"
                >
                  <div id="radiochoice">
                    <div className="radiodisplay">
                      <h2 className="texticon">Choisissez entre une image ou un texte</h2>
                      <div className="radiodiv">
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
                  <div id="uploadimg">
                    <div className="divuploadimg">
                      <div className="divtitle">
                        <label form='title'>
                          <input
                            id="title"
                            className="sizeinput"
                            type="text"
                            placeholder="Titre"
                            maxLength="280"
                            {...register("title")}
                          />
                        </label>
                      </div>
                      <div className="divimgtext">
                        <div className="icondiv">
                          <div className="iconsize">
                            <FontAwesomeIcon icon={ faImage } />
                          </div>
                        </div>
                        <div className="divupload">
                          <label form='img'>
                            <input
                              id="img"
                              className="sizeinputimg"
                              type="file"
                              value={ file }
                              onChange={ handleFileChange }
                              {...register("img")}
                            />
                          </label>
                        </div>
                          <button className="stylebutton" type="submit" onClick={() => {}}>Envoyer</button>
                          {/*<button className="stylebutton" type="submit" onClick={ cancelChoice }>Annuler</button>*/}
                    </div>
                  </div>
                  </div>
                  <div id="textwisywig">
                    <div className="divwisywig">
                      <div className="divtitle">
                        <label form='title'>
                          <input
                            id="textTitle"
                            className="sizeinput"
                            type="text"
                            placeholder="Titre"
                            maxLength="280"
                            {...register("textTitle")}
                          />
                        </label>
                      </div>
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
              </div>
            </div>
          </div>
        </div>
       <div>
         <LazyLoad height={100}>
           <Post />
         </LazyLoad>
       </div>
      </main>
    } else {
      return <div>
                <div className="buttondiv">
                  <p>Vous devez vous connecter pour créer un post</p>
                </div>
                <LazyLoad height={100}>
                  <Post />
                </LazyLoad>
              </div>
    }
}

export default Home;
