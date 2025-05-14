import axios from "axios";
import { apiUrls } from "./urls";
import {
  getApiCall,
  postApiCall,
  postFormDataApiCall,
  putApiCall,
  postFileApiCall,
  deleteApiCall,
  postApiCallA,
  postApiCallWithoutToken,
  putApiCallWithoutToken
} from "./utils";
import { toast } from "react-toastify";

const buildQueryParams = (params) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value); // Append only defined values
    }
  });

  return query.toString();
};

async function FetchServerDetails() {
   try {
    const pathName = window.location.pathname;
     const response = await fetch(`config.json`, {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });
      const jsonData = await response.json(); // Wait for the response to be parsed
      return jsonData; // Return the fetched data
   } catch (error) {
     console.error('Error fetching JSON:', error);
   }
}

let baseUrl;
export async function getBaseUrl() {
  let data = await FetchServerDetails(); // Wait for the fetch to complete and assign  
  return data?.server_details?.base_url.split("|")[0] + "/" + data?.server_details?.api_suffix.split("|")[1]
}

// export async function to call postFormDataApiCall(endpoint, reqBody) {
export async function login(request) {
  let apiUrl =apiUrls["login"];
  let apiResponse = await postFormDataApiCall(apiUrl, request)
  .then((res) => res !== null ? res.json() : res )
  .then((data) =>{    
    if(data !== null){
      sessionStorage.setItem('token', data.access_token)
      sessionStorage.setItem('userData', JSON.stringify(data.user));
      sessionStorage.setItem("dashboardState", "dashboard");
      sessionStorage.setItem("user", data.user.username);
      sessionStorage.setItem("role", data.user.userrole);
      sessionStorage.getItem("role").toUpperCase() === "ADMIN" ? "" : sessionStorage.setItem("user_id", data.user.id)
      sessionStorage.setItem("modelConfigStep", "step1");
    }
    return data
  }).catch(err => {    
    return err.response
  }) 
  return apiResponse
}


export async function loginWithRole(loginData, role) {
  let apiUrl = baseUrl +  apiUrls["loginWithRole"];
  let authData = await postFormDataApiCall(apiUrl + "/" + role, loginData)
    .then((apiresponse) =>
      apiresponse.status === 200 ? apiresponse.json() : null
    )
    .then((login) => {
        sessionStorage.setItem('token', login.access_token)
        sessionStorage.setItem('userData', JSON.stringify(login.user));
        sessionStorage.setItem("appState", "dashboard");
        sessionStorage.setItem("dashboardState", "dashboard");
        sessionStorage.setItem("user", login.user.username);
        sessionStorage.setItem("role", login.user.userrole);
        sessionStorage.getItem("role").toUpperCase() === "ADMIN" ? "" : sessionStorage.setItem("user_id", login.user.id)
        sessionStorage.setItem("modelConfigStep", "step1");
      return login;
    })
    .catch((error) => {
      return error.response;
    });
  return authData;
}


// export async function to call postFormDataApiCall(endpoint, reqBody) {
  export async function signup(request) {
    let apiUrl = baseUrl +  apiUrls["signup"];
    let apiResponse = await postApiCallA(apiUrl, request)
    if(apiResponse.data.status === 200)
      return apiResponse.data;
    else if(apiResponse.data.status === 404)
    {
      return apiResponse.data;
    }
    else
      return {message: "Something went wrong try again"}
  }

export async function getUsers() {
  let apiUrl = baseUrl +  apiUrls["user"];
  let result = await getApiCall(apiUrl).then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json();
    } else {
      apiresponse.json().then((data) => {
        return data;
      });
    }
  });
  return result;
}

export async function getUserById(id) {
  let apiUrl = baseUrl +  apiUrls["user"];
  let result = await getApiCall(`${apiUrl}/${id}`).then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json();
    } else {
      apiresponse.json().then((data) => {
        return data;
      });
    }
  });
  return result;
}

export async function uploadDocument(
  fileData,
  params,
  plantname,
  unitname,
  shelfname
) {
  let apiUrl = baseUrl +  apiUrls["fileUploadv1"];
  if (plantname == "" || unitname == "") {
    plantname = sessionStorage.getItem("plant");
    unitname = sessionStorage.getItem("unit");
  }
  let responseData = await postFileApiCall(
    `${apiUrl}/?filename=${params.filename.split("\\").pop()}&filetype=${
      params.filetype
    }&plant_id=${plantname}&unit_id=${unitname}&shelf_id=${shelfname}
    `,
    fileData
  );
  return responseData;
}

export async function userContext(requestBody) {
  let apiUrl = baseUrl +  apiUrls["usercontext"];
  let responseData = await postApiCall(
    `${apiUrl}/`,
    JSON.stringify(requestBody)
  ).then((apiresponse) => {
    return apiresponse;
  });
  return responseData;
}

