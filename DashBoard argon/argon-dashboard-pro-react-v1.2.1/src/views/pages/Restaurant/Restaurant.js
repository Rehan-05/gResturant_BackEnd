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
import Api from '../../../Api/api';
import { Restaurant_Data } from "./DataModel";
import classnames from "classnames";
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
import RestauHeader from "components/Headers/RestauHeader.js";
import { useSelector } from "react-redux";  

  function Restaurant() {

  const user = useSelector(({ LoginUser }) => LoginUser.auth);
  console.log("jflksdjfkdsflksdjflksj",user.accessToken)
  const [dataModel, setDataModel] = React.useState(Restaurant_Data);
  
  const [focusedName, setfocusedName] = React.useState(false);
  const [focusedfile, setfocusedFile] = React.useState(false);

  const onNameChangeHandle = (event) => {
    setDataModel({ ...dataModel, Res_BrandName: event.target.value });
  };

  const onfileOnChange = (event) => {
    setDataModel({ ...dataModel, file:event.target.files[0],fileName:event.target.files[0].name });
  };

  const add_Restaurant = () => {

    // debugger
    // if(dataModel.Res_BrandName.length  == 0){
    //   console.log("name is empty");
    //   return;
    // }else if(dataModel.file.length == 0){
    //   console.log("name is empty");
    //   return;
    // }

    var data = new FormData();
    data.append('Res_BrandName', dataModel.Res_BrandName);
    data.append("file", dataModel.file);

    Api.Restaurant_Add( data ,  user.accessToken ).then((res)=>{
      
      console.log("requirement for the specific module is here",res)
      setDataModel(Restaurant_Data);
      alert("Restaurant added successfully");
    }).catch((err)=>{
      console.log("name is empty", err);
    })

  }

  return (
    <>
      <RestauHeader
        title="ADD RESTAURANT"
      />
      <Container >
      
        <Row className="justify-content-center">
        
          <Col lg="9" md="10">
            <Card className="bg-secondary border-1 mb-0">
             
              <CardBody className="px-lg-5 py-lg-2">
                
                <Form className="needs-validation" noValidate>
                  
                  <FormGroup
                    className={classnames("mb-3 py-lg-2 ", {
                      focused: focusedName,
                    })}
                    
                  >
                  <div>
                        <label for="formFileMultiple" class="form-label"> Restaurant Name</label>
                        <input 
                          // class="form-control" 
                          placeholder="Restaurant Name"
                          onChange={onNameChangeHandle}
                          class="form-control"
                          defaultValue={dataModel.Res_BrandName}
                          onFocus={() => setfocusedName(true)}
                          onBlur={() => setfocusedName(false)}
                          type="text" 
                          id="formFileMultiple" 
                          style={{zIndex:100}}
                        />
                    </div>
                  </FormGroup>

                  <FormGroup className={classnames({ focused: focusedfile, })} >
                  <div class="form-floating ">
                    <label for="formFile" class="form-label">Restaurant Logo</label>
                    <input 
                    class="form-control" 
                    type="file" 
                    id="formFile" 
                    onChange={onfileOnChange}
                    onFocus={() => setfocusedFile(true)}
                    onBlur={() => setfocusedFile(false)}
                    />
                </div>
                  </FormGroup>
                
                  <div className="text-center">
                    <Button className="my-4" color="info" type="button"
                      onClick={()=>{ add_Restaurant() }} >
                        Add Restaurant
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
