import Form from "react-bootstrap/Form";
import React, {Component} from "react";
import DarkButton from "./DarkButton";

class RegForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                name:"",
                username:"",
                contactNumber:0,
                email:"",
                password:""
            };
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    onChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit= (e) =>
    {
        e.preventDefault();
        const details =
            {
                // identifier: this.state.email,
                // password: this.state.password
            }
        //userLogin(details).then(value =>
        {
            // value is the return of userLogin
            //console.log(`value is: ${value}`);
        }
        //);
    }

    render() {
        let label = {label: 'I dont rly work yet', link: '/register'};
        return (
            <div>
                <Form className="mr-auto" onSubmit={this.handleSubmit}>
                    <div className="transparentDiv">
                        <Form.Group>
                            <Form.Control type="text" placeholder="Username: " value={this.state.username} onChange={this.onChange}/>

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange} name="email"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="text" placeholder="Person Name: " value={this.state.name} onChange={this.onChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="number" placeholder="Contact Number: " value={this.state.contactNumber} onChange={this.onChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                        </Form.Group>
                    </div>

                </Form>
                <DarkButton label={label}/>
            </div>
        )
    }
}

export default RegForm;