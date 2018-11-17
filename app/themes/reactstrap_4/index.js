import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Navbar, Button, Alert } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

import styled from 'styled-components';

import React from 'react';

const theme = {
  VerticalForm: {
    form: class extends React.Component {
      render() {
          return (
          <Form {...this.props} style={{margin: '1.5rem 0'}}>{this.props.children}</Form>
          )
      }
    },
  },

  BlockInput: {
    block: FormGroup,
    label: Label,
    input: Input
  },

  Breadcrumbs: {
    breadcrumb: Breadcrumb,
    item: BreadcrumbItem,
    activeItem: class extends React.Component {
      render() {
          return (
          <BreadcrumbItem active {...this.props}>{this.props.children}</BreadcrumbItem>
          )
      }
    },
    separator: React.Fragment
  },

  ScreenList: {
    list: class extends React.Component {
      render() {
          return (
          <ListGroup style={{margin: '1.5rem 0'}} {...this.props}>{this.props.children}</ListGroup>
          )
      }
    },
    element: ListGroupItem 
  },

  StatusBar: {
    container: class extends React.Component {

      render() {
        const StyledContainer = styled(Container)`
            padding: 0.25rem;
            align-items: center;
            background-color: #e9ecef;
          `;

          const StyledRow = styled(Row)`
            padding: 0.25rem;
            align-items: center;
          `;
          
          return (
              <StyledContainer {...this.props}>
                <StyledRow>{this.props.children}</StyledRow>
              </StyledContainer>
          )
      }
    },

    text: class extends React.Component {

      render() {
          const Text = styled.div`
              
          `;

          return (
            <Col xs={12} sm={10}><Text className={"text-muted"} {...this.props}>{this.props.children}</Text></Col>
          )
      }
    },

    saveButton: class extends React.Component {
      render() {
          return (
            <Col xs={12} sm={2}><Button style={{width: '100%'}} color="primary" {...this.props}>{this.props.children}</Button></Col>
          )
      }
    },
  }
}

export default theme