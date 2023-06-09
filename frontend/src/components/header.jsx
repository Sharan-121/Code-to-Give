import organizationLogo from '../assets/organization_logo.svg'

const Header = () => {
    return (
        <div className="header">
            <a target="_blank"
                href="https://tinymiracles.com/">
                <img src={organizationLogo} />
            </a>
        </div>
    )
}

export default Header;