import styled from 'styled-components'
import colors from '../../utils/styles/colors'


const CommentPost = styled.div`
  width: 900px;
  height: 300px;
  background-color: ${colors.white};
`

function Comment() {
  return(
    <CommentPost>
      <div>
        <h3>Jean-Marc</h3>
        <p>Cute :-)</p>
      </div>
      <input />
    </CommentPost>
  )
}

export default Comment
