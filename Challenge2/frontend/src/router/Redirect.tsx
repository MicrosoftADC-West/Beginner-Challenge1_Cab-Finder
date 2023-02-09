import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RedirectProps = {
  redirectUrl?: string;
};

function Redirect({ redirectUrl }: RedirectProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectUrl) {
      navigate(redirectUrl);
    }

    // eslint-disable-next-line
  }, []);

  return null;
}

export default Redirect;
