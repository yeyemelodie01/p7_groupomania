import '../../utils/styles/detailposts.css'
import '../../utils/styles/post.css'
import { useEffect, useState } from 'react'
import Card from '../../components/cardposts'
import moment from 'moment';
import axios from 'axios'

function DetailPosts() {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const url = document.location.pathname;
    const splitUrl = url.split('/detail/');
    const sliceSplit = splitUrl.slice(1);
    const postId = String(sliceSplit);

    axios
      .get(`http://localhost:4000/api/posts/${postId}`)
      .then((res) => {
        setDetail(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },[]);

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

  return (
    <main>
      <div className="postGridDetail">
        <div className="gridDetail">
          <div className="divCard">
            <Card
              key={detail._id}
              title={detail.title}
              media={detail.media}
              text={detail.text}
              username={detail.userName}
              hour={hour}
              avatar={`https://ui-avatars.com/api/?name=${detail.userName}`}
              like={ JSON.stringify(detail.likes) }
              dislike={ JSON.stringify(detail.dislikes) }
              postsId={ detail._id }
              userId={ detail.userId }
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DetailPosts;
