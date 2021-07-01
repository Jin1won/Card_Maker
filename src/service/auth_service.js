import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  onAuthChanged = (onUserChanged)=> {
    firebase.auth().onAuthStateChanged(user => {
//로그인이 된 상태라면 로그인을 또 할 필요 없이 바로 Maker로 넘어가기 위해 이 함수가 필요
//전달받은 콜백함수에 값을 넘겨주는 식으로 구현하지 않으면 goToMaker함수를 이 클래스에서 사용하기 위해 login을 import받아야 되서 복잡 
//이 클래스는 유저의 상태에 대한 정보만 넘겨주는 식으로 구현하고, 그 상태를 받고 어떤 일을 할지는 login에서 구현하는게 좋다
      onUserChanged(user);
    });
  }
}

export default AuthService;
