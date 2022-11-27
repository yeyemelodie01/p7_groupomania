import axios from 'axios'

function submitDislike(postId) {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const like = {
    "userId": userDetails._id,
    "like": -1
  }

  axios
    .post(`http://localhost:4000/api/posts/${postId}/like`, like ,{
      headers: {
        Authorization: `Bearer ${userDetails.jwt}`,
      }
    })
    .then((res) => {
      document.getElementById('likeSpan'+postId).innerHTML = res.data.likes;
      document.getElementById('dislikeSpan'+postId).innerHTML = res.data.dislikes;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default submitDislike;
