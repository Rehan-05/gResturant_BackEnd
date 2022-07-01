
import React from "react";
// react plugin that prints a given react component
import ReactToPrint from "react-to-print";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
import Api from '../../../Api/api';
import { useSelector } from "react-redux";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import { dataTable } from "variables/general";

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

function TableData() {
  
  const user = useSelector(({ LoginUser }) => LoginUser.auth);

  const [alert, setAlert] = React.useState(null);
  const [restaurant, setRestaurant] = React.useState([]);
  const componentRef = React.useRef(null);
  


  const Get_Restaurant  = async() =>{
    await Api.Get_Restaurant( user.accessToken ).then((res)=>{
      console.log("requirement for the specific module is here",res);
      setRestaurant(res.data.data);
    }).catch((err)=>{
      console.log("name is empty", err);
    })
   }

   
   React.useEffect(() => {
    Get_Restaurant();
   }, [restaurant]);


  const copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Good job!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        Copied to clipboard!
      </ReactBSAlert>
    );
  };

  return (
    <>
      {alert}
    
      <Container  fluid>
        <Row>
          <div className="col">
           
            <Card>
              <CardHeader>
                <h3 className="mb-0">Restaurant Detail</h3>
                <p className="text-sm mb-0">
                  All the Restaurant Detail will be shown here.
                </p>
              </CardHeader>
             
              <ToolkitProvider
                data={restaurant}
                keyField="name"
                // style={{ height: 30 }}
                columns={[
                  {
                    dataField: "Res_BrandName",
                    text: "Restaurant name",
                    style: {width: 160 },
                    sort: false,
                  },
                  {
                    dataField: "Res_BrandLogo",
                    text: "Restaurant Logo",
                    sort: false,
                    style: { textAlign: "center",justifyContent: "center",width:130 },
                    formatter: (cell, row) => (
                      <img src={row.Res_BrandLogo.toString('base64')} style={{}} alt="img" height="60"  />
                    ),

                  },
                  {
                    dataField: "office",
                    text: "Edit",
                    sort: true,
                    style: { textAlign: "center",justifyContent: "center",width:100 },
                    formatter: (cell, row) => (
                      <ButtonGroup>
                        <Button color="secondary" size="lg">
                          <i className="fa fa-edit text-default"></i>
                        </Button>
                        {/* <Button color="danger" size="sm">
                          
                          <i className="fa fa-trash"></i>
                        </Button> */}
                      </ButtonGroup>
                    ),  
                  },
                  {
                    dataField: "age",
                    text: "Delete",
                    sort: true,
                    style: { textAlign: "center",justifyContent: "center",width:100 },
                    formatter: (cell, row) => (
                      <ButtonGroup>
                        <Button color="secondary" size="lg">
                        
                          <i className="fa fa-trash text-danger" color="danger"></i>
                        </Button>
                      </ButtonGroup>
                    ),  
                  },
                  {
                    dataField: "start_date",
                    text: "ADD New Branch",
                    sort: true,
                    style: { textAlign: "center",justifyContent: "center",width:100 },
                    formatter: (cell, row) => (
                      <ButtonGroup>
                        <Button color="secondary" size="lg">
                          <i className="fa fa-plus text-primary" ></i>
                          </Button>
                      </ButtonGroup>
                    ),  
                  },
                  
                ]}
                search
              >
                {(props) => (
                  <div className="py-4 table-responsive">
                    <Container fluid>
                      <Row>
                        <Col xs={12} sm={6}>
                          <ButtonGroup>
                            <Button
                              className="buttons-copy buttons-html5"
                              color="default"
                              size="sm"
                              id="copy-tooltip"
                              onClick={() =>
                                copyToClipboardAsTable(
                                  document.getElementById("react-bs-table")
                                )
                              }
                            >
                              <span>Copy</span>
                            </Button>
                            <ReactToPrint
                              trigger={() => (
                                <Button
                                  color="default"
                                  size="sm"
                                  className="buttons-copy buttons-html5"
                                  id="print-tooltip"
                                >
                                  Print
                                </Button>
                              )}
                              content={() => componentRef.current}
                            />
                          </ButtonGroup>
                          <UncontrolledTooltip
                            placement="top"
                            target="print-tooltip"
                          >
                            This will open a print page with the visible rows of
                            the table.
                          </UncontrolledTooltip>
                          <UncontrolledTooltip
                            placement="top"
                            target="copy-tooltip"
                          >
                            This will copy to your clipboard the visible rows of
                            the table.
                          </UncontrolledTooltip>
                        </Col>
                        <Col xs={12} sm={6}>
                          <div
                            id="datatable-basic_filter"
                            className="dataTables_filter px-4 pb-1 float-right"
                          >
                            <label>
                              Search:
                              <SearchBar
                                className="form-control-sm"
                                placeholder=""
                                {...props.searchProps}
                              />
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                    <BootstrapTable
                      ref={componentRef}
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={true}
                      id="react-bs-table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default TableData;
