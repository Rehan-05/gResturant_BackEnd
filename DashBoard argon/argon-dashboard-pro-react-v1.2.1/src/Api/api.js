import http from '../util/http-common';

class ApiContainerClass {

  SignUp = (data) => {
    return http.post('/auth/signup', data);
  };

  Restaurant_Add = (data, token) => {
    const header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/api/addRestaurant`, data, { headers: header });
    // return http.post(`/Members/get/${company}`, { headers: header });
  }

}
export default new ApiContainerClass();