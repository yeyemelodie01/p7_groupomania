import styled from 'styled-components'
import PropTypes from 'prop-types'
import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import ImgPost from '../../assets/marcel-eberle-n4boKCT_RLk-unsplash.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Comment from '../comments'

const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const Grid1 = styled.div`
  grid-area: 1 / 2 / 6 / 5;
  display: flex;
  justify-content: center;
`

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: bisque;
  width: 100%;
  padding: 16px 40px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
`

const PostProfil = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
`

const ListPost = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 100%;
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
  margin: auto 0;
`

const LikeDislike = styled.div`
  display: flex;
  margin: 10px 0;
  font-size: 25px;
  
  .margin-icon {
    margin-right: 10px;
  }
`

function Post({ picture, picturePost, nameUser, hour, title }) {
  return(
    <ParentGrid>
      <Grid1>
        <PostDiv>
          <PostProfil>
            <ListPost>
              <li>
                <ImgProfil src={ picture } alt="profil"/>
              </li>
              <li>
                <NameProfil>{nameUser}</NameProfil>
              </li>
              <li>
                <PostHour>{hour}</PostHour>
              </li>
            </ListPost>
          </PostProfil>
          <PostTitle className="title_post">{title}</PostTitle>
          <FigurePost>
            <img src={ picturePost } alt="born" />
            <figcaption>
              <LikeDislike>
                <FontAwesomeIcon icon={ faThumbsUp } className="margin-icon" />
                <FontAwesomeIcon icon={ faThumbsDown } />
              </LikeDislike>
              <div>
                <Comment />
              </div>
            </figcaption>
          </FigurePost>
        </PostDiv>
      </Grid1>
    </ParentGrid>
  )
}

Post.prototype = {
  picture: PropTypes.string,
  picturePost: PropTypes.string,
  nameUser: PropTypes.string,
  hour: PropTypes.number,
  title: PropTypes.string,
}

Post.defaultProps = {
  picture: Profil,
  picturePost: ImgPost,
  nameUser: '',
  hour: '',
  title: '',
}

export default Post
