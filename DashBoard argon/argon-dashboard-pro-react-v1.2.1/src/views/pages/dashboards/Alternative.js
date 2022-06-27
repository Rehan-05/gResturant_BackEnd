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
import React from "react";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  ListGroupItem,
  ListGroup,
  Media,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import AlternativeHeader from "components/Headers/AlternativeHeader.js";

import {
  chartOptions,
  parseOptions,
  chartExample2,
  chartExample3,
} from "variables/charts.js";

let mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

function DashBoard() {
  React.useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);
  return (
    <>
      <AlternativeHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col md="6" xl="3">
            <Card className="bg-gradient-primary border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Tasks completed
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      8/24
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value="30"
                      color="success"
                    />
                  </div>
                  <Col className="col-auto">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        size="sm"
                        color="neutral"
                        className="mr-0"
                      >
                        <i className="fas fa-ellipsis-h" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <a
                    className="text-nowrap text-white font-weight-600"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    See details
                  </a>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-gradient-info border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Contacts
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      123/267
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value="50"
                      color="success"
                    />
                  </div>
                  <Col className="col-auto">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        size="sm"
                        color="neutral"
                        className="mr-0"
                      >
                        <i className="fas fa-ellipsis-h" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <a
                    className="text-nowrap text-white font-weight-600"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    See details
                  </a>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-gradient-danger border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Items sold
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      200/300
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value="80"
                      color="success"
                    />
                  </div>
                  <Col className="col-auto">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        size="sm"
                        color="neutral"
                        className="mr-0"
                      >
                        <i className="fas fa-ellipsis-h" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <a
                    className="text-nowrap text-white font-weight-600"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    See details
                  </a>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="3">
            <Card className="bg-gradient-default border-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0 text-white"
                    >
                      Notifications
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-white">
                      50/62
                    </span>
                    <Progress
                      className="progress-xs mt-3 mb-0"
                      max="100"
                      value="90"
                      color="success"
                    />
                  </div>
                  <Col className="col-auto">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        size="sm"
                        color="neutral"
                        className="mr-0"
                      >
                        <i className="fas fa-ellipsis-h" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else here
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-sm">
                  <a
                    className="text-nowrap text-white font-weight-600"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    See details
                  </a>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="card-deck flex-column flex-xl-row">
          <Card>
            <CardHeader className="bg-transparent">
              <h6 className="text-muted text-uppercase ls-1 mb-1">Overview</h6>
              <h2 className="h3 mb-0">Sales value</h2>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Line
                  data={chartExample3.data}
                  options={chartExample3.options}
                  id="chart-sales"
                  className="chart-canvas"
                />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Performance
                  </h6>
                  <h2 className="h3 mb-0">Total orders</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Bar
                  data={chartExample2.data}
                  options={chartExample2.options}
                  className="chart-canvas"
                  id="chart-bars"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default DashBoard;
