import React from "react";
import { TextField, Button } from "@material-ui/core";
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { nameText: "asd", passwordText: "", token: "" }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }



    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://elax-api.herokuapp.com/api/v1/auth/login', {
                name: this.state.nameText,
                password: this.state.passwordText
            }, {
                "headers": {
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                const token = res.data.token;
                this.props.loginFunc(token);
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="admin-login">
                <TextField name="nameText" required={true} reautoFocus={true} onChange={e => this.handleChange(e)} value={this.nameText} placeholder="Name">Name</TextField>
                <TextField name="passwordText" type="password" required={true} onChange={e => this.handleChange(e)} value={this.passwordText} placeholder="Password">Password</TextField>

                <Button onClick={e => this.handleSubmit(e)}>Submit</Button>
            </div>
        )
    }
}


export default Login;