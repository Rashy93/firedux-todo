import React, {Component} from 'react';
import { connect } from 'react-redux';


import { auth, createUserProfileDocument } from './config/firebase';
import { setCurrentUser } from './reducers/user/user.actions';
import List from './components/List';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }) 
          }
          , () => {
            console.log(this.state)
          }
          );        
      } 
      setCurrentUser(userAuth)

    }); 
  }

  componentWillUnmount() {
      this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div className="container">
          <List />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);