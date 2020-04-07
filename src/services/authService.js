import axios from 'axios';

export default class AuthService {

  loginUser(login, password) {
    return new Promise(((resolve, reject) => {
      setTimeout(async () => {
        const res = await axios
          .get('./users.json')
          .catch(() => {
            throw new Error('Could not fetch users');
          });
        const users = await res.data;

        const correctUser = users.filter(user => (user.login === login && user.password === password));
        
        if (correctUser.length) {
          const userToken = correctUser[0].userToken;
          localStorage.setItem('userToken', userToken.toString());
          resolve(correctUser[0]);
        }
        else {
          reject("Incorrect login or password");
        }

      }, Math.random() * 3000); // Рандомное время ождидания для правдоподобности
    }))
  }

  async getUserInfo(userToken) {
    const res = await axios
      .get('./users.json')
      .catch(() => {
        throw new Error('Could not fetch users');
      });
    const users = await res.data;

    return users.filter(user => (user.userToken === userToken))[0];
  }
}