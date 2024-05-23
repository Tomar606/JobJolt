import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/hdashboard')}
      className="button-89 text-white flex relative top-10"
    >
      <BiArrowBack className="mr-2" />
      Back to Dashboard
    </button>
  );
};
const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      className="button-89 text-white flex relative top-20"
    >
      <BiArrowBack className="mr-2" />
      Back to Homepage
    </button>
  );
};


export {BackButton, HomeButton};
