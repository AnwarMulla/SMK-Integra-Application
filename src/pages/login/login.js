// import React from "react";
// import "./login.css";
// import Logo from "../../assets/icons/logo.png";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { TextField } from "@mui/material";
// import Menudrawers from "../menudrawer/menudrawer";

// const initialStateData = {
//   userid: "",
//   password: "",
// };

// export default function Login() {
//   const [login, setLogin] = React.useState(initialStateData);


//   const [loggedIn, setLoggedIn] = React.useState(
//     JSON.parse(localStorage.getItem("loggedIn")) || false
//   );

//   const onLoginData = (e) => {
//     setLogin({ ...login, [e.target.name]: e.target.value });
//   };

//   const onSubmit = () => {
//     if (login.userid === "") {
//       alert("UserId is required");
//     } else if (login.password === "") {
//       alert("Password is required");
//     } else {
//       alert("Login Successfully");
//       setLoggedIn(true);
//       localStorage.setItem("loggedIn", "true");
//     }
//   };
//   return (
//     <>
//       {!loggedIn ? (
//         <div className="card-bg-color">
//           <Box className="cardContainer">
//             <Card variant="outlined" className="loginItemJustification">
//               <CardContent>
//                 <img src={Logo} alt="IntegraLogo" className="integralogo" />
//               </CardContent>
//               <CardContent>
//                 <Typography variant="h6">
//                   Complaint Management System
//                 </Typography>
//               </CardContent>
//               <CardContent>
//                 <TextField
//                   fullWidth
//                   id="userid"
//                   name="userid"
//                   label="User Id"
//                   variant="outlined"
//                   required
//                   autoComplete="off"
//                   value={login.userid}
//                   onChange={onLoginData}
//                 />
//               </CardContent>
//               <CardContent>
//                 <TextField
//                   fullWidth
//                   id="password"
//                   name="password"
//                   label="Password"
//                   variant="outlined"
//                   required
//                   autoComplete="off"
//                   value={login.password}
//                   onChange={onLoginData}
//                 />
//               </CardContent>
//               <a href="/" target="_blank" class="forgotbutton">
//                 Forgot Password?
//               </a>
//               <CardContent>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={onSubmit}
//                 >
//                   Submit
//                 </Button>
//               </CardContent>
//             </Card>
//           </Box>
//         </div>
//       ) : (
//         <Menudrawers onLogout={() => setLoggedIn(false)} onInitialState={() => setLogin(initialStateData)}/>
//       )}
//     </>
//   );
// }


import React from "react";
import "./login.css";
import Logo from "../../assets/icons/logo.png";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Menudrawers from "../menudrawer/menudrawer";

import {login, getApp} from '../../api/methods'
import {encodeString} from '../../utils/Security'

const initialStateData = {
  userid: "",
  password: "",
};

export default function Login() {
  const [loginDetails, setLoginDetails] = React.useState(initialStateData);

  React.useEffect(() => {
   getApiData()
  },[])

  //api fetching
  async function getApiData() {
    await getApp().then((res) => {
      if(res) {
        setLoginDetails(res)
      }
    })
  }

  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );

  const onLoginData = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (loginDetails.userid === "") {
      alert("UserId is required");
    } else if (loginDetails.password === "") {
      alert("Password is required");
    } else {
      alert("Login Successfully");
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
    }
    let bodyContent = new FormData();
    bodyContent.append("userid", encodeString(DataTransfer.get("userid")));
    bodyContent.append("password", encodeString(DataTransfer.get("password")));
    await login (bodyContent).
    then(userData => {
      if(userData !== null){
        if (userData.user.flag){
          setLoginDetails(userData.user.userid)
        } else {
          setLoginDetails({})
        }
      }
    })
  };
  return (
    <>
      {!loggedIn ? (
        <div className="card-bg-color">
          <Box className="cardContainer">
            <Card variant="outlined" className="loginItemJustification">
              <CardContent>
                <img src={Logo} alt="IntegraLogo" className="integralogo" />
              </CardContent>
              <CardContent>
                <Typography variant="h6">
                  Complaint Management System
                </Typography>
              </CardContent>
              <CardContent>
                <TextField
                  fullWidth
                  id="userid"
                  name="userid"
                  label="User Id"
                  variant="outlined"
                  required
                  autoComplete="off"
                  value={loginDetails.userid}
                  onChange={onLoginData}
                />
              </CardContent>
              <CardContent>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  required
                  autoComplete="off"
                  value={loginDetails.password}
                  onChange={onLoginData}
                />
              </CardContent>
              <a href="/" target="_blank" class="forgotbutton">
                Forgot Password?
              </a>
              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Box>
        </div>
      ) : (
        <Menudrawers onLogout={() => setLoggedIn(false)} onInitialState={() => setLoginDetails(initialStateData)}/>
      )}
    </>
  );
}


