import "./header.css";
import UserContext from "../../context/UserContext";
import Button from "../button/Button";
import { useContext } from "react";

function Header() {
    const { userData, setUserData } = useContext(UserContext);

    function logout() {
        window.localStorage.setItem("token", "");
        setUserData({ token: "" });
    }

    return (
        <div className="header">
            <h1>Magic Cards</h1>
            <UserContext.Consumer>
                {({ userData }) => {
                    return userData.token ? (
                        <div className="userInfo">
                            {/* <p>{userData.name}</p> */}
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : null;
                }}
            </UserContext.Consumer>
        </div>
    );
}

export default Header;
