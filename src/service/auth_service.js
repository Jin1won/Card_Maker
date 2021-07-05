import {firebaseAuth, googleProvider, githubProvider} from './firebase';

class AuthService {
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChanged = (onUserChanged)=> {
    firebaseAuth.onAuthStateChanged(user => {
//로그인이 된 상태라면 로그인을 또 할 필요 없이 바로 Maker로 넘어가기 위해 이 함수가 필요
//전달받은 콜백함수에 값을 넘겨주는 식으로 구현하지 않으면 goToMaker함수를 이 클래스에서 사용하기 위해 login을 import받아야 되서 복잡 
//이 클래스는 유저의 상태에 대한 정보만 넘겨주는 식으로 구현하고, 그 상태를 받고 어떤 일을 할지는 login에서 구현하는게 좋다
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName){
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
