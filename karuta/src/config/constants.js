// API root
let API_ROOT = 'http://127.0.0.1:8000/api';

if(process.env.NODE_ENV === 'production'){
  API_ROOT = 'https://fierce-hollows-19151.herokuapp.com/api'
} 

export { API_ROOT };


// named urlpattern => endpoint mappings 
export const endpoint = {
  'fetch-poem' 	 : API_ROOT + '/poems/',
  'fetch-poems'  : API_ROOT + '/poems',
};


// named urlpattern => action type mappings  
export const actionType = {
  // requests 
  'data-request' : 'DATA_REQUEST',
  // responses
  'data-success' : 'DATA_SUCCESS',
  'data-failure' : 'DATA_FAILURE',
  // CRUD 
  'fetch-poem'   : 'FETCH_POEM',
  'fetch-poems'  : 'FETCH_POEMS',
};



