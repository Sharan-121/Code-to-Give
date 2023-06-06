import organizationLogo from '../assets/organization_logo.svg'

const Header = () => {
    return (
        <div className="header">
            <img src={ organizationLogo } />
        </div>
    )
}

export default Header;