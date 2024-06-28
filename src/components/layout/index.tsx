import { useLocation } from "react-router-dom"
import PageLayout from "./layout"

interface LayoutPropsType {
  children: any
  routes: any
  user: any
}

function Layout({ children, routes }: LayoutPropsType) {
  const location = useLocation()
  const currentRoute: any = routes.find(
    (route: any) =>
      "/" + route.path === location.pathname || location.pathname === "/"
  )
  const isBlankLayout: boolean = currentRoute?.blankLayout || !currentRoute

  return (
    <div className="main_layout_wrapper">
      {!isBlankLayout ? <PageLayout>{children}</PageLayout> : children}
    </div>
  )
}
export default Layout
