// @flow
// API root
let API_ROOT = "http://127.0.0.1:8000/api";

if (process.env.NODE_ENV === "production") {
  API_ROOT = "https://fathomless-ravine-59797.herokuapp.com/api";
}

export { API_ROOT };

// named urlpattern => endpoint mappings
/* prettier-ignore */
export const endpoint = {
  FETCH_POEMS  : API_ROOT + "/poems"
};

// named urlpattern => action type mappings
/* prettier-ignore */
export const actionType = {
  // requests
  DATA_REQUEST : "DATA_REQUEST",
  // responses
  DATA_SUCCESS : "DATA_SUCCESS",
  DATA_FAILURE : "DATA_FAILURE",
  // CRUD
  FETCH_POEMS  : "FETCH_POEMS"
};
