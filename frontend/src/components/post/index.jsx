import styled from 'styled-components'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import ImgPost from '../../assets/marcel-eberle-n4boKCT_RLk-unsplash.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const Grid1 = styled.div`
  grid-area: 1 / 2 / 6 / 5;
`

const PostDiv = styled.div`
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

function Post() {
  return(
    <ParentGrid>
      <Grid1>
        <PostDiv>
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
            </figcaption>
          </FigurePost>
        </PostDiv>
      </Grid1>
    </ParentGrid>
  )
}

export default Post
