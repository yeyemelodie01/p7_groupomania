import axios from 'axios'

const Login = (email, password ) => {
  return axios
    .post("http://localhost:4000/api/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if(response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
};

const authLog = Login;

export default authLog;
