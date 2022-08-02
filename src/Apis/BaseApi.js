import { create } from 'apisauce';

const BaseApi = create({

  baseURL: 'http://localhost:5277/api/',
  // baseURL: 'https://ms.appwrk.eu/api/',

});

export {
  BaseApi,

}
  