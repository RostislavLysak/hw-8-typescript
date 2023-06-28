import { NavLink, Outlet } from "react-router-dom";

const navLinks: string[] = ['Home', 'Popular', 'Battle']

const Nav: React.FC = (): React.ReactElement => {
    return (
        <>
            <ul className="nav">
                {navLinks.map((navLink: string, index: number): React.ReactElement => (
                    <li key={index}><NavLink className='menu' to={navLink === 'Home' ? '/' : navLink.toLowerCase()}>{navLink}</NavLink></li>
                ))}
            </ul>
            <Outlet />
        </>
    )
}

export default Nav