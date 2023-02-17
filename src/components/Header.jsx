import { useState } from 'react'
import { FaCalendarWeek } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {

    const [navOpen, setNavOpen] = useState(false)

    const toggleNav = () => {
      setNavOpen(!navOpen)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const goTop = () => {
      document.window.scrollTop(0)
    }

  return (
    <header className='header'>
        <div className="brand">
            <Link to='/'>
              <FaCalendarWeek size={'36px'} className="logo" />
              <div className="brand-name">
                 Meal Planner
              </div> 
            </Link>
        </div>
        <div className="navbar">
          <ul>
          {user ? (
            <>
              <li>
                <Link to='/' onClick={goTop}>
                  Home
                </Link>
              </li>
              {/* <li>
                <Link to='/profile'>
                  Profile
                </Link>
              </li> */}
              <li>
                <div className='logout-btn' onClick={onLogout}>
                Logout
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  Register
                </Link>
              </li>
            </>
          )}
          </ul>
          <div className="toggle-container">
              <div className={navOpen ? "toggle-btn close" : "toggle-btn"} onClick={toggleNav}>
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
              </div>
          </div>
          <div className={navOpen ? "mobile-menu active" : "mobile-menu"} onClick={toggleNav}>
            <ul>
              {user ? (
                <>
                  <li>
                    <Link to='/' onClick={goTop}>
                      Home
                    </Link>
                  </li>
                  {/* <li>
                    <Link to='/profile'>
                      Profile
                    </Link>
                  </li> */}
                  <li>
                    <div className='logout-btn' onClick={onLogout}>
                    Logout
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={toggleNav}>
                    <Link to='/login'>
                      Login
                    </Link>
                  </li>
                  <li onClick={toggleNav}>
                    <Link to='/register'>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
    </header>
  )
}

export default Header