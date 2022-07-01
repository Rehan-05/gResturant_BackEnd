import http from '../util/http-common';

class ApiContainerClass {

  SignUp = (data) => {
    return http.post('/auth/signup', data);
  };

  Restaurant_Add = (data, token) => {
    const header = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    };
    return http.post(`/addRestaurant`, data, { headers: header });
    // return http.post(`/Members/get/${company}`, { headers: header });
  }
  Get_Restaurant = (token) => {
    const header = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    };
    return http.get(`/getRestaurants`, { headers: header });
  }

}
export default new ApiContainerClass();