//import LazyLoad from 'react-lazyload'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import '../../utils/styles/post.css'
//import Post from '../../components/post'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


function Home({ getPost}) {
  const [ isHidden, setIsHidden ] = useState(false);
  const { register, handleSubmit } = useForm();
  const userstatus = localStorage.getItem("status");

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
                      <p className="texticon">Ajouter une photo ou un texte</p>
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
                    <p>ou</p>
                    <div className="divtext">
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                      />
                      <label form='citation'>
                        <textarea
                          id="citation"
                          className="textcitation"
                          {...register("sentence")}
                        />
                      </label>
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
