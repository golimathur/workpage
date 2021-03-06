import React, {Component} from 'react';
import axios from 'axios';

class Form extends React.Component{
  
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        message: ''
      }
    }
  
    handleSubmit(e){
      e.preventDefault();
      axios({
        method: "POST", 
        url:"http://localhost:3000/send", 
        data:  this.state
      }).then((response)=>{
        if (response.data.status === 'success'){
          alert("Message Sent."); 
          this.resetForm()
        }else if(response.data.status === 'fail'){
          alert("Message failed to send.")
        }
      })
    }
  
    resetForm(){
      
       this.setState({name: '', email: '', message: ''})
    }
    
    render() {
      return(
        <div>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
        <div className="formgroup">
           
            <input type="text" className="formcontrol" placeholder="Name" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
        </div>
        <div className="formgroup">
          <input type="email" className="formcontrol" id="email" placeholder="Email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
        </div>
        <div className="formgroup">
            
            <textarea className="formcontrol" rows="5" id="message"placeholder="Message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
        </div>
        <button type="submit" className="btnprimary">Submit</button>
        </form>
        </div>
      );
    }
  
    onNameChange(event) {
      this.setState({name: event.target.value})
    }
  
    onEmailChange(event) {
      this.setState({email: event.target.value})
    }
  
    onMessageChange(event) {
      this.setState({message: event.target.value})
    }
  }
  

  
  export default Form;