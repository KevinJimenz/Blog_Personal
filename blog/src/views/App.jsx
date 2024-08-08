import Header from "../components/header"
import Main from "../components/main"
import Footer from "../components/footer"
import { useState } from "react";
function App() {
  // Estado para cambiar el contenido del main
  const [main, setMain] = useState(false);

  const handleSetMain = (value) => {
    setMain(value);
  };

  // Estado para cambiar el header 
  const [header, setHeader] = useState(false);

  const handleSetHeader = (value) => {
    setHeader(value)
  }

  // Estados para mostrar el nombre y la foto de la persona
  const [nameUser, setName] = useState("");
  const [photoUser, setPhoto] = useState("");

  const handleUser = (value1,value2) =>{
      setName(value1)
      setPhoto(value2)
  }
  
  return (
    <>
        <Header setMain={handleSetMain} isHeader={header} setHeader={handleSetHeader} setInfoUser={handleUser} nameUser={nameUser} photoUser={photoUser} />
        <Main setHeader={handleSetHeader} isMain={main} />
        <Footer />
    </>
  )
}

export default App
