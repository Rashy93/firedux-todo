import React, { Component } from 'react';// import App from './App';
import Main from '../../components/main/main.component'
import Aside from '../../components/aside/aside.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './homepage.styles.scss'

class HomePage extends Component {
    state = {  
        currentUser: {},
        list: []
        
  }
  handleOnClick = (todo)=> {

    const {list} = this.state
    const newList = [...list, todo];
    this.setState({list: newList})

  }
  componentDidMount(todo) {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              todos: this.todo,
              ...snapShot.data()
            }
          }
          // , () => {
          //   console.log(this.state.currentUser)
          // console.log(this.state.list)
          // }
          );
        });

      } else this.setState({currentUser: userAuth})

    });
 
  }



//   handleSubmit = (todo) => {
 
// }

    render() { 

        const {list, currentUser} = this.state
        console.log(this.state)

        return ( 
            <div className="homepage">
            <Main list={list} currentUser={currentUser} />
            <Aside handleOnClick={this.handleOnClick} />
        </div>
         );
    }
}
 
export default HomePage;