import axios from 'axios'

function submitLike() {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  let postsId = localStorage.getItem("postId");
  const like = {
    "userId": userDetails._id,
    "like": 1
  }
  console.log(like);
  axios
    .post(`http://localhost:4000/api/posts/${postsId}/like`, like ,{
      headers: {
        Authorization: `Bearer ${userDetails.jwt}`,
      }
    })
    .then(() => {
      window.location.reload()
    })
    .catch((err) => {
      console.log(err);
    });
}

export default submitLike;
