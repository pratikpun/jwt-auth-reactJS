import { useEffect, useState } from "react";

import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState(``);
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => setContent(response.data),
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
};

export default BoardAdmin;
