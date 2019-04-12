import React ,{ Component } from 'react';

class  UserInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      profile:""
    };
  }

  logout = () => {
    this.props.auth.logout();
  }

  componentDidMount(){
    const { userProfile ,getProfile } = this.props.auth;
    console.log(userProfile)
    getProfile((err,profile)=>{
      this.setState({profile:profile})
    })
  }
  render(){
      const { profile } = this.state
      return (
        <div className="float-right"  >
         <p style={{display:'inline',margin:10}}>{ profile.email }</p>
         <button onClick={this.logout}>Log Out</button>
      </div>
      );
  }
}

export default UserInfo;
