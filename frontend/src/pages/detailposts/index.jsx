import Profil from '../../assets/jeet-tandel-ObP_fwHNCSw-unsplash.jpg'
import '../../utils/styles/detailposts.css'
import '../../utils/styles/post.css'
import { useEffect, useState } from 'react'
import Card from '../../components/cardposts'
import moment from 'moment';
import axios from 'axios'

function DetailPosts() {
  const [detail, setDetail] = useState('');
  let userDetails = localStorage.getItem('user')

  useEffect(() => {
    let postsId = localStorage.getItem("postId");
    axios
      .get(`http://localhost:4000/api/posts/${postsId}`)
      .then((res) => {
        setDetail(res.data)
        if(res.data.media){
          localStorage.setItem('media', res.data.media.url);
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const cloudMedia = localStorage.getItem('media');

  const date1 = moment(detail.createdAt);
  const date2 = moment(Date.now());
  let hours = date2.diff(date1, 'minutes');
  let hour;

  if (0 <= hours) {
    hour = hours + "min";
  }

  if( 60 <= hours) {
    hour = date2.diff(date1, 'hours') + "h";
  }

  if (1440 <= hours) {
    hour = date2.diff(date1, 'days') + "j";
  }

  if(userDetails){
    if(userDetails.username === detail.userName){
      return(
        <main>
          <div className="postgrid">
            <div className="grid">
              <div className="postdivdetail">
                <Card
                  key={detail.id}
                  title={detail.title}
                  media={cloudMedia}
                  text={detail.text}
                  username={detail.userName}
                  hour={hour}
                  avatar={`https://ui-avatars.com/api/?name=${detail.userName}`}
                  like={ JSON.stringify(detail.likes) }
                  dislike={ JSON.stringify(detail.dislikes) }
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
              <div className="postdivdetail">
                <Card
                  key={detail.id}
                  title={detail.title}
                  media={cloudMedia}
                  text={detail.text}
                  username={detail.userName}
                  hour={hour}
                  avatar={`https://ui-avatars.com/api/?name=${detail.userName}`}
                  like={ JSON.stringify(detail.likes) }
                  dislike={ JSON.stringify(detail.dislikes) }
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
  } else {
    return (
      <main>
        <div className="postgrid">
          <div className="grid">
            <div className="postdivdetail">
              <Card
                key={detail.id}
                title={detail.title}
                media={cloudMedia}
                text={detail.text}
                username={detail.userName}
                hour={hour}
                avatar={`https://ui-avatars.com/api/?name=${detail.userName}`}
                like={ JSON.stringify(detail.likes) }
                dislike={ JSON.stringify(detail.dislikes) }
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
