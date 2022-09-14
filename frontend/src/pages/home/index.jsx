//import LazyLoad from 'react-lazyload'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import '../../utils/styles/post.css'
//import Post from '../../components/post'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



function Home({ getPost}) {
  const [ isHidden, setIsHidden ] = useState(false);
  const { register, handleSubmit } = useForm();
  const userstatus = localStorage.getItem("status");
  const [ radioValue, setRadioValue ] = useState(false);

  const onSubmit = (data) => {
    console.log(data)
    const formData = new FormData();
      formData.append('title', data.title);
      formData.append('file', data.img[0]);
      formData.append('sentence', data.text);
      axios
        .post("http://localhost:4000/api/post/", formData)
        .then(() => {
          getPost();
          console.log(formData);
        })
        .catch((err) =>{
          console.log(err);
        });
    };

  const handleChange = (e) => {
    setRadioValue(e.target.value);
    localStorage.setItem("choice", e.target.value)
  }
  const userchoice = localStorage.getItem("choice");
  console.log(userchoice)

    if(userstatus) {
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
                <h1>Créer un post</h1>
                <form className="formflex"
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form/data"
                >
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
                          className="sizeinput"
                          type="file"
                          {...register("img")}
                        />
                      </label>
                    </div>
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
                        data="<p>Ecrivez votre texte</p>"
                        onReady={ editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                          const data = editor.getData();
                          console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                          console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                          console.log( 'Focus.', editor );
                        } }
                      />
                    </div>
                    <button className="stylebutton" type="submit" onClick={() => {}}>Envoyer</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </main>
    } else {
      return  <div className="buttondiv">
                  <p>Vous devez vous connecter pour créer un post</p>
              </div>
    }
}

export default Home;
