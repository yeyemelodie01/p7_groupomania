import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import ImgPost from '../../assets/marcel-eberle-n4boKCT_RLk-unsplash.jpg'
import colors from '../../utils/styles/colors'

const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`

const Grid1 = styled.div`
  grid-area: 1 / 1 / 2 / 6;
  background-color: aquamarine;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

const Grid2 = styled.div`
  grid-area:   2 / 2 / 6 / 5;
  background-color: darkcyan;
  display: flex;
  justify-content: center;
  padding: 30px 0;
`

const CreatePost = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 17px;
  border-radius: 19px;
  border: none;
  font-size: 14px;
  color: ${colors.black};
  box-shadow: 8px 8px 10px #aaa;
  background: ${colors.secondary};
  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
  cursor: pointer;
  width: 192px;
  height: 30px;
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
  padding: 10px 10px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
`

const PostProfil = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 40px;
`

const ImgProfil = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 80px 80px 80px 80px;
`

const NameProfil = styled.p`
  
`

const PostHour = styled.p`
  
`

const PostTitle = styled.h1`
  font-weight: bold;
`

const FigurePost = styled.figure`
  
`

const LikeDislike = styled.div`

`

const CommentPost = styled.div`
  width: 900px;
  height: 300px;
  background-color: ${colors.white};
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
                <img src={ ImgPost } alt="born" />
                <figcaption>
                  <LikeDislike>
                    <FontAwesomeIcon icon={ faThumbsUp } />
                    <FontAwesomeIcon icon={ faThumbsDown } />
                  </LikeDislike>
                  <CommentPost>

                  </CommentPost>
                </figcaption>
              </FigurePost>
            </Post>
          </Grid2>
        </ParentGrid>
      </main>
  )
}

export default Home;
