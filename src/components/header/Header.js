import "./header.css";
import UserContext from "../../context/UserContext";
import Button from "../button/Button";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
    const { userData, setUserData } = useContext(UserContext);

    const navigate = useNavigate();

    function logout() {
        window.localStorage.setItem("token", "");
        setUserData({ token: "" });
    }

    function onClickAdmin() {
        navigate("/admin");
    }

    function onClickSearch() {
        navigate("/");
    }

    const location = useLocation();

    return (
        <div className="header">
            <h1>Magic Cards</h1>
            <UserContext.Consumer>
                {({ userData }) => {
                    return userData.token ? (
                        <div className="userInfo">
                            {<p>{userData.name}</p>}

                            {userData.admin ? (
                                !location.pathname.includes("admin") ? (
                                    <button onClick={onClickAdmin}>
                                        Admin Panel
                                    </button>
                                ) : (
                                    <button onClick={onClickSearch}>
                                        Search Cards
                                    </button>
                                )
                            ) : null}

                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : null;
                }}
            </UserContext.Consumer>
        </div>
    );
}

export default Header;
