import { useEffect, useState } from "react";

import UserService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState(``);
  useEffect(() => {
    UserService.getModBoard().then(
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

export default BoardModerator;
