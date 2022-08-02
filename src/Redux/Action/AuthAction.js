import ExportApi from "../../Apis/ExportApi";
import jwt_decode from "jwt-decode";
import { BaseApi } from "../../Apis/BaseApi";
import { useNavigate } from 'react-router-dom'

export const LoginAction = (user) => ({
  type: "LOGIN",
  user,
});

// export const LoginFunction = (username, password) => { 
//         return()=>{
//           ExportApi.LoginRMS(username, password).then(
//             (resp) => {
//                 if (resp.ok) {
//                     let Data = resp.data;
//                     console.log(Data)
                    
//                 }
//             });
//         }
//     }

    export const LoginFunction = (username, password) => {
 
      return (dispach) => {
       // dispach(invalidUserErrorAction(""));
       ExportApi.LoginJBT(username, password)
          .then((resp) => {
            if (resp.ok) {
              console.log(resp.Data)
              dispach(resp.Data)
              //dispach(authAction(true));
             // localStorage.setItem("user", resp.data.token);
              //let token = localStorage.getItem("user");
              //let decoded = jwt_decode(token);
              //let uEntityId = parseInt(decoded.unique_name);
             // dispach(getCurrentUser(uEntityId));
             // BaseApi.setHeader("Authorization", `BEARER ${token}`);
             // console.log("decoded", decoded.unique_name);
             // history.push("/dashboard");
            } else {
              //dispach(invalidUserErrorAction("Invalid Credintials."));
            }
          })
          .catch((err) => console.log(err));
          
      };
    };