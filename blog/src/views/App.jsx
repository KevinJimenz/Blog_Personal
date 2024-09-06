import Header from "../components/header"
import Main from "../components/main"
import Footer from "../components/footer"
import Header_Admin from "../components/header_admin";
import Main_Admin from "../components/main_admin";
import { useState } from "react";
function App() {

  // Estado para cambiar el contenido del main
  const [main, setMain] = useState(false);
  // Estado para cambiar el header 
  const [header, setHeader] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const handleSetMain = (value) => {
    setMain(value);
    if (value == true)
    {
      setAdmin(true)
    }
    else{
      setAdmin(false)
    }
  };
  const handleSetHeader = (value) => {
    setHeader(value)
  }
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [login, setLogin] = useState(false);
  const handleProfileUser = (name, photo, email) => {
    setUserName(name);
    setUserPhoto(photo);
    setUserEmail(email);
    setLogin(true)
  }
  
  return (
    <> 
    {
      // Valido que header se debe mostrar
      !header ? (
        <Header setMain={handleSetMain} setHeader={handleSetHeader} setProfileUser={handleProfileUser}   />
      ) : (
        <Header_Admin userName={userName} userPhoto={userPhoto} isAdmin={isAdmin} />
      )
    }
    { // Valido que main se debe mostrar
      !main ? (
        <Main islogin={login} email_user={userEmail} username={userName} />
      ) : (
        <Main_Admin/>
      )
    }
        <Footer />
    </>
  )
}

export default App
