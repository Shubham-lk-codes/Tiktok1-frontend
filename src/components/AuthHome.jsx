import Navbar from "./Navbar";
// eslint-disable-next-line no-unused-vars
import Profile from "../pages/Profile";
import SidebarFooter from "./Footer";

const AuthHome = () => {
  return (
    <>
      <div className="text-whitec fixed z-10 w-full  from-gray-900 via-purple-900 to-black">
        <Navbar />
      </div>
      <div className="text-black">
        <SidebarFooter />
      </div>
    </>
  );
};

export default AuthHome;
