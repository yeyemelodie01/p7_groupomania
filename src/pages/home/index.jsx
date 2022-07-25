import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
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
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
        </ParentGrid>
        <Post />
      </main>
  )
}

export default Home;
