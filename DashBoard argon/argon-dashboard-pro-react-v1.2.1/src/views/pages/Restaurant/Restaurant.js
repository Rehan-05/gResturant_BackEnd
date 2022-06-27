/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React , {useRef} from "react";
import { Link,Redirect,history, useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import RestauHeader from "components/Headers/RestauHeader.js";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { gapi } from "gapi-script";
import axios  from "axios";

function Restaurant() {

  const email = useRef(null);
  const password = useRef(null);

  const history = useHistory();

  const [emailValuec,setEmailValue] = React.useState('');
  const [emailState,setEmailState] = React.useState(null);

  const [passwordValuec,setPasswordValue] = React.useState('');
  const [passwordState,setPasswordState] = React.useState(null);
  
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  
  const responseSucsessGoogle = (response) => {
    console.log("Data successfully load on the google api",response);
    axios({
      method: "POST",
      url: "http://localhost:3003/api/auth/googleSignIn",
      data: { tokenId:response.tokenId },
    }).then((res) => {
      console.log("Data successfully load on the google api",res);
      alert("User successfully login & added into DB");
      history.push("/admin/dashboard");
    }
    ).catch((err) => {
      if(err.status === 401){
        console.log("User not found",err);
      }
      else if(err.status === 500){  
        console.log("Internal server error",err);
      }
      else if(err.status === 400){
        console.log("Bad request",err);
      }
      else if(err.status === 404){
        console.log("Not found",err);
      }else if(err.status === 403){
        console.log("Forbidden",err);
      }
    }
    );
  }
 
  const responseFacebook = (response) => {
    console.log("Data successfully load on the google api",response);
    axios({
      method: "POST",
      url: "http://localhost:3003/api/auth/facebookSignIn",
      data: { tokenId:response.tokenId , UserID : response.userID },
    }).then((res) => {
      console.log("Data successfully Send on the faceBook api",res);
      alert("User successfully login & added into DB");
      // history.push("/admin/dashboard");
    }
    ).catch((err) => {
      console.log('Error in Faceeebook api',err);
    }
    );
  }
  

  const responseErrorGoogle = (response) => {
    console.log("Here is the error in the response",JSON.stringify(response));
    alert("User having an error in their code");
  }
  
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
        clientId: '345591705626-n5cpvj7i8cklkt9vv5j2gdd0519t47q7.apps.googleusercontent.com',
        plugin_name: "chat"
    })
   })


  const OnLoginSubmit = () =>{
    
    var data = {
      email: emailValuec,
      password: passwordValuec,
    };
    console.log("values are here",data );

    axios({
      method: "POST",
      url: "http://localhost:3003/api/auth/signin",
      data: data,
    }).then((res) => {
      console.log("Login Data is shown here...",res);
      alert("User successfully login");
      history.push("/admin/dashboard");
    }
    ).catch((err) => {
     // history.push("/admin/dashboard");
      console.log("here is the error", JSON.stringify(err));
    }
    );
  }


   const validateEmail = (emailValuec) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailValuec).toLowerCase());
  }

  const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  const validateCustomStylesForm = () => {
    
    if (emailValuec === "" || emailValuec.length<10) {
      setEmailState("invalid");
    } else if (!validateEmail(emailValuec)) {
      setEmailState("invalid");
    } else  if (passwordValuec === "" || passwordValuec.length<6 || !mediumRegex.test(passwordValuec)){
      setEmailState("invalid");
    }
    else {
      setEmailState("valid");
      setPasswordState("valid");
      history.push("/admin/dashboard");
      // OnLoginSubmit();
      alert("Validation successfully Applied");
    } 
  };

  // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict';

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    })();

 
  return (
    <>
      <RestauHeader
        title="ADD RESTAURANT"
      />
      <Container >
      
        <Row className="justify-content-center">
        
          <Col lg="9" md="10">
            <Card className="bg-secondary border-0 mb-0">
             
              <CardBody className="px-lg-5 py-lg-2">
                
                <Form className="needs-validation" noValidate>
                  
                  <FormGroup
                    className={classnames("mb-3 py-lg-2 ", {
                      focused: focusedEmail,
                    })}
                    
                  >
                  
                  <label
                     className="form-control-label"
                     htmlFor="validationCustom01"
                    >
                      Restaurant Name
                    </label>
                    <InputGroup className="input-group-merge input-group-alternative" >
                    
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="email"
                        id="validationCustom01"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                        ref={email}
                        value={emailValuec}
                        required
                        valid={emailState === "valid"}
                        invalid={emailState === "invalid"}
                        onChange={(e) => {
                        setEmailValue(e.target.value);
                        if (e.target.value === "" || e.target.value.length < 9 || validateEmail(e.target.value) === false) {
                          setEmailState("invalid");
                            } else {
                              setEmailState("valid");
                            }
                        }}
                      />
                      
                      <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Email invalid</div>
                    
                    </InputGroup>
                   
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                   <label
                          className="form-control-label"
                          htmlFor="validationCustom01"
                        >
                          Restaurant Address
                    </label>
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Address"
                        type="password"
                        id="validationCustom02"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        ref={password}
                        required
                        value={passwordValuec}
                        valid={passwordState === "valid"}
                        invalid={passwordState === "invalid"}
                        onChange={(e) => {
                          setPasswordValue(e.target.value);
                          if (e.target.value === "" || e.target.value.length<6 || !mediumRegex.test(e.target.value)) {
                              setPasswordState("invalid");
                            } else {
                              setPasswordState("valid");
                            }
                        }}
                      />
                       <div className="valid-feedback">Looks good!</div>
                       <div className="invalid-feedback">
                        Password invalid
                     </div>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                   <label
                          className="form-control-label"
                          htmlFor="validationCustom01"
                        >
                          Restaurant Phone Number

                    </label>
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        id="validationCustom02"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        ref={password}
                        required
                        value={passwordValuec}
                        valid={passwordState === "valid"}
                        invalid={passwordState === "invalid"}
                        onChange={(e) => {
                          setPasswordValue(e.target.value);
                          if (e.target.value === "" || e.target.value.length<6 || !mediumRegex.test(e.target.value)) {
                              setPasswordState("invalid");
                            } else {
                              setPasswordState("valid");
                            }
                        }}
                      />
                       <div className="valid-feedback">Looks good!</div>
                       <div className="invalid-feedback">
                        Password invalid
                     </div>
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="info" type="button"
                      onClick={()=>{ validateCustomStylesForm()}} >
                        Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
           
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Restaurant;
