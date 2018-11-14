import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import React from 'react';

const formGroup = () => {
    return class extends React.Component {
        render() {
            return (
            <FormGroup row {...this.props}>
                {this.props.children}
            </FormGroup>
            )
        }
    }
}

const label = () => {
    return class extends React.Component {
        render() {
            return (
            <Label sm={3} {...this.props}>
                {this.props.children}
            </Label>
            )
        }
    }
}

const input = () => {
    return class extends React.Component {
        render() {
            return (
            <Col sm={6}>
                <Input {...this.props}>
                    {this.props.children}
                </Input>
            </Col>
            )
        }
    }
}

const theme = {
  BlockInput: {
    block: formGroup(),
    label: label(),
    input: input()
  }
}

export default theme