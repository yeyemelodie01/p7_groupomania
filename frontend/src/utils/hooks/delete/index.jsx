import axios from 'axios'

function postDelete(postId) {
  const userDetails = JSON.parse(localStorage.getItem('user'));

  axios
    .delete(`http://localhost:4000/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${userDetails.jwt}`,
      },
      data: {
        userId: userDetails._id
      }
    })
    .then(() => {
      alert("Votre post a bien été supprimer")
      //window.location.href='/';
    })
    .catch((err) => {
      console.log(err);
    })
}

export default postDelete;
