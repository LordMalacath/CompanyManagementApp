import { NavLink, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { changeMenuStateAction } from '../../actions/pageActions'
import { ReactComponent as ReactLogo } from '../../assets/img/logo.svg'
import { ReactComponent as ReactCompaniesIcon } from '../../assets/img/companiesIcon.svg'
import { ReactComponent as ReactProfileIcon } from '../../assets/img/profileIcon.svg'
import { ReactComponent as ReactUsersIcon } from '../../assets/img/usersIcon.svg'
import { Loader } from '../Loader/Loader'
import { logOutAction } from '../../actions/authActions'
import 'react-toastify/dist/ReactToastify.css'
import './Layout.css'

export const Layout = () => {
  const dispatch = useDispatch()
  const menuIsOpened = useSelector((state) => state.page.menuIsOpened)
  const userId = useSelector((state) => state.user.id)
  const isLoading = useSelector((state) => state.page.isLoading)
  const role = useSelector((state) => state.user.role)

  const onMenuBtnClick = () => {
    dispatch(changeMenuStateAction())
  }

  const onLogOutClick = () => {
    dispatch(logOutAction())
  }

  return (
    <>
      <header className="header">
        <div className="header__content-wrapper">
          <button onClick={onMenuBtnClick} className="header__menu-button">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="header__content-wrapper">
          <div className="header__logo">
            <ReactLogo />
          </div>
          <h1 className="header__title">Company Management</h1>
        </div>
        <div className="header__content-wrapper">
          <button onClick={onLogOutClick} className="header__log-out">
            Log out
          </button>
        </div>
      </header>
      <main>
        <nav className={`menu ${menuIsOpened ? 'active' : ''}`}>
          <NavLink
            to="/"
            className={`menu__item ${role === 'Admin' ? 'admin' : ''}`}
          >
            <span className="menu__item-logo">
              <ReactCompaniesIcon />
            </span>
            <span className="menu__item-title">Companies</span>
          </NavLink>
          {role === 'Admin' && (
            <NavLink to="user/all" className="menu__item admin">
              <span className="menu__item-logo">
                <ReactUsersIcon />
              </span>
              <span className="menu__item-title">Users</span>
            </NavLink>
          )}
          <NavLink
            to={`user/:${userId}`}
            className={`menu__item ${role === 'Admin' ? 'admin' : ''}`}
          >
            <span className="menu__item-logo">
              <ReactProfileIcon />
            </span>
            <span className="menu__item-title">Profile</span>
          </NavLink>
        </nav>
        <Outlet />
        <ToastContainer autoClose={2000} />
        {isLoading && <Loader shifted></Loader>}
      </main>
    </>
  )
}
