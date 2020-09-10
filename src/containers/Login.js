import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import "./login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      visible: false,
    };
  }
  handleChange = (key, e) => {
    this.setState({
      [key]: e.target.value.trim(),
    });
  };

  handleSubmit = () => {
    const { account, password } = this.state;
    if (account.toLowerCase() === "admin" && password === "123") {
      this.props.history.push("/home");
    } else {
      this.setState({
        visible: true,
      });
    }
  };

  onDismiss = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <Form className="container">
        <Alert
          color="primary"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          fade={true}
        >
          账号或者密码错误
        </Alert>

        <FormGroup>
          <Label for="account">账号：</Label>
          <Input
            type="text"
            name="account"
            id="account"
            placeholder="请输入账号"
            onChange={(e) => this.handleChange("account", e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">密码：</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="请输入密码"
            onChange={(e) => this.handleChange("password", e)}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}
