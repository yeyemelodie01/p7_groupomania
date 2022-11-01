import { useEffect, useState } from 'react'
import axios from 'axios'

function Cardcomments({comment, userId}){
  const [ user, setUser ] = useState("");
  useEffect(() => {
    axios
      .get('http://localhost:4000/users', userId)
      .then((res) => {
        setUser(res.data)
      })
  })

  console.log(user);
 return(
   <>
   <div>
     <ul className="listpost">
       <li>
         <img className="imgprofil" src={ `https://ui-avatars.com/api/?name=${user.username}` } alt="profil"/>
       </li>
       <li>
         <p className="nameprofil">{ user.username }</p>
       </li>
     </ul>
   </div>
  <div className="divpaddingcomments">
    <div className="profilpostcomments">
      <p>{ comment}</p>
    </div>
  </div>
</>
 )
}

export default Cardcomments