export async function logout(loginData) {
  let apiUrl = baseUrl +  apiUrls["logout"];
  let authData = await getApiCall(apiUrl)
    .then((apiresponse) =>
      apiresponse.status === 200 ? apiresponse.json() : null
    )
    .then((login) => {
      sessionStorage.setItem("token", login.access_token);
      sessionStorage.setItem("user", login.user.username);
      sessionStorage.setItem("role", login.user.userrole);
      sessionStorage.setItem("appState", "dashboard");
      sessionStorage.setItem("dashboardState", "selectunit");
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return authData;
}

export async function getUsersAll() {
  let apiUrl = baseUrl +  apiUrls["usersall"];
  let result = await getApiCall(apiUrl)
  .then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json()
    } else {
      return apiresponse.json()
    }
  })
  .catch((error) => {
    //failure or error
    return error.response;
  });
return result;
}

export async function getRolesAll() {
  let apiUrl = baseUrl +  apiUrls["rolesall"];
  let result = await getApiCall(apiUrl)
  .then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json()
    } else {
      return apiresponse.json()
    }
  })
  .catch((error) => {
    //failure or error
    return error.response;
  });
return result;
}


export async function getActiveRolesAll() {
  let apiUrl = baseUrl +  apiUrls["getActiveRoles"];
  let result = await getApiCall(apiUrl)
  .then((apiresponse) => {
    if (apiresponse.status === 200) {
      return apiresponse.json()
    } else {
      return apiresponse.json()
    }
  })
  .catch((error) => {
    //failure or error
    return error.response;
  });
return result;
}

