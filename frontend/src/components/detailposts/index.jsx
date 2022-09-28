import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/detailposts.css'
import '../../utils/styles/post.css'
import { useEffect, useState } from 'react'
import Card from '../cardposts'

function DetailPosts() {
  const [detail, setDetail] = useState('');
  let userDetails = localStorage.getItem('user')

  useEffect(() => {
    let postsId = localStorage.getItem("postId");
    fetch(`http://localhost:4000/api/posts/${postsId}`)
      .then((res) => res.json())
      .then((detail) => {
        setDetail(detail)
      })
  }, [])

  if(userDetails){
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
                <label form="textcomments">
                  <textarea id='textcomments'/>
                </label>
                <div>
                  <button>Annuler</button>
                  <button>Commenter</button>
                </div>
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
  } else {
    return (
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
}

export default DetailPosts
