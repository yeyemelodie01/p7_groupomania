import axios from 'axios'

function submitDislike() {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  let postsId = localStorage.getItem("postId");
  const like = {
    "userId": userDetails._id,
    "like": -1
  }
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

export default submitDislike;