//import LazyLoad from 'react-lazyload'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import colors from '../../utils/styles/colors'
//import Post from '../../components/post'




const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr; 
  grid-column-gap: 0;
  grid-row-gap: 0;
`

const Grid1 = styled.div`
  grid-area: 1 / 1 / 2 / 6;
  margin-bottom: 50px;
`

const DivButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`

const PostButton = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 17px;
  border-radius: 19px;
  border: none;
  font-size: 22px;
  color: ${colors.white};
  box-shadow: 8px 8px 10px #aaa;
  background: ${colors.navyblue};
  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
  cursor: pointer;
  width: 250px;
  height: 60px;
  &:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
`

const HiddenDiv = styled.div`
  display: none;
`

const CreatePost = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const FormFlex = styled.form`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 4px ${colors.navyblue} solid;
  border-radius: 10px;
`

const DivSize = styled.div`
  width: 494px;
  height: 50px;
  margin-bottom: 40px;
`

const DivSize2 = styled.div`
  width: 900px;
  background-color: ${colors.secondary};
  color: ${colors.navyblue};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`

const DivSize3 = styled.div`
  width: 400px;
  margin-bottom: 20px;
`

const DivSize4 = styled.div`
  width: 400px;
  margin-top: 20px;
  margin-bottom: 40px;
  
  .textcitation {
    width: 417px;
    height: 45px;
  }
`

const DivIcon = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
  
  .texticon {
    font-size: 26px;
    font-weight: bold;
    margin-top: 12px;
    margin-bottom: 0;
  }
`

const InputSize = styled.input`
  width: 100%;
  height: 100%;
  font-size: 24px;
`
const IconSize = styled.div`
  font-size: 50px;
`

const StyleButton = styled(PostButton)`
  width: 215px;
  height: 75px;
  font-size: 23px;
  font-weight: bold;
  background-color: transparent;
  box-shadow: none;
  border: 4px ${colors.navyblue} solid;
  color: ${colors.navyblue};
  margin: 0 auto;
  margin-bottom: 40px;
`

function Home({ getPost}) {
  const [ isHidden, setIsHidden ] = useState(false);
  const { register, handleSubmit } = useForm();

  function ButtonPost(props){
    const isLogin = props.isLogin;

    if (isLogin){
      return ButtonPost;
    }
  }



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

 /* useEffect(() => {
    async function fetchHome() {
      try {
        const response = await fetch(`http://localhost:8000/api/post`)
        const { postList } = await response.json()
        setPostList(postList)
      } catch (err) {
        console.log(err)
      }
    }
    fetchHome()
  }, [])*/

  return(
      <main>
        <ParentGrid>
          <Grid1>
            <DivButton>
              <ButtonPost isLogin={false}>
                <PostButton onClick={() => setIsHidden((s) => !s)}>
                  <FontAwesomeIcon icon={ faCirclePlus } />
                  Créer un post
                </PostButton>
              </ButtonPost>
            </DivButton>
            <HiddenDiv style={{display: isHidden ? 'block' : 'none'}}>
              <CreatePost>
                <h1>Créer un post</h1>
                <FormFlex
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form/data"
                >
                  <DivSize>
                    <label form='title'>
                      <InputSize
                        id="title"
                        type="text"
                        placeholder="Titre"
                        maxLength="280"
                        {...register("title")}
                      />
                    </label>
                  </DivSize>
                  <DivSize2>
                    <DivIcon>
                      <IconSize>
                        <FontAwesomeIcon icon={ faImage } />
                      </IconSize>
                      <p className="texticon">Ajouter une photo ou un texte</p>
                    </DivIcon>
                    <DivSize3>
                      <label form='img'>
                        <InputSize
                          id="img"
                          type="file"
                          {...register("img")}
                        />
                      </label>
                    </DivSize3>
                    <p>ou</p>
                    <DivSize4>
                      <label form='citation'>
                        <textarea
                          id="citation"
                          className="textcitation"
                          {...register("sentence")}
                        />
                      </label>
                    </DivSize4>
                    <StyleButton type="submit" onClick={() => {}}>Envoyer</StyleButton>
                  </DivSize2>
                </FormFlex>
              </CreatePost>
            </HiddenDiv>
          </Grid1>
        </ParentGrid>
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
  )
}

export default Home;
