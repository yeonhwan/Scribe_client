import NavbarCollapsed from "./NavbarCollapsed"
import NavbarOpened from "./NavbarOpened"
import { useAppStateStore } from "../../store/appStateStore";

export default function Navbar() {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <>
    {appState.navbarOpen === false ? 
    <NavbarCollapsed/> :
    <NavbarOpened/>
    }
    </>
  )
}
