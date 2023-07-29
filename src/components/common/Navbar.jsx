import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navs, setNavs] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);

        console.log(res);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    
    return matchPath({ path: route }, location.pathname)
    
    ;
  };

  return (
    <>
      <div className="    w-full z-[999] transition-all duration-300 ">
        <div
          className={`  flex h-16 items-center justify-center border-b-[1px] bg-richblack-900 border-b-richblack-700 ${
            location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
          } transition-all duration-200`}
        >
          <div className="flex w-11/12 max-w-maxContent items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                width={160}
                height={32}
                loading="lazy"
              />
            </Link>
            {/* Navigation links */}
            <nav className="hidden md:block">
              <ul  className="flex gap-x-6 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <>
                        <div 
                          className={`group relative flex cursor-pointer items-center gap-1 ${
                            matchRoute("/catalog/:catalogName")
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          <p>{link.title}</p>
                          <BsChevronDown />
                          <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks.length ? (
                              <>
                                {subLinks
                                  ?.filter(
                                    (subLink) => subLink?.name?.length > 0
                                  )
                                  ?.map((subLink, i) => (
                                    <Link 
                                      to={`/catalog/${subLink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      className="rounded-lg bg-transparent py-4 pl-4   hover:bg-richblack-50"
                                      key={i}
                                    >
                                      <p>{subLink.name}</p>
                                    </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link  to={link?.path}>
                        <p  
                          className={`${
                            matchRoute(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {/* Login / Signup / Dashboard */}
            <div className="hidden items-center gap-x-4 md:flex">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null && (
                <Link to="/login">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
              )}
              {token === null && (
                <Link to="/signup">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
            <span onClick={() => setNavs((pre) => !pre)}>
              {navs ? (
                <button onClick={(pre) => !pre} className="mr-4 md:hidden">
                  <RxCross2
                    className=" text-white"
                    fontSize={24}
                    fill="#AFB2BF"
                  />
                </button>
              ) : (
                <button className="mr-4 md:hidden">
                  <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
              )}
            </span>
          </div>
        </div>

        {navs ? (
          <div className=" hidden max-md:block  fixed h-[60%]  border-b-[2px]  inset-0  bg-richblack-900  top-14 z-[1000]   overflow-auto   bg-opacity-1000 ">
            <div className="w-full flex     flex-col     ">
              <nav className=" hidden max-md:block ">
                <ul className="flex  flex-col  gap-y-5 mt-6  text-richblack-25">
                  {NavbarLinks.map((link, index) => (
                    <li
                      className=" bg-richblack-800 mx-3 rounded-md  p-2  pl-4  text-[20px]   font-inter font-bold hover:bg-richblack-700"
                      key={index}
                    >
                      {link.title === "Catalog" ? (
                        <>
                          <div 
                            className={`group    relative flex cursor-pointer items-center gap-1 ${
                              matchRoute("/catalog/:catalogName")
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}
                          >
                            <p  >{link.title}</p>
                            <BsChevronDown />
                            <div className="invisible absolute left-[13%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                              <div className="absolute left-[38%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                              {loading ? (
                                <p className="text-center">Loading...</p>
                              ) : subLinks.length ? (
                                <>
                                  {subLinks
                                    ?.filter(
                                      (subLink) => subLink?.name?.length > 0
                                    )
                                    ?.map((subLink, i) => (
                                      <Link
                                        to={`/catalog/${subLink.name
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`}
                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                        key={i}
                                      >
                                        <p onClick={()=>{setNavs(false)}}>{subLink.name}</p>
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <p className="text-center">No Courses Found</p>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link to={link?.path}>
                          <p onClick={()=>{setNavs(false)}}
                            className={`${
                              matchRoute(link?.path)
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}
                          >
                            {link.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className=" bg-richblack-400 h-[1px] w-full my-3"></div>
              <div className="flex mx-4  flex-col mt-4      gap-y-4 ">
                {token === null && (
                  <Link  to="/login">
                    <button onClick={()=>{setNavs(false)}} className="rounded-[8px]  text-[20px]  w-full  border border-richblack-700 bg-richblack-800  py-[7px] text-richblack-100">
                      Log in
                    </button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup">
                    <button onClick={()=>{setNavs(false)}} className="rounded-[8px]  text-[20px]  w-full  border border-richblack-700 bg-richblack-800 py-[7px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                )}
                {token !== null && (
                  <div className=" w-full flex  justify-between   ">
                    <div className=" flex flex-col gap-y-3 ">
                      <div className="flex items-center  w-full  mb-2  space-x-6 gap-x-1">
                        <img
                          src={user?.image}
                          alt={`profile-${user?.firstName}`}
                          className="aspect-square w-[60px]  border-[3px]  border-caribbeangreen-300 rounded-full object-cover"
                        />
                        <div>
                          <p className=" text-white font-mono font-extralight text-2xl">
                            {user?.firstName}
                          </p>
                          <p className=" text-richblue-25 font-normal">
                            {" "}
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Link to="/dashboard/my-profile">
                        <p onClick={()=>{setNavs(false)}} className="  text-pure-greys-50 text-xl">
                          Dashboard
                        </p>
                      </Link>
                      <div 
                        onClick={() => {
                          dispatch(logout(navigate));
                          setNavs(false)
                        }}
                        className=" text-pure-greys-50 text-xl  cursor-pointer"
                      >
                        {/* <VscSignOut className="text-lg" /> */}
                        Logout
                      </div>
                    </div>

                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                      <Link to="/dashboard/cart" className="relative">
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        {totalItems > 0 && (
                          <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                            {totalItems}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Navbar;
