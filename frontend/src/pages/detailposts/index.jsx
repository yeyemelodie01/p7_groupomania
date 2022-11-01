import '../../utils/styles/detailposts.css'
import '../../utils/styles/post.css'
import { useEffect, useState } from 'react'
import Card from '../../components/cardposts'
import moment from 'moment';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Cardcomments from '../../components/cardcomments'
import parse from 'html-react-parser'

function DetailPosts() {
  const [detail, setDetail] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const { handleSubmit} = useForm();
  const [ textComment, setTextComment ] = useState("");

  useEffect(() => {
    const postsId = localStorage.getItem("postId");
    axios
    .get(`http://localhost:4000/api/posts/${postsId}`)
    .then((res) => {
      setDetail(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[]);

  const postComment = () => {
    const postsId = localStorage.getItem("postId");
    const userComment = {
      "userId" : userDetails._id,
      "comment" : textComment
    }
    axios
      .post(`http://localhost:4000/api/posts/${postsId}/comment`, userComment, {
        headers: {
          Authorization: `Bearer ${userDetails.jwt}`,
        }
      })
      .then(() => {
        //window.location.href='/';
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  const useComment = detail.comments;
  const finalObj= {};
  for(let i = 0; i < useComment.length; i++ ) {
    Object.assign(finalObj, useComment[i]);
  }

  if(userDetails){
      return(
        <main>
          <div className="postgrid">
            <div className="griddetail">
                <Card
                  key={detail.id}
                  userid={detail.userId}
                  title={detail.title}
                  media={detail.media}
                  text={detail.text}
                  username={detail.userName}
                  hour={hour}
                  avatar={`https://ui-avatars.com/api/?name=${detail.userName}`}
                  like={ JSON.stringify(detail.likes) }
                  dislike={ JSON.stringify(detail.dislikes) }
                  commentNum={JSON.stringify(useComment.length)}
                />
                <div>
                  <form onSubmit={handleSubmit(postComment)}>
                    <div id="textupdate">
                      <div className="divwisywig">
                        <div className="divtext">
                          <CKEditor
                            editor={ ClassicEditor }
                            id={'editor'}
                            config={{
                              placeholder: "Ecrivez votre texte",
                              removePlugins: [
                                'MediaEmbed', 'Link', 'Image', 'EasyImage', 'CKFinder',
                                'ImageUpload', 'ImageToolbar', 'ImageStyle',
                                'ImageCaption'
                              ],
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              setTextComment(data)
                            }}
                          />
                        </div>
                        <button className="stylebutton" type="submit" onClick={() => {}} >Envoyer</button>
                        {/*<button className="stylebutton" type="submit" onClick={ cancelChoice }>Annuler</button>*/}
                      </div>
                    </div>
                  </form>
                  <div className="divprofilcomments">
                    <Cardcomments
                      key={finalObj.id}
                      comment={parse(finalObj.comment)}
                    />
                </div>
                </div>
            </div>
          </div>
        </main>
      )
    } else {
    return (
      <main>
        <div className="postGrid">
          <div className="gridDetail">
            <Card
              key={detail.id}
              title={detail.title}
              media={detail.media}
              text={detail.text}
              username={detail.userName}
              hour={hour}
              avatar={`https://ui-avatars.com/api/?name=${detail.userName}`}
              like={ JSON.stringify(detail.likes) }
              dislike={ JSON.stringify(detail.dislikes) }
              commentNum={ JSON.stringify(useComment.length) }
            />
              <div id="commentable">
                <div className="divProfilComments">
                  <Cardcomments
                    key={finalObj.id}
                    comment={parse(finalObj.comment)}
                  />
                </div>
              </div>
          </div>
        </div>
      </main>
    )
  }
}

export default DetailPosts
