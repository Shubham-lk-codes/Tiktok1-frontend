

import AuthHome from "../components/AuthHome";
import UnuthHome from "../components/UnauthHome";

const Home = () => {
  const token = localStorage.getItem('token'); // Check if token exists
  return (
    <>
    <div className=" from-gray-900 via-purple-900 to-black">
    {token? <UnuthHome />: <AuthHome />}
    </div>
    </>
    
  );
};

export default Home;
