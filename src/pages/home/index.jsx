import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import ImgPost from '../../assets/marcel-eberle-n4boKCT_RLk-unsplash.jpg'

const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const Grid1 = styled.div`
   grid-area: 1 / 1 / 2 / 6;
   background-color: #00b894;
`

const Grid2 = styled.div`
  grid-area: 2 / 2 / 6 / 5;
  background-color: #6c5ce7;
`

const Grid3 = styled.div`
  grid-area: 2 / 2 / 6 / 5;
  background-color: #00cec9;
`

const Grid4 = styled.div`
  grid-area: 2 / 5 / 6 / 6;
  background-color: #D1515A;
`

const CreatePost = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 17px;
  margin: 38px 0;
  border-radius: 19px;
  border: none;
  font-size: 14px;
  color: $black;
  box-shadow: 8px 8px 10px #aaa;
  background: $secondary;
  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
  cursor: pointer;
  width: 192px;
  &:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
`

const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: bisque;
  width: 90%;
  margin: 30px 0;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
`

const PostProfil = styled.div`
  margin: 20px 0 0 20px;
  display: flex;
  width: 200px;
  justify-content: space-between;
`

const ImgProfil = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 80px 80px 80px 80px;
`

const NameProfil = styled.p`
  width: 100px;
  height: 34px;
  display: flex;
  align-items: center;
`

const PostHour = styled.p`
  height: 34px;
  display: flex;
  align-items: center;
`

const PostTitle = styled.h1`
  font-weight: bold;
  margin-left: 20px;
`

const FigurePost = styled.figure`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

function Home() {
  return(
      <main>
        <ParentGrid>
          <Grid1>
            <CreatePost>
              <FontAwesomeIcon icon={ faCirclePlus } />
              Créer un poste
            </CreatePost>
          </Grid1>
          <Grid3>
            <ul>
              <li>Récent</li>
              <li>Changer de mode:</li>
            </ul>
          </Grid3>
          <Grid2>
            <Post>
              <PostProfil>
                <ImgProfil className="img_profil" src={ Profil } alt="profil" />
                <NameProfil className="name_profil">Mélodie</NameProfil>
                <PostHour className="hour-post">
                  5h
                </PostHour>
              </PostProfil>
              <PostTitle className="title_post">Titre du poste</PostTitle>
              <FigurePost>
                <div className="img_post">
                  <img src={ ImgPost } alt="born" />
                </div>
                <figcaption>
                  <div className="like_dislike">
                    <FontAwesomeIcon icon={ faThumbsUp } />
                    <FontAwesomeIcon icon={ faThumbsDown } />
                  </div>
                  <div className='comment_post'/>
                </figcaption>
              </FigurePost>
            </Post>
          </Grid2>
          <Grid4 className="div4">

          </Grid4>
        </ParentGrid>
      </main>
  )
}

export default Home;
