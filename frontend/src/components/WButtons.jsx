import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/dashboard')}
      className="flex items-center border border-gray-300 mx-10 my-4 px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 text-white"
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

export {BackButton,HomeButton};
