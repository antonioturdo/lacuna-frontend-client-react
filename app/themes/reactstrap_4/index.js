import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Navbar, Button } from 'reactstrap';

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
          return (
          <Navbar style={{'backgroundColor': '#eee'}} {...this.props}>{this.props.children}</Navbar>
          )
      }
    },
    saveButton: class extends React.Component {
      render() {
          return (
          <Button color="primary" {...this.props}>{this.props.children}</Button >
          )
      }
    },
  }
}

export default theme