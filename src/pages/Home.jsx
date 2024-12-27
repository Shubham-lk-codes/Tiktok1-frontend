

import AuthHome from "../components/AuthHome";
import UnuthHome from "../components/UnauthHome";

const Home = () => {
  const token = localStorage.getItem('token'); // Check if token exists
  return (
    <>
    {token? <UnuthHome />: <AuthHome />}
    </>
    
  );
};

export default Home;
