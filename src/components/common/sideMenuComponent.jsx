import logo from "../../assets/logo.png"
import { MdOutlineDashboard } from "react-icons/md";

export const SideMenuComponent = () => {
    return (
        <div>
            <img src={logo} />
            <div>
                <MdOutlineDashboard size={30} color=""/><p>DashBoard</p>
            </div>
        </div>
    )
}