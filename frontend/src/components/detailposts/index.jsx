import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/detailposts.css'
//import parse from 'html-react-parser'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import '../../utils/styles/post.css'
import { useEffect, useState } from 'react'
//import axios from 'axios'
import Card from '../cardposts'

function DetailPosts() {
  const [detail, setDetail] = useState('');

  useEffect(() => {
    let postsId = localStorage.getItem("postId");
    fetch(`http://localhost:4000/api/posts/${postsId}`)
      .then((res) => res.json())
      .then((detail) => {
        setDetail(detail)
      })
  }, [])

  // useEffect(() => {
  //   let postsId = localStorage.getItem("postId");
  //
  //   axios
  //     .get(`http://localhost:4000/api/posts/${postsId}`)
  //     .then((res) => {
  //       setDetail(res.data);
  //     })
  //     .catch(error => console.error(error))
  // }, [])

  console.log(detail.text);
    return(
      <main>
        <div className="postgrid">
          <div className="grid">
            <div className="postdiv">
              <Card
                key={detail.id}
                title={detail.title}
                media={detail.media}
                text={detail.text}
                username={detail.userName}
              />
              <div id="commentable">
                <div className="divprofilcomments">
                  <div className="divpaddingcomments">
                    <img className="profilcommentsimg" src={ Profil } alt="profil"/>
                    <div className="profilpostcomments">
                      <p>{}</p>
                    </div>
                  </div>
                </div>
                <div className="divprofilcomments">
                  <div className="divpaddingcomments">
                    <img className="profilcommentsimg" src={ Profil } alt="profil"/>
                    <div className="profilpostcomments">
                      <p>{}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
    // const usersDetails = localStorage.getItem("users");
    // if(!usersDetails) {
    //   return(
    //     <>
  //     )
  //   }
  //   return null;
  // })
  // if(userDetails){
  //   const text = parse(detail.text);
  //
  //   return (
  //     <main>
  //       <div className="postgrid">
  //         <div className="grid">
  //           <div className="postdiv">
  //             <div className="profilpost">
  //               <ul className="listpost">
  //                 <li>
  //                   <img className="imgprofil" src={ Profil } alt="profil"/>
  //                 </li>
  //                 <li>
  //                   <p className="nameprofil">{detail.userName}</p>
  //                 </li>
  //                 <li>
  //                   <p className="hourpost">2h</p>
  //                 </li>
  //               </ul>
  //             </div>
  //             <div className="divfigure">
  //               <h1 className="titlepost">{detail.title}</h1>
  //               <figure>
  //                 <div>{ text }</div>
  //                 <figcaption>
  //                   <div className="stylecomments">
  //                     <div className="divcomments">
  //                       <div className="diviconnumber">
  //                         <div className="likedislike">
  //                           <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsUp } className="iconcolor" />2</button>
  //                           <button className="buttonicon"><FontAwesomeIcon icon={ faThumbsDown } className="iconcolor"/>1</button>
  //                         </div>
  //                         <button className="number">2 commentaires</button>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </figcaption>
  //               </figure>
  //             </div>
  //             <div id="commentable">
  //               <label form="textcomments">
  //                 <textarea id='textcomments'/>
  //               </label>
  //               <div>
  //                 <button>Annuler</button>
  //                 <button>Commenter</button>
  //               </div>
  //               <div className="divprofilcomments">
  //                 <div className="divpaddingcomments">
  //                   <img className="profilcommentsimg" src={ Profil } alt="profil"/>
  //                   <div className="profilpostcomments">
  //                     <p>{}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="divprofilcomments">
  //                 <div className="divpaddingcomments">
  //                   <img className="profilcommentsimg" src={ Profil } alt="profil"/>
  //                   <div className="profilpostcomments">
  //                     <p>{}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   )
  // }}

export default DetailPosts
