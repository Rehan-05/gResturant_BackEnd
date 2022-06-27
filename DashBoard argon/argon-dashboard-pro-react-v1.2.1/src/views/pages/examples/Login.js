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
import { Link,Redirect } from "react-router-dom";
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
import AuthHeader from "components/Headers/AuthHeader.js";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { gapi } from "gapi-script";
import axios  from "axios";

function Login() {
  const email = useRef(null);
  const password = useRef(null);

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
      <Redirect from="/" to="/dashboard" />
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

   const responseFacebook = (response) => {
     console.log(response);
  }

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
      <Redirect from="/" to="/dashboard" />
    }
    ).catch((err) => {
      <Redirect form="*" to="/admin/dashboard" />
      console.log("here is the error", JSON.stringify(err));
      // if(err.status === 401){
      //   console.log("User not found",err);
      // }
      // else if(err.status === 500){  
      //   console.log("Internal server error",err);
      // }
      // else if(err.status === 400){
      //   console.log("Bad request",err);
      // }
      // else if(err.status === 404){
      //   console.log("Not found",err);
      // }else if(err.status === 403){
      //   console.log("Forbidden",err);
      // }
    }
    );
  }

  const validateCustomStylesForm = () => {
    console.log("neweweweewewe", emailValuec);
     console.log("neweweweewewe", passwordValuec);
    if (emailValuec === ""  ) {
      setEmailState("invalid");
      console.log("invlaid is here")
    } else {
      setEmailState("valid");
    }
    if (passwordValuec === "" ) {
      setPasswordState("invalid");
    } else {
      setPasswordState("valid");
    }
  };

 
  return (
    <>
      <AuthHeader
        title="Welcome!"
        // lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                   {/* <FacebookLogin
                        appId="1084307552514364"
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        style={{width:1,height:1}}
                         /> */}
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/facebook.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Facebook</span>
                  </Button>
                  {/* <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/google.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button> */}
                  <GoogleLogin
                    clientId="345591705626-n5cpvj7i8cklkt9vv5j2gdd0519t47q7.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={responseSucsessGoogle}
                    onFailure={responseErrorGoogle}
                    // cookiePolicy={'single_host_origin'}
                  />
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-2">
                <div className="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                </div>
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
                      Email
                    </label>
                    <InputGroup className="input-group-merge input-group-alternative" >
                    
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
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
                        if (e.target.value === "") {
                          setEmailState("invalid");
                            } else {
                              setEmailState("valid");
                            }
                        }}
                      />
                      <div className="valid-feedback">Looks good!</div>
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
                          Password
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
                          if (e.target.value === "") {
                            setPasswordState("invalid");
                            } else {
                              setPasswordState("valid");
                            }
                          
                        }}
                      />
                    </InputGroup>
                    <div className="invalid-feedback">
                          Please choose a username.
                        </div>
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
                      onClick={()=>{ validateCustomStylesForm(); alert("Next Clicked")}} >
                      {/* <Link to={"/admin/dashboard"}>
                         Sign in
                      </Link> */}
                      Next
                      
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                 <Link
                    // style={{color:"white",cursorColor:"blue"}}
                    to="/auth/register"
                  >
                   <small>Create new account</small>
                  </Link>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
