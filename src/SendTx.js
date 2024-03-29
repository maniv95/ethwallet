import React, { Component } from 'react';
import {Table,Grid,Button,Form} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import $ from 'jquery';
import './App.css';
var Main = require('./File');
class SendTx extends Component {
  	constructor(props){
  	    super(props)
  	    this.state = {
  	      Password1:'',
  	      BCAddress:'null',
  	      Balance:'null',
  	      Receiver:'',
  	      Receiver1:'',
  	      Amount:'',
  	      TxCount:'null',
  	      ATxHash:'null',
  	      key:'',
  	      gas:'3000000',
          txnn:'',
          estGas:'null'
  	    }
  	    this.onReaderLoad = this.onReaderLoad.bind(this); 
  	    this.updatePasswordWhenLogin = this.updatePasswordWhenLogin.bind(this);
  	    this.updateReceiver = this.updateReceiver.bind(this);
  	    this.updateAmount = this.updateAmount.bind(this);
  	    this.onLogin = this.onLogin.bind(this);
  	    this.onSendTx = this.onSendTx.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.onEstimate = this.onEstimate.bind(this);
  	}
	  updatePassword(a){
    	this.setState({Password: a.target.value});
  	}
  	updateReceiver(b){
    	this.setState({Receiver: b.target.value});
    }
    updateAmount(c){
    	this.setState({Amount: c.target.value});
  	}
  	updatePasswordWhenLogin(d){
    	this.setState({Password1: d.target.value});
  	}
  	updateReceiver1(f){
    	this.setState({Receiver1: f.target.value});
    }
     onEstimate = () => {
      var est = Main.EstimateGas(this.state.Receiver,this.state.Amount);
      this.setState({estGas:est});
    }
  	onChange = async(event)=>{
	    let reader = new FileReader();
	    reader.onload = this.onReaderLoad;
	    reader.readAsText(event.target.files[0]);
    }

    onReaderLoad = async(event)=>{
	    var obj = JSON.parse(event.target.result);
	    this.setState({key: obj});
    }
  	onLogin = async () =>{
  		try{
  			Main.LoginWithKeyStoreFile(this.state.key,this.state.Password1);
  			var Balance = Main.ViewBalance(this.state.key.address);
  			this.setState({Balance:Balance});
  			var khex="0x";
  			var address=khex.concat(this.state.key.address);
  			this.setState({BCAddress:address});
        this.setState({gas:Main.gas});
  		}
  		catch(error){
  			console.log(error);
  		}
  	}
  	onSendTx = async() =>{
  		try{
  			var Tx = Main.SendTx(this.state.BCAddress,this.state.Receiver,this.state.Amount,this.state.Password1,this.state.gas);
  			console.log(Tx);
  			this.setState({ATxHash:Tx});
  			var Count = Main.GetTxCount(this.state.BCAddress);
  			this.setState({TxCount:Count});
  		}
  		catch(error){
  			console.log(error);
  		}
  	}
    clearFields = () => { 
        this.setState({
          Password1:'',
          BCAddress:'null',
          Balance:'null',
          Receiver:'',
          Receiver1:'',
          Amount:'',
          TxCount:'null',
          ATxHash:'null',
          key:'',
          gas:'',
          txnn:''
      });
      $("#FileSelect").val('');
    }
  	render(){
  		return(
  			<div className="App">
            <br/><br/>
          		<header className="App-header">
          		  <h2>Send Transactions</h2>
          		</header>
              <Grid>
                <div>
                <Row>
                <Col>
                <Card body inverse style={{width:"100%",backgroundColor:'#222', borderColor:'#222',height:'45vw'}}>
                  <CardBody><br/>
	              <h4 style={{color:"white"}}> Login To Send</h4><br/>
	              <Form>
	                  <input type = "file" id="FileSelect" onChange={this.onChange}/>
	              </Form><br/>
		                <div>
		                  <input type = "password" value = {this.state.Password1} onChange = {this.updatePasswordWhenLogin} placeholder=" Enter Password "/>
		                </div><br/>
               				<Button onClick = {this.onLogin}>Login</Button><br/><br/>
               		<Form>
               		 <b style={{color:"white"}}>Receiver Address</b> <br/><br/>
               		   <input type="text" value={this.state.Receiver} onChange={this.updateReceiver} placeholder="Enter Receiver Address"/>
               		 <br/><br/>
               		 <b style={{color:"white"}}>Amount To Send (In Ethers)</b><br/><br/>
               		 <input type="text" value={this.state.Amount} onChange={this.updateAmount} placeholder="Enter Amount"/>
               		 <br/>
               		</Form>
               		<br/>
                  <div>
                        <button onClick={this.onSendTx}>Send</button> <Button name="clearFields" onClick={this.clearFields}>Clear</Button>
                  </div>
                  <br/><br/>
		            <Table bordered responsive>
		                <thead>
                  			<tr>
                    			<th>Property</th>
                    			<th>Values</th>
                  			</tr>
                		</thead>
		                <tbody>
		                 <tr>
		                   <td>Balance</td>
		                   <td>{this.state.Balance}</td>
		                 </tr>
		                 <tr>
		                   <td>My Address </td>
		                   <td>{this.state.BCAddress}</td>
		                 </tr>
		                 <tr>
		                    <td>Receiver Address</td>
		                    <td>{this.state.Receiver}</td>
		                 </tr>
		                 <tr>
		                   <td>Enter Amount To Send </td>
		                   <td>{this.state.Amount}</td>
		                 </tr>
                     <tr>
                       <td>Estimate Gas</td>
                       <td>{this.state.estGas}</td>
                     </tr>
		                 <tr>
		                  <td>Gas</td>
		                  <td>{this.state.gas}</td>
		                 </tr>
		                 <tr>
		                  <td>Transaction Hash </td>
		                  <td>{this.state.ATxHash}</td>
		                 </tr>
		                 <tr>
		                  <td>Transaction Count </td>
		                  <td>{this.state.TxCount}</td>
		                 </tr>
                        </tbody>
                   </Table><br/>
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
export default SendTx;