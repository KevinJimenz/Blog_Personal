import Header from "../components/header"
import Main from "../components/main"
import Footer from "../components/footer"
import { useState } from "react";
function App() {
  // Estado para cambiar el contenido del main, si es usario le muestra el contenido del blog
  // Si es admin le muestra la gestion
  const [main, setMain] = useState(false);
  const handleSetMain = (value) => {
    setMain(value);
  };
  // Estado para cambiar el header una vez se logueen o registren
  const [header, setHeader] = useState(false);
  const handleSetHeader = (value) => {
    setHeader(value)
  }
  return (
    <>
        <Header setMain={handleSetMain} isHeader={header} />
        <Main  isMain={main} setHeader={handleSetHeader}/>
        <Footer />
    </>
  )
}

export default App
