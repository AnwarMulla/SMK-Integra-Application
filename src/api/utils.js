import axios from "axios";
import { decryptData, encryptData } from "../utils/Security";

const headers = {
  'headers': {
      //'Authorization' : "Bearer " + token,
      'Content-Type': 'application/json, multipart/form-data, application/zip',
      'Allow-Control-Allow-Origin': '*'
  }
}

//Get Method - call by passing endpoint, end point can have query params as well
const getApiCall = async (endpoint) => {
  // var userData = sessionStorage.getItem("userData")? JSON.parse(sessionStorage.getItem("userData")) : null; 
  var token = sessionStorage.getItem("token")
  // while (!token) {
  //   userData = sessionStorage.getItem("userData")? JSON.parse(sessionStorage.getItem("userData")) : null; 
  //   token = userData?.access_token? userData.access_token : JSON.parse(sessionStorage.getItem("token")); 
  // }
    return await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " + token
        },
      data: {},
    })
    .then(function (res) {
      //success
      return res.json().then(data => {
        if(data.payload === undefined){
          return {status : res.status,json : ()=>data};
        }
        const decryptedData = decryptData(data.payload);
        return {status : res.status,json : ()=>decryptedData};
      });
    }).then((decryptedData) => {
      return decryptedData;
    })
    .catch(function (error) {
      //failure or error
      return error.response;
    });
};

const getApiCallA = async (endpoint) => {
  const axios = require('axios');
  // let data = JSON.stringify({
  //   "id": 212121,
  //   "name": "MONOSJ",
  //   "mobile_number": "311"
  // });
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
  };
  let response = await axios.request(config)
  return response;
}

//Get Method for File/Blob - call by passing endpoint, end point can have query params as well
const getFileApiCall = async (endpoint) => {
  var userData = JSON.parse(sessionStorage.getItem("userData")); 
  var token = userData.access_token
  return await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : "Bearer " + token
      },
    data: {},
  })
  .then(function (res) {
    //success
    return res.blob();
  })
  .catch(function (error) {
    //failure or error
    return error.response;
  });
};

//Post Method - - call by passing endpoint and request body
const postApiCallA = async (endpoint, request) => {  
  let data = JSON.stringify(request);

  const axios = require('axios');
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };
  let response = await axios.request(config);
  return response;
}

//Post Method - - call by passing endpoint and request body
const putApiCallA = async (endpoint, request) => {  
  let data = JSON.stringify(request);

  const axios = require('axios');
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };
  let response = await axios.request(config);
  return response;
}

//Post Method - - call by passing endpoint and request body
const postApiCall = async (endpoint, request) => {
  var token = sessionStorage.getItem("token")
  let reqbody = JSON.stringify({
      payload: encryptData(request)
  })
  let result = await fetch(endpoint, {
          // mode: 'no-cors',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token,
              "Allow-Origin": "*",
          },
          body: reqbody,
      }).then(apiresponse => {
          return apiresponse.json();
      }).then(data => {
        if(data.payload){
          return decryptData(data.payload);
        }
        return data
      })
      .catch(error => {
          //failure or error
          console.log(error);
          return error.response;
      });
  return result;
}

//Post Method - - call by passing endpoint and request body
const postApiCallWithoutToken = async (endpoint, request) => {
  let reqbody = JSON.stringify(request)
  let result = await fetch(endpoint, {
          // mode: 'no-cors',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Allow-Origin": "*",
          },
          body: reqbody,
      }).then(apiresponse => {
          return apiresponse.json();
      }).then(data => {
        if(data.payload){
          return decryptData(data.payload);
        }
        return data
      })
      .catch(error => {
          //failure or error
          return error.response;
      });
  return result;
}

//Put Method
const putApiCall = async (endpoint, request) => {
  let reqbody = JSON.stringify({ payload: encryptData(request) })
  var token = sessionStorage.getItem("token")
  let result = await axios
        .put(endpoint, 
        reqbody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token,
            'Access-Control-Allow-Origin': '*'
            },        
            data: {}
        },
    )
    .then((res) => {
      if(res.status === 200)
      {
        return res.json()
      }
      if(res.status === 202)
      {
        return res
      }
      else
      {
        res.json()
        .then(error =>
            {
              return error;
            }
          )
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
    return result;
};

const putApiCallWithoutToken = async (endpoint, request) => {
  let reqbody = JSON.stringify(request)
  let result = await axios
        .put(endpoint, 
        reqbody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },        
            data: {}
        },
    )
    .then((res) => {
      if(res.status === 200)
      {
        return res.json()
      }
      if(res.status === 202)
      {
        return res
      }
      else
      {
        res.json()
        .then(error =>
            {
              return error;
            }
          )
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
    return result;
};

//Post FormData Method
const postFormDataApiCall = async (endpoint, request) => {
  let headersList = {
    "Accept": "*/*",
  }
  let result = await fetch(endpoint, {
        method: "POST",
        body: request,
        headers: headersList
      }
    ).then((res) => {
      if(res.status === 200){
        return res;
      }else{
        res.json().then(error => {
          alert(error.detail)
        })
        return null
      }
    }).catch(err =>{
      alert("Invalid username or password, try again.")
      return err
    })
    return result;
}



//Post FormData Method and also with parameters
const postFileApiCall = async (endpoint, request) => {
  var token = sessionStorage.getItem("token")
  let headersList = {
    'Accept': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    'Authorization' : "Bearer " + token,
  }
  let result = await fetch(endpoint, {
        method: "POST",
        body: request,
        headers: headersList
      }
    )
    .then((res) => {
      if(res.status === 200)
      {
        return res.json()
      }
      if(res.status === 202)
      {
        return res
      }
      else
      {
        return res.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


const deleteApiCallA = async (endpoint, data) => {
  const axios = require('axios');

let config = {
  method: 'delete',
  maxBodyLength: Infinity,
  url: endpoint,
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
};
let response = axios.request(config);
return response;
}
//Delete Method


const deleteApiCall = async (endpoint) => {
  
  let token = sessionStorage.getItem("token")
  return await axios
    .delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
        },
      data: {},
    })
    .then((res) => {
      //success
      return res;
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
};


const postApiCallFile = async (endpoint, reqBody) => {
  var userData = JSON.parse(sessionStorage.getItem("userData")); 
  var token = userData.access_token
  return await axios
    .post(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
        },
      responseType: 'blob',
      data: {},
    })
    .then((res) => {
      //success
      return res;
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
};



export {
  
  getApiCall,
  postApiCall,
  putApiCall,
  deleteApiCall,
  postApiCallFile,
  postFormDataApiCall,
  postFileApiCall,
  getFileApiCall,
  postApiCallA,
  getApiCallA,
  deleteApiCallA,
  putApiCallA,
  postApiCallWithoutToken,
  putApiCallWithoutToken
  // deleteApiCallUser
};