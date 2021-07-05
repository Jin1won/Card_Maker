import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';

const authService = new AuthService();
const imageUploader = new ImageUploader();
// {...props} 이걸 빼고 전달하면 props 를 수정할 수 없으므로 확장성이 떨어진다.
const FileInput = props => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
  );

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput}/>
  </React.StrictMode>,
  document.getElementById('root')
);
