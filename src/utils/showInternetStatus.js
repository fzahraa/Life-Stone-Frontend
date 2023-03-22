import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import { toast } from "react-toastify";

export const showInternetStatus = (onlineStatus) => {
    if (onlineStatus) {
        toast.success(<h2 style={{ marginLeft: "1rem" }}>Your Internet connection was restored.</h2>, {
            position: "bottom-left",
            theme: "dark",
            icon: <WifiIcon sx={{ fontSize: "2.5rem", color: "green" }}/>,
            autoClose: false, 
            progress: 1
        })
    }
    else if (!onlineStatus) {
        toast.warning(<h2 style={{ marginLeft: "1rem" }}>You are currently offline.</h2>, {
            position: "bottom-left",
            theme: "dark",
            icon: <WifiOffIcon sx={{ fontSize: "2.5rem", color: "yellow" }}/>,
            autoClose: false, 
            progress: 1
        })
    }
};