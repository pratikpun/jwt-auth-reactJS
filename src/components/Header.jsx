import { Link } from "react-router-dom";

const Header = ({
  showModeratorBoard,
  showAdminBoard,
  currentUser,
  logOut,
}) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        REACT JWT USER
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>
        {showModeratorBoard && (
          <li className="nav-item">
            <Link to="/mod" className="nav-link">
              Moderator Board
            </Link>
          </li>
        )}
        {showAdminBoard && (
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Admin Board
            </Link>
          </li>
        )}
        {currentUser && (
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              User
            </Link>
          </li>
        )}
      </div>
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              Log Out
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Header;
