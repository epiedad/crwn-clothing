import React from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/' element={this.props.currentUser ? <Navigate to="/" replace={true} /> : <SignInAndSignUpPage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route exact path='/signin' element={this.props.currentUser ? <Navigate to="/" replace={true} /> : <SignInAndSignUpPage />}
          />
        </Routes>
      </div>
    )
  }
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