export async function createUser(request) {
  let apiUrl = baseUrl +  apiUrls["createuser"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateUser(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateuser"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function searchUserByNameOrMbno(role, name, mobile_no, pageCount=1, pageSize=10) {
  let apiUrl = baseUrl +  apiUrls["searchUser"];
  let result = await getApiCall(`${apiUrl}?role=${role}&username=${name}&mobile_no=${mobile_no}&page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }
      else if (apiresponse.status === 400) {
        return apiresponse.json()
      }
      else if (apiresponse.status === 417) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getComplaints() {
  let apiUrl = baseUrl +  apiUrls["viewComplaints"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function searchLoginDetails(request) {
  let apiUrl = baseUrl +  apiUrls["searchLoginDetails"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function createComplaint(request) {
  let apiUrl = baseUrl +  apiUrls["addComplaint"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateComplaint(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateComplaint"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function getDealerByType(type,value) {
  let apiUrl = baseUrl +  apiUrls["getDealerByType"];
  let result = await getApiCall(`${apiUrl}/${type}/${value}`)
    .then((apiresponse) => {
      return apiresponse
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getDealers(page, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getDealerAll"];
  let result = await getApiCall(`${apiUrl}?page_count=${page}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createDealer(request) {
  let apiUrl = baseUrl +  apiUrls["createDealer"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateDealer(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateDealer"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteDealer(id) {
  let apiUrl = baseUrl +  apiUrls["deleteDealer"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getDealer(selectedOption, searchedValue) {
  let apiUrl = baseUrl +  apiUrls["getDealer"];
  let result = await getApiCall(`${apiUrl}?type=${selectedOption}&value=${searchedValue}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function uploadDealer(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadDealer"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

export async function getProducts(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewProduct"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createProduct(request) {
  let apiUrl = baseUrl +  apiUrls["addProduct"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateProduct(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateProduct"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteProduct(id) {
  let apiUrl = baseUrl +  apiUrls["deleteProduct"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getProduct(productId, name) {
  let apiUrl = baseUrl +  apiUrls["searchProduct"];
  let result = await getApiCall(`${apiUrl}?product_id=${productId}&name=${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// category_subcategory section

export async function getCategory(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewCategory"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse?.status === 200) {
        return apiresponse.json()
      } else {
        return apiresponse?.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error
    });
  return result;
}

export async function createCategory(request) {
  let apiUrl = baseUrl +  apiUrls["addCategory"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateCategory(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateCategory"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteCategory(id) {
  let apiUrl = baseUrl +  apiUrls["deleteCategory"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getCategoryByname(id, name) {
  let apiUrl = baseUrl +  apiUrls["searchCategory"];
  let result = await getApiCall(`${apiUrl}?id=${id}&name=${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


// Subcategory 

export async function getSubcategories(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewSubcategory"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getSubcategoriesBrief() {
  let apiUrl = baseUrl +  apiUrls["viewSubcategoryBrief"];
  let result = await getApiCall(`${apiUrl}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createSubcategory(request) {
  let apiUrl = baseUrl +  apiUrls["addSubcategory"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateSubcategory(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateSubcategory"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteSubcategory(id, categoryId) {
  let apiUrl = baseUrl +  apiUrls["deleteSubcategory"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}/${categoryId}`);
  return responseData;
}

export async function getSubcategoryByname(selectedOption, searchedValue) {
  let apiUrl = baseUrl +  apiUrls["searchSubcategory"];
  let result = await getApiCall(`${apiUrl}?type=${selectedOption}&value=${searchedValue}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// level section

export async function getLevels(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewLevels"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse?.status === 200) {
        return apiresponse.json()
      } else {
        return apiresponse?.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error
    });
  return result;
}


export async function getLevelsBrief() {
  let apiUrl = baseUrl +  apiUrls["viewLevelsBrief"];
  let result = await getApiCall(`${apiUrl}`)
    .then((apiresponse) => {
      if (apiresponse?.status === 200) {
        return apiresponse.json()
      } else {
        return apiresponse?.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error
    });
  return result;
}

export async function createLevel(request) {
  let apiUrl = baseUrl +  apiUrls["addLevel"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateLevel(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateLevel"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteLevel(id) {
  let apiUrl = baseUrl +  apiUrls["deleteLevel"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getLevelByname(name) {
  let apiUrl = baseUrl +  apiUrls["searchLevel"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// WScale machine section

export async function getWScaleMachines(page, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewWScaleMachine"];
  let result = await getApiCall(`${apiUrl}?page_count=${page}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createWScaleMachine(request) {
  let apiUrl = baseUrl +  apiUrls["addWScaleMachine"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateWScaleMachine(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateWScaleMachine"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteWScaleMachine(id) {
  let apiUrl = baseUrl +  apiUrls["deleteWScaleMachine"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getWScaleMachine(id) {
  let apiUrl = baseUrl +  apiUrls["searchWScaleMachine"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// WScale machine section

export async function getIrisMachines(page, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewIrisMachine"];
  let result = await getApiCall(`${apiUrl}?page_count=${page}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createIrisMachine(request) {
  let apiUrl = baseUrl +  apiUrls["addIrisMachine"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateIrisMachine(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateIrisMachine"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteIrisMachine(id) {
  let apiUrl = baseUrl +  apiUrls["deleteIrisMachine"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getIrisMachine(id) {
  let apiUrl = baseUrl +  apiUrls["searchIrisMachine"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getRoles() {
  let apiUrl = baseUrl +  apiUrls["viewRoles"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createRole(request) {
  let apiUrl = baseUrl +  apiUrls["addRole"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateRole(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateRole"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function getRoleByName(name) {
  let apiUrl = baseUrl +  apiUrls["searchRole"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getUsersList(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewUsers"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


export async function getActions() {
  let apiUrl = baseUrl +  apiUrls["viewActions"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createAction(request) {
  let apiUrl = baseUrl +  apiUrls["addAction"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateAction(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateAction"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteAction(id) {
  let apiUrl = baseUrl +  apiUrls["deleteAction"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getActionByName(name) {
  let apiUrl = baseUrl +  apiUrls["searchAction"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Screen methods

export async function getScreens() {
  let apiUrl = baseUrl +  apiUrls["viewScreens"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createScreen(request) {
  let apiUrl = baseUrl +  apiUrls["addScreen"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateScreen(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateScreen"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteScreen(id) {
  let apiUrl = baseUrl +  apiUrls["deleteScreen"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getScreenByName(name) {
  let apiUrl = baseUrl +  apiUrls["searchScreen"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function setPermission(request) {
  let apiUrl = baseUrl +  apiUrls["setpermission"];
  let responseData = await postApiCall(apiUrl, request);
  return responseData;
}

export async function getPermissionByRole(role_id) {
  let apiUrl = baseUrl +  apiUrls["getpermission"];
  let responseData = await getApiCall(`${apiUrl}/${role_id}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getActiveScreens() {
  let apiUrl = baseUrl +  apiUrls["screenactive"];
  let responseData = await getApiCall(apiUrl).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getActiveActions() {
  let apiUrl = baseUrl +  apiUrls["actionactive"];
  let responseData = await getApiCall(apiUrl).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getApiKeys() {
  let apiUrl = baseUrl +  apiUrls["getapikeyall"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function createApiKey(request) {
  let apiUrl = baseUrl +  apiUrls["pdsmoduleapikey"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updataApikey(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateapikey"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteApikey(id) {
  let apiUrl = baseUrl +  apiUrls["deleteapikey"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getProductModel(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getProductModel"];

  let responseData = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getUserLoginDetails(request) {
  let apiUrl = baseUrl +  apiUrls["userLoginDetails"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function createProductModel(request) {
  let apiUrl = baseUrl +  apiUrls["createProductModel"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateProductModel(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateProductModel"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteProductModel(id, productId) {
  let apiUrl = baseUrl +  apiUrls["deleteProductModel"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}/${productId}`);
  return responseData;
}

export async function getProductModelName(selectedOption, searchedValue) {
  let apiUrl = baseUrl +  apiUrls["searchModelByName"];
  let result = await getApiCall(`${apiUrl}?type=${selectedOption}&value=${searchedValue}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function changePassword(id, request) {
  let apiUrl = baseUrl +  apiUrls["changepasswordcreate"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function usersChangePassword(id, request) {
  let apiUrl = baseUrl +  apiUrls["usersChangePassword"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function getCallHistory() {
  let apiUrl = baseUrl +  apiUrls["callHistory"];
  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}



export async function getZoneMaster() {
  let apiUrl = baseUrl +  apiUrls["zoneMaster"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getZoneGroupMaster() {
  let apiUrl = baseUrl +  apiUrls["zoneGroupMaster"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getCaseType() {
  let apiUrl = baseUrl +  apiUrls["caseType"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getChannel() {
  let apiUrl = baseUrl +  apiUrls["channel"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getAuthenticationChannel() {
  let apiUrl = baseUrl +  apiUrls["authenticationChannel"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

// District methods

export async function getDistricts() {
  let apiUrl = baseUrl +  apiUrls["getDistricts"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// getListOfDistricts
export async function getListOfDistricts(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getListOfDistricts"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
            return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getDistrictsForSubdivision(subDivisionId) {
  let apiUrl = baseUrl +  apiUrls["getDistrictsForSubDivision"];
  let result = await getApiCall(`${apiUrl}?subdivisionid=${subDivisionId}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createDistrict(request) {
  let apiUrl = baseUrl +  apiUrls["createDistrict"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateDistrict(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateDistrict"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteDistrict(id) {
  let apiUrl = baseUrl +  apiUrls["deleteDistrict"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getDistrictByName(district, division) {
  let apiUrl = baseUrl +  apiUrls["searchDistrictByName"];
  let result = await getApiCall(`${apiUrl}?district_name=${district}&division_name=${division}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Block methods

export async function getBlocks() {
  let apiUrl = baseUrl +  apiUrls["getBlocks"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getListOfBlocks(page, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getListOfBlocks"];
  let result = await getApiCall(`${apiUrl}?page_count=${page}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getBlocksForDistrict(districtId) {
  let apiUrl = baseUrl +  apiUrls["getBlocksForDistrict"];
  let result = await getApiCall(`${apiUrl}?districtid=${districtId}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createBlock(request) {
  let apiUrl = baseUrl +  apiUrls["createBlock"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateBlock(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateBlock"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteBlock(id) {
  let apiUrl = baseUrl +  apiUrls["deleteBlock"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getBlockByName(division, district, block) {
  let apiUrl = baseUrl +  apiUrls["searchBlockByName"];
  let result = await getApiCall(`${apiUrl}?division_name=${division}&district_name=${district}&block_name=${block}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Subdivision/panchayat methods

export async function getSubdivisions(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getSubdivisions"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createSubdivision(request) {
  let apiUrl = baseUrl +  apiUrls["createSubdivision"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateSubdivision(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateSubdivision"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteSubdivision(id) {
  let apiUrl = baseUrl +  apiUrls["deleteSubdivision"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getSubdivisionByName(name) {
  let apiUrl = baseUrl +  apiUrls["searchSubdivisionByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// POS Machine

export async function getPOSMachines(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewPOSMachine"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createPOSMachine(request) {
  let apiUrl = baseUrl +  apiUrls["addWPOSMachine"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updatePOSMachine(id, request) {
  let apiUrl = baseUrl +  apiUrls["updatePOSMachine"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deletePOSMachine(id) {
  let apiUrl = baseUrl +  apiUrls["deletePOSMachine"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getPOSMachineById(id) {
  let apiUrl = baseUrl +  apiUrls["searchPOSMachine"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// Vendor methods

export async function getVendorsWithouPagination() {
  let apiUrl = baseUrl +  apiUrls["getAllVendorsWithoutPagination"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getVendors(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getVendors"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createVendor(request) {
  let apiUrl = baseUrl +  apiUrls["createVendor"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateVendor(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateVendor"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteVendor(id) {
  let apiUrl = baseUrl +  apiUrls["deleteVendor"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getVendorByname(name) {
  let apiUrl = baseUrl +  apiUrls["searchVendorByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


export async function searchAndViewComplaints(requestBody, role) {
  role = sessionStorage.getItem("role");
  let apiUrl = baseUrl +  apiUrls["searchAndView"];
  let apiresponse = await postApiCall(`${apiUrl}/${role}`, requestBody)
  return apiresponse;
}

// getComplaintsStatistics
export async function getComplaintsStatistics(requestBody, role) {
  role = sessionStorage.getItem("role");
  let apiUrl = baseUrl +  apiUrls["getComplaintsStatistics"];
  let apiresponse = await postApiCall(`${apiUrl}/${role}`, requestBody)
  return apiresponse;
}

export async function searchComplaints(sla_datetime, requestBody) {
  let apiUrl = baseUrl +  apiUrls["searchComplaints"];
  if (sla_datetime)
    apiUrl = `${apiUrl}?sla_datetime=${sla_datetime}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

export async function searchSLAComplaints(sla_datetime, requestBody, role) {
  let apiUrl = baseUrl +  apiUrls["searchSLAComplaints"];
  if (sla_datetime)
    apiUrl = `${apiUrl}/${role}?sla_datetime=${sla_datetime}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

// getSLAComplaintsStatistics
export async function getSLAComplaintsStatistics(sla_datetime, requestBody, role) {
  let apiUrl = baseUrl +  apiUrls["getSLAComplaintsStatistics"];
  if (sla_datetime)
    apiUrl = `${apiUrl}/${role}?sla_datetime=${sla_datetime}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

// getPeriodicStatistics
export async function getReportPeriodicStatistics(slaDateFrom, slaDateTo, reportInterval, requestBody, role) {
  let apiUrl = baseUrl +  apiUrls["reportPeriodicStatistics"];
  apiUrl = `${apiUrl}/${role}?from_created_date=${slaDateFrom}&to_created_date=${slaDateTo}&report_interval=${reportInterval}`
  let apiresponse = await postApiCall(apiUrl, requestBody)
  return apiresponse;
}

// getPeriodicSLARepot
export async function getSLAReportBlockWise(slaDateFrom, slaDateTo, role) {
  let apiUrl = baseUrl +  apiUrls["SLAReportBlockWise"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// getPeriodicSLARepot
export async function getSLAReportDistrictWise(slaDateFrom, slaDateTo, role) {
  let apiUrl = baseUrl +  apiUrls["SLAReportDistrictWise"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// getPeriodicSLARepot
export async function getSLAReportDivisionWise(slaDateFrom, slaDateTo, role) {
  let apiUrl = baseUrl +  apiUrls["SLAReportDivisionWise"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// getPeriodicSLARepot
export async function getAgeOfTicketReport(slaDateFrom, slaDateTo, role) {
  let apiUrl = baseUrl +  apiUrls["AgeOfTicketReport"];
  apiUrl = `${apiUrl}/${role}?start_date=${slaDateFrom}&end_date=${slaDateTo}`
  let apiResponse = await postApiCall(apiUrl, {})
  return apiResponse;
}

// Assigned to methods
export async function getAssignedTo(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["viewAssignedTo"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createAssignedTo(request) {
  let apiUrl = baseUrl +  apiUrls["addAssignedTo"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateAssignedTo(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateAssignedTo"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteAssignedTo(id) {
  let apiUrl = baseUrl +  apiUrls["deleteAssignedTo"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function searchAssignedTo(filters) {
  let apiUrl = baseUrl +  apiUrls["searchAssignedTo"];

  const queryParams = buildQueryParams(filters);
  
  let result = await getApiCall(`${apiUrl}?${queryParams}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else if (apiresponse.status === 404) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}


export async function getActiveVendors() {
  let apiUrl = baseUrl +  apiUrls["getActiveVendor"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveSubdivision() {
  let apiUrl = baseUrl +  apiUrls["getActiveSubdivision"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveBlock() {
  let apiUrl = baseUrl +  apiUrls["getActiveBlock"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveDistrict() {
  let apiUrl = baseUrl +  apiUrls["getActiveDistrict"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveProductModel() {
  let apiUrl = baseUrl +  apiUrls["getActiveProductModel"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveRole() {
  let apiUrl = baseUrl +  apiUrls["getActiveRole"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActivePOSMachine() {
  let apiUrl = baseUrl +  apiUrls["getActivePOSMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveIrisMachine() {
  let apiUrl = baseUrl +  apiUrls["getActiveIrisMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getActiveIrisMachineBrief() {
  let apiUrl = baseUrl +  apiUrls["getActiveIrisMachineBrief"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getActiveWScaleMachine() {
  let apiUrl = baseUrl +  apiUrls["getActiveWScaleMachine"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getActiveWScaleMachineBrief() {
  let apiUrl = baseUrl +  apiUrls["getActiveWScaleMachineBrief"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getActiveAssignedTo() {
  let apiUrl = baseUrl +  apiUrls["getActiveAssignedTo"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

// get_assigned_to_by_level_id
export async function getAssignedToByParams(levelId, componentName) {
  let apiUrl = baseUrl +  apiUrls["getAssignedToByParams"];
  let result = await getApiCall(`${apiUrl}/${levelId}/${componentName}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveLevel() {
  let apiUrl = baseUrl +  apiUrls["getActiveLevel"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveSubcategory() {
  let apiUrl = baseUrl +  apiUrls["getActiveSubcategory"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveCategory() {
  let apiUrl = baseUrl +  apiUrls["getActiveCategory"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveProduct() {
  let apiUrl = baseUrl +  apiUrls["getActiveProduct"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getActiveUser() {
  let apiUrl = baseUrl +  apiUrls["getActiveUser"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

//getUsersBrief
export async function getUsersBrief() {
  let apiUrl = baseUrl +  apiUrls["getUsersBrief"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function deleteUser(id) {
  let apiUrl = baseUrl +  apiUrls["deleteUser"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function deleteUserRole(id) {
  let apiUrl = baseUrl +  apiUrls["deleteRole"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getLevelDataById(id) {
  let apiUrl = baseUrl +  apiUrls["getLevelData"];
  let result = await getApiCall(`${apiUrl}/${id}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function uploadDistrict(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadDistrict"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

export async function uploadSubdivision(fileData){
let apiUrl = baseUrl +  apiUrls["uploadSubdivision"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadBlock(fileData){
let apiUrl = baseUrl +  apiUrls["uploadBlock"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadVendor(fileData){
let apiUrl = baseUrl +  apiUrls["uploadVendor"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadPOSMachine(fileData){
let apiUrl = baseUrl +  apiUrls["uploadPOSMachine"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadIrisMachine(fileData){
let apiUrl = baseUrl +  apiUrls["uploadIrisMachine"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadWScaleMachine(fileData){
let apiUrl = baseUrl +  apiUrls["uploadWScaleMachine"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadAssignedTo(fileData){
let apiUrl = baseUrl +  apiUrls["uploadAssignedTo"];
let responceData = await postFileApiCall(`${apiUrl}`,fileData);
return responceData;
}

export async function uploadLevel(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadLevel"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

export async function getComplaintSummary(requestBody, role) {
  let apiUrl = baseUrl +  apiUrls["viewSummary"];
  let apiresponse = await postApiCall(`${apiUrl}/${role}`, requestBody)
  return apiresponse;
}

export async function uploadUsers(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadUsers"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

  export async function getDealerTicketHistory(dealerId, role) {
    let apiUrl = baseUrl +  apiUrls["getDealerTicketHistory"];
    let result = await getApiCall(`${apiUrl}/${dealerId}/${role}`)
      .then((apiresponse) => {
        if (apiresponse.status === 200) {
            return apiresponse.json()
        }
      })
      .catch((error) => {
        //failure or error
        return error.response;
      });
    return result;
  }


  export async function escalateTickets(){
    let apiUrl = baseUrl +  apiUrls["escalateTickets"];
    let responceData = await postFileApiCall(`${apiUrl}`,{});
    return responceData;
  }

  export async function getAgentEngagementStatus(request) {
    let apiUrl = baseUrl +  apiUrls["agentEngagementStatus"];
    let apiresponse = await postApiCall(apiUrl, request)
    return apiresponse;
  }

  // State methods

export async function getStates(pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getStates"];
  let result = await getApiCall(`${apiUrl}?page_count=${pageCount}&page_size=${pageSize}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getActiveStates() {
  let apiUrl = baseUrl +  apiUrls["getActiveState"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createState(request) {
  let apiUrl = baseUrl +  apiUrls["createState"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateState(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateState"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteState(id) {
  let apiUrl = baseUrl +  apiUrls["deleteState"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function getStateByName(name) {
  let apiUrl = baseUrl +  apiUrls["searchStateByName"];
  let result = await getApiCall(`${apiUrl}/${name}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getApp() {
  baseUrl = await getBaseUrl();
  
  let apiUrl = baseUrl + apiUrls["app"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function initiateCall(request) {
  let apiUrl = baseUrl +  apiUrls["initiateCall"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

// Integration

export async function getIntegrations() {
  let apiUrl = baseUrl +  apiUrls["getIntegrations"];
  let result = await getApiCall(apiUrl)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
                return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function createIntegrations(request) {
  let apiUrl = baseUrl +  apiUrls["createIntegrations"];
  let apiresponse = await postApiCall(apiUrl, request)
  return apiresponse;
}

export async function updateIntegrations(id, request) {
  let apiUrl = baseUrl +  apiUrls["updateIntegrations"];
  let responseData = await putApiCall(`${apiUrl}/${id}`, request);
  return responseData;
}

export async function deleteIntegrations(id) {
  let apiUrl = baseUrl +  apiUrls["deleteIntegrations"];
  let responseData = await deleteApiCall(`${apiUrl}/${id}`);
  return responseData;
}

export async function uploadAttachment(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadAttachment"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

  export async function getAttachment(ticket_number) {
    let apiUrl = baseUrl +  apiUrls["getAttachment"];
    let result = await getApiCall(`${apiUrl}?ticket_number=${ticket_number}`)
      .then((apiresponse) => {
        // if (apiresponse.status === 200) {
            return apiresponse.json()
        // }
      })
      .catch((error) => {
        //failure or error
        return error.response;
      });
    return result;
  }

  export async function generateOtp(request) {
    let apiUrl = baseUrl +  apiUrls["generateOtp"];
    let apiresponse = await postApiCallWithoutToken(apiUrl, request)
    return apiresponse;
  }

  export async function verifyOtp(request) {
    let apiUrl = baseUrl +  apiUrls["verifyOtp"];
    let apiresponse = await postApiCallWithoutToken(apiUrl, request)
    return apiresponse;
  }

  export async function getProjectMaster() {
    let apiUrl = baseUrl +  apiUrls["projectMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function getStatusMaster() {
    let apiUrl = baseUrl +  apiUrls["statusMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function getReportIntervalMaster() {
    let apiUrl = baseUrl +  apiUrls["reportIntervalMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function getTokenTypeMaster() {
    let apiUrl = baseUrl +  apiUrls["tokenTypeMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function forgotPassword(request) {
    let apiUrl = baseUrl +  apiUrls["forgotPassword"];
    let responseData = await putApiCallWithoutToken(apiUrl, request);
    return responseData;
  }

  export async function getDependencyMaster() {
    let apiUrl = baseUrl +  apiUrls["dependencyMaster"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function getSubcategoriesSearchOptions() {
    let apiUrl = baseUrl +  apiUrls["getSubcategoriesSearchOptions"];
  
    let responseData = await getApiCall(`${apiUrl}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  
export async function uploadProduct(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadProduct"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }


export async function uploadProductModel(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadProductModel"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }


export async function uploadCategory(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadCategory"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }


export async function uploadSubcategory(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadSubcategory"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

  
export async function downloadUploadFile(masterValue){
  let apiUrl = baseUrl +  apiUrls["downloadUploadFile"]
  try { 
    var token = sessionStorage.getItem("token")
    //console.log(downloadUrl);
    const response = await axios.get(`${apiUrl}/${masterValue}`, {
      headers: {
        Authorization:
          "Bearer " + token,
      },
    });
    const blob = new Blob([response.data.file_content], {
      type: "text/csv;charset=utf-8;",
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = response.data.file_name;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    toast.error(error.response.data.detail)
  }
}

export async function productModelSearchOptions() {
  let apiUrl = baseUrl +  apiUrls["productModelSearchOptions"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function uploadState(fileData){
  let apiUrl = baseUrl +  apiUrls["uploadState"];
  let responceData = await postFileApiCall(`${apiUrl}`,fileData);
  return responceData;
  }

  export async function getProductModelsByProduct(productId) {
    let apiUrl = baseUrl +  apiUrls["getProductModelsByProduct"];
  
    let responseData = await getApiCall(`${apiUrl}?product_id=${productId}`).then(
      (apiresponse) => {
        if (apiresponse.status === 200) {
          return apiresponse.json();
        } 
        else if (apiresponse.status === 404) {
          return apiresponse.json();
        }
        else {
          apiresponse.json().then((data) => {
            return data;
          });
        }
      }
    );
    return responseData;
  }

  export async function downloadErrorFile(filePath){
    try { 
      var token = sessionStorage.getItem("token")
      //console.log(downloadUrl);
      const response = await axios.get(`${baseUrl}/${filePath}`, {
        headers: {
          Authorization:
            "Bearer " + token,
        },
      });
      const blob = new Blob([response.data.file_content], {
        type: "text/csv;charset=utf-8;",
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = response.data.file_name;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.response.data.detail)
    }
  }

export async function getAllCongigurations() {
  let apiUrl = baseUrl +  apiUrls["getConfigs"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getConfigurationByFileName(fileName) {
  let apiUrl = baseUrl +  apiUrls["getConfigByName"];
  if (!fileName || fileName === "") {
    console.error("No file name provided");
    return;
  }
  let responseData = await getApiCall(`${apiUrl}/${fileName}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getEmailConfigOptions() {
  let apiUrl = baseUrl +  apiUrls["getEmailConfigOptions"];
  
  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function updateConfiguration(fileName, request) {
  let apiUrl = baseUrl +  apiUrls["updateConfig"];
  let responseData = await putApiCall(`${apiUrl}/${fileName}`, request);
  return responseData;
}

export async function getDescriptions(ticketNo) {
  let apiUrl = baseUrl +  apiUrls["getDescriptions"];
  let result = await getApiCall(`${apiUrl}/${ticketNo}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getDealerById(dealerId) {
  let apiUrl = baseUrl +  apiUrls["getDealerById"];
  let result = await getApiCall(`${apiUrl}/${dealerId}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}

export async function getSubcategoriesByCategory(categoryId) {
  let apiUrl = baseUrl +  apiUrls["getSubcategoriesByCategory"];

  let responseData = await getApiCall(`${apiUrl}?category_id=${categoryId}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getActionOptions() {
  let apiUrl = baseUrl +  apiUrls["getActionOptions"];
  
  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getTemplateByFileName(fileName) {
  let apiUrl = baseUrl +  apiUrls["getTeplateByName"];
  if (!fileName || fileName === "") {
    console.error("No file name provided");
    return;
  }
  let responseData = await getApiCall(`${apiUrl}/${fileName}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function updateTemplate(fileName, request) {
  let apiUrl = baseUrl +  apiUrls["updateTeplateByName"];
  let responseData = await putApiCall(`${apiUrl}/${fileName}`, request);
  return responseData;
}

export async function getFAQ() {
  let apiUrl = baseUrl +  apiUrls["getFAQ"];
  let role = sessionStorage.getItem("role");
  var token = sessionStorage.getItem("token")
  let responseData = await fetch(`${apiUrl}/${role}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : "Bearer " + token
      },
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch encoded HTML content");
        }
        return response.json();
      })
      .then((data) => {
        const { encoded_html } = data;
        // Decode Base64 content
        const decodedHtml = atob(encoded_html);
        return decodedHtml
      })
      .catch((error) => console.error("Error:", error));
  return responseData;
}

export async function getBcaSearchOptions() {
  let apiUrl = baseUrl +  apiUrls["getBcaSearchOptions"];
  
  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getTicketSearchOptions() {
  let apiUrl = baseUrl +  apiUrls["getTicketSearchOptions"];
  
  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      } 
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function fetchAllComplaints(request, userRole) {
  let apiUrl = baseUrl +  apiUrls.getAllComplaints;
  let apiresponse = await postApiCall(`${apiUrl}/${userRole}`, request);
  return apiresponse;
}

export async function searchTickets(params = {}) {
  const role = sessionStorage.getItem("role");
  let apiUrl = baseUrl +  apiUrls["searchTickets"];

  const queryParams = buildQueryParams(params);

  let result = await getApiCall(`${apiUrl}/${role}?${queryParams}`)
    .then((apiresponse) => {
      if (apiresponse.status === 200) {
          return apiresponse.json()
      }else{
        return apiresponse.json()
      }
    })
    .catch((error) => {
      //failure or error
      return error.response;
    });
  return result;
}
export async function getMasterConfigs() {
  let apiUrl = baseUrl +  apiUrls["getMasterConfigs"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getMasterDB() {
  let apiUrl = baseUrl +  apiUrls["getMasterDB"];

  let responseData = await getApiCall(`${apiUrl}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getClosedWithinSLA(slaDate, role, pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getClosedWithinSLA"];

  let responseData = await getApiCall(`${apiUrl}/${role}?sla_datetime=${slaDate}&page_count=${pageCount}&page_size=${pageSize}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getClosedOutOfSLA(slaDate, role, pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getClosedOutOfSLA"];

  let responseData = await getApiCall(`${apiUrl}/${role}?sla_datetime=${slaDate}&page_count=${pageCount}&page_size=${pageSize}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getOpenWithinSLA(slaDate, role, pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getOpenWithinSLA"];

  let responseData = await getApiCall(`${apiUrl}/${role}?sla_datetime=${slaDate}&page_count=${pageCount}&page_size=${pageSize}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}

export async function getOpenOutOfSLA(slaDate, role, pageCount, pageSize) {
  let apiUrl = baseUrl +  apiUrls["getOpenOutOfSLA"];

  let responseData = await getApiCall(`${apiUrl}/${role}?sla_datetime=${slaDate}&page_count=${pageCount}&page_size=${pageSize}`).then(
    (apiresponse) => {
      if (apiresponse.status === 200) {
        return apiresponse.json();
      }
      else if (apiresponse.status === 404) {
        return apiresponse.json();
      }
      else {
        apiresponse.json().then((data) => {
          return data;
        });
      }
    }
  );
  return responseData;
}