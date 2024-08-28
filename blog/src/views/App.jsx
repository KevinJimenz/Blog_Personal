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
  const handleSetMain = (value) => {
    setMain(value);
  };
  const handleSetHeader = (value) => {
    setHeader(value)
  }
  const [username, setUsername] = useState("");
  const [userphoto, setUserphoto] = useState("");
  const handleProfileUser = (name, photo) => {
    setUsername(name);
    setUserphoto(photo);
  }
  return (
    <> 
    {
      // Valido que header se debe mostrar
      !header ? (
        <Header setMain={handleSetMain} setHeader={handleSetHeader} setProfileUser={handleProfileUser} />
      ) : (
        <Header_Admin username={username} userphoto={userphoto} />
      )
    }
    { // Valido que main se debe mostrar
      !main ? (
        <Main setHeader={handleSetHeader} isMain={main} />
      ) : (
        <Main_Admin/>
      )
    }
        <Footer />
    </>
  )
}

export default App
