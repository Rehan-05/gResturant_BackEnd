import http from '../util/http-common';

class ApiContainerClass {

  SignUp = (data) => {
    return http.post('/auth/signup', data);
  };

}
export default new ApiContainerClass();