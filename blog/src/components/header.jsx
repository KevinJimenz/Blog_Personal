import logo from '../assets/media/logo-removebg-preview-removebg-preview.png'
const Header = () => {
    return (
        <div className="contenedor_header">
            <div className="logo">
                    <img src={logo} alt="DraKKav" />
            </div>
            <div className="search_bar">
                <input type="search" placeholder="Search" aria-label="Search"/>
                <a href="#" className='btn-signUp'> Sign Up</a>
            </div>
        </div>
    )
}


export default Header;