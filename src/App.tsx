import './App.css';
import image from '../src/assets/image.png'
import { SignUp } from './components/signUp/SignUp';

function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3">
          <SignUp/>
        </div> 
        <div className="col-md-7">
          <img className="img-fluid w-100" src={image} alt="There have to be  .png"></img>
        </div>
      </div>
    </div>
  )
}

export default App;
