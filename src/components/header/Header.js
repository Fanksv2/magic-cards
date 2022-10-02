import "./header.css";
import UserContext from "../../context/UserContext";

function Header() {
    return (
        <div className="header">
            <h1>Magic Cards</h1>
            <UserContext.Consumer>
                {({ userData }) => {
                    return userData.isAuthenticated ? (
                        <div className="userInfo">
                            <p>Name</p>
                            <button>Logout</button>
                        </div>
                    ) : null;
                }}
            </UserContext.Consumer>
        </div>
    );
}

export default Header;
