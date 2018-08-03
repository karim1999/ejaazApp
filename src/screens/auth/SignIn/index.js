import React, { Component } from 'react';
import {Text} from 'native-base';
import AuthTemplate from "../../auth/authTemplate";
import Colors from "../../../constants/colors";
import server from "../../../constants/server"
export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
          categories:[{
            id:1,
            name:'first category'
          }]
        }
    }
    componentDidMount(){
      // Imprtant Read it --------------------------------->
      /*
      (here we use fetch function to get data from server and we set it into
      state via function called setState
      and we have constant for the server imported
      use it  : server.url
    )
      --hint
      please note that hint is created for you to search for the names mentioned here
      and don't always ask project owner make google your best friend
      */
    }
    render() {
        return (
            <AuthTemplate>
                <Text style={{color: Colors.mainColor}}>SignIn</Text>
                {
                  // that is how we add js into code
                  // plese note when you fetch a lot of data use flatlist
                }
            </AuthTemplate>
        );
    }
}
