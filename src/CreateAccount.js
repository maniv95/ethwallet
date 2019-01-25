import React, { Component } from 'react';
import {Table,Grid,Button} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import './App.css';
var Main = require('./File');
class CreateAccount extends Component{
	constructor(props){
	    super(props)
	    this.state = {
	      Password:'',
        PrivateKey:'null'
	    }
	    this.updatePassword = this.updatePassword.bind(this);
	    this.onCreate = this.onCreate.bind(this);
      this.clearFields = this.clearFields.bind(this);
	}
	updatePassword(a){
    	this.setState({Password: a.target.value});
  	}
	onCreate = async () => {
  	try{
  		var a = Main.KeyStoreGen(this.state.Password);
      this.setState({PrivateKey:a});
  	}
  	catch(error){
  		console.log(error);
  	}
  }
  clearFields = () => { 
        this.setState({
          Password:'',
          PrivateKey:'null'
        });
  }
    render(){
  		return(
        <div className="App">
              <br/><br/>
          		<header className="App-header">
          		  <h2>Create New Blockchain Account</h2>
          		</header>
              <Grid>
                <div>
                <Row>
                <Col>
                <Card body inverse style={{backgroundColor:'#222', borderColor:'#222',height:'22vw'}}>
                  <CardBody>
                  <br/>
                   <h3 style={{color:"white"}}>Enter New Password</h3><br/>
                   <div>
                      <input type ="password" value = {this.state.Password} onChange = {this.updatePassword} placeholder="Enter Password"/>
                   </div>
                   <br/><br/>
                    <Button onClick = {this.onCreate}>Download Keystore</Button> <Button name="clearFields" onClick={this.clearFields}>Clear</Button>
                    <br/><br/>
                   <br/><br/>
                    <Table>
                    <tbody>
                    <tr>
                    <td>PrivateKey</td>
                    <td>{this.state.PrivateKey}</td>
                    </tr>
                    </tbody>
                    </Table><br/><br/>
                </CardBody>
                </Card>
                </Col>
                </Row>
                </div>
                </Grid>
        </div>
  		);
  	}
}
export default CreateAccount;