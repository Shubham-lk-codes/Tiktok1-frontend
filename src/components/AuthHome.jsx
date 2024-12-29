import Navbar from "./Navbar";
import Profile from "../pages/Profile";
import Footer from "./Footer";

const AuthHome = ()=>{
    return(
        <>
         <Navbar />
        <div className="text-white">
           
            {/* side bar left side */}
            <div>
            <Profile />
            </div>
            {/* main conponent right side */}
            <div className="text-white">
              
            </div>

        </div>
        <Footer />
        </>
    )
        
}

export default AuthHome;