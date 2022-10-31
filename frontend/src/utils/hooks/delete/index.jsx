import axios from 'axios'

function postDelete() {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  let postsId = localStorage.getItem("postId");
  axios
    .delete(`http://localhost:4000/api/posts/${postsId}`, {
      headers: {
        Authorization: `Bearer ${userDetails.jwt}`
      }
    })
    .then(() => {
      alert("Votre post a bien été supprimer")
      window.location.href='/';
    })
    .catch((err) => {
      console.log(err);
    })
}

export default postDelete;
