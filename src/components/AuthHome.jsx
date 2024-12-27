import Navbar from "./Navbar";
import Profile from "../pages/Profile";

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
        </>
    )
        
}

export default AuthHome;