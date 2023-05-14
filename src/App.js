import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import authService from "./services/auth.service";
import Header from "./components/Header";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes(`ROLE_MODERATOR`)); // returns boolean
      setShowAdminBoard(user.roles.includes(`ROLE_ADMIN`));
    }
  }, []);

  const logOut = () => {
    authService.logout();
  };

  return (
    <div className="App">
      <Header
        currentUser={currentUser}
        showModeratorBoard={showModeratorBoard}
        showAdminBoard={showAdminBoard}
        logout={logOut}
      />
    </div>
  );
};

export default App;
