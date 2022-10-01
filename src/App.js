import "./App.css";
import LoginPage from "./components/login-page/LoginPage";
import RegisterPage from "./components/register-page/RegisterPage";

function App() {
    return (
        <div className="App">
            <h1>Magic Cards</h1>
            <LoginPage />
            <RegisterPage />
        </div>
    );
}

export default App;
