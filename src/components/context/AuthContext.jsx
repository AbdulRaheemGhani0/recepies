import { createContext ,useState ,useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";




export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin:false,
    userInfo :{},
  });

const [loading, setLoading] = useState(true)


   
   function onAuthChanged(user) {
  if(user){
    
    setUser({isLogin : true,
    userInfo :{
name : user?.displayName,
photoUrl: user?.photoURL,
email: user?.email
}
})
  } else{
    setUser({isLogin : false, userInfo : {}
    })}


     setLoading(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth ,onAuthChanged);
   
    return subscriber; 
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>

{loading ? (
<div className="w-full h-96 flex justify-center items-center">Loading...</div>)
:(
children
)}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
