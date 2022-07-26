import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import colors from '../../utils/styles/colors'
import Post from '../../components/post'

const ParentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr; 
  grid-column-gap: 0;
  grid-row-gap: 0;
`

const Grid1 = styled.div`
  grid-area: 1 / 1 / 2 / 6;
  background-color: aquamarine;
  margin-bottom: 50px;
  padding-bottom: 50px;
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
  color: ${colors.black};
  box-shadow: 8px 8px 10px #aaa;
  background: ${colors.secondary};
  transition-property: transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
  cursor: pointer;
  width: 250px;
  height: 50px;
  &:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
`

const CreatePost = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const FormFlex = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 4px ${colors.grey} solid;
  border-radius: 10px;
`

const DivSize = styled.div`
  width: 494px;
  height: 50px;
  margin-bottom: 40px;
`

const DivSize2 = styled.div`
  width: 399px;
  height: 50px;
  margin-bottom: 40px;
`

const InputSize = styled.input`
  width: 100%;
  height: 100%;
  font-size: 24px;
`
const IconSize = styled.div`
  font-size: 50px;
`

const StyleButton = styled.button`
  width: 215px;
  height: 75px;
  font-size: 23px;
  font-weight: bold;
  background-color: ${colors.navyblue};
  border: none;
  color: ${colors.white};
  margin: 0 auto;
`

function Home() {
  return(
      <main>
        <ParentGrid>
          <Grid1>
            <DivButton>
              <PostButton onClick={}>
                <FontAwesomeIcon icon={ faCirclePlus } />
                Créer un poste
              </PostButton>
            </DivButton>
            <CreatePost>
              <h1>Créer un post</h1>
              <FormFlex>
                <DivSize>
                  <label form='title'>
                    <InputSize
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Titre"
                      maxLength="280"
                    />
                  </label>
                </DivSize>
                <IconSize>
                  <FontAwesomeIcon icon={ faImage } />
                </IconSize>
                <DivSize2>
                  <label form='upload' placeholder="Ajouter une image">
                    <InputSize id="upload" type="file" name="file"/>
                  </label>
                </DivSize2>
                <StyleButton>Envoyer</StyleButton>
              </FormFlex>
            </CreatePost>
          </Grid1>
        </ParentGrid>
        <Post />
      </main>
  )
}

export default Home;
