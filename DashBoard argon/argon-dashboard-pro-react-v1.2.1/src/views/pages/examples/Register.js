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
import React ,{useRef,useState} from "react";
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
import AuthHeader from "components/Headers/AuthHeader.js";
import Api from '../../../Api/api';

function Register() {
  const history = useHistory();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const [names, setNames] = useState('');
  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');
  
  const [nameState,setNameState] = React.useState(null);
  const [emailState,setEmailState] = React.useState(null);
  const [passwordState,setPasswordState] = React.useState(null);

  const [focusedName, setfocusedName] = useState(false);
  const [focusedEmail, setfocusedEmail] = useState(false);
  const [focusedPassword, setfocusedPassword] = useState(false);

  const OnRegisterUser = () => {
    const data = {
      name: names,
      email: emails,
      password: passwords,
    }
    console.log("dsdsdsddsdsd",data)
    Api.SignUp(data)
    .then(res => {
      console.log(res);
      alert('Register Success');
      history.push("/admin/dashboard");
    }
    )
    .catch(err => {
      console.log("errrrrrrrrrrrrrrrorrrrrr",err);
      alert('Register Failed');
    }
    )
  }


  const validateEmail = (emails) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emails).toLowerCase());
  }

  const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  const validateCustomStylesForm = () => {
   
    if(names === '' || emails.length <3 ){
      setNameState('error');
    }
    else if (emails === "" || emails.length<10) {
      setEmailState("invalid");
    } else if (!validateEmail(emails)) {
      setEmailState("invalid");
    } else  if (passwords === "" || passwords.length<10 || !mediumRegex.test(passwords)){
      setEmailState("invalid");
    }
    else {
      setEmailState("valid");
      setEmailState("valid");
      setPasswordState("valid");
      
      // OnRegisterUser();
      alert("Validation successfully Applied");
      history.push("/admin/dashboard");
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
      <AuthHeader
        title="Create an account"
        // lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-4">
                  <small>Sign up with</small>
                </div>
                <div className="text-center">
                  <Button
                    className="btn-neutral btn-icon mr-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/github.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Github</span>
                  </Button>
                  <Button
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
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign up with credentials</small>
                </div>
                <Form className="needs-validation" noValidate>
                  <FormGroup
                    className={classnames({
                      focused: focusedName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        onFocus={() => setfocusedName(true)}
                        onBlur={() => setfocusedName(false)}
                        ref={name}
                        value={names}
                        valid={nameState === "valid"}
                        invalid={nameState === "invalid"}
                        onChange={(e) => {
                        setNames(e.target.value);
                        if (e.target.value === "" || e.target.value.length < 3 ) {
                             setNameState("invalid");
                          } else {
                              setNameState("valid");
                            }
                        }}
                      />
                       <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Name invalid</div>
                  
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
                        ref={email}
                        value={emails}
                        valid={emailState === "valid"}
                        invalid={emailState === "invalid"}
                        onChange={(e) => {
                        setEmails(e.target.value);
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
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(false)}
                        ref={password}
                        value={passwords}
                        valid={passwordState === "valid"}
                        invalid={passwordState === "invalid"}
                        onChange={(e) => {
                        setPasswords(e.target.value);
                        if (e.target.value === "" || e.target.value.length<6 || !mediumRegex.test(e.target.value)) {
                          setPasswordState("invalid");
                         } else {
                              setPasswordState("valid");
                          }
                        }}
                      />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Password invalid</div>
                    </InputGroup>
                  </FormGroup>
                  <div className="text-muted font-italic">
                    <small>
                      password strength:{" 9 "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center" onClick={()=>validateCustomStylesForm()}>
                    <Button className="mt-4" color="info" type="button">
                      Create account
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

export default Register;
