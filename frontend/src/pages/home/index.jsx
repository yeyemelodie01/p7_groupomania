//import LazyLoad from 'react-lazyload'
import { useForm } from 'react-hook-form'
import { useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import '../../utils/styles/home.css'
//import Post from '../../components/post'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Home(getPost) {
  const [ isHidden, setIsHidden ] = useState(false);
  const { register, handleSubmit } = useForm();
  const [ radioValue, setRadioValue ] = useState(false);
  const [ textEdit, setTextEdit ] = useState("");
  let userDetails = JSON.parse(localStorage.getItem('user'));


  const onSubmit = (data) => {
    const choice = localStorage.getItem("choice");
    const formData = new FormData();

    // if(choice === 'img'){
    //   formData.append('title', data.title);
    //   formData.append('file', data.img[0]);
    //
    //   axios
    //     .post("http://localhost:4000/api/post", formData)
    //     .then(() => {
    //           getPost();
    //           console.log(formData);
    //     })
    //     .catch((err) =>{
    //       console.log(err);
    //     });
    // }

    if ('text' === choice) {
      const dataToSend = {
        "userId": userDetails._id,
        "postType": 'text',
        "post": {
          "title": data.title,
          "text": textEdit
        }
      }
      axios
        .post("http://localhost:4000/api/posts/create", dataToSend, { headers: { Authorization: 'Bearer ${userDetails.jwt}' } })
        .then(() => {
          axios
            .post("http://localhost:4000/api/posts/create", dataToSend, { headers: { Authorization: 'Bearer ${userDetails.jwt}' } })
            .then(() => {
              getPost();
              console.log(formData);
            })
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
                            id="title"
                            className="sizeinput"
                            type="text"
                            placeholder="Titre"
                            maxLength="280"
                            {...register("title")}
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
          {/*{postList.map((post, index) =>
            <LazyLoad height={200} offset={100}>
              <Post
                key={`${post.name}-${index}`}
                nameUser={post.username}
                picture={post.picture}
                picturePost={post.picturePost}
                hour={post.hour}
                title={post.title}
              />
            </LazyLoad>
          )}*/}
      </main>
    } else {
      return  <div className="buttondiv">
                  <p>Vous devez vous connecter pour créer un post</p>
              </div>
    }
}

export default Home;
