import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import Avatar from "react-avatar";
import { useState } from "react";
import Calendar from "./Calendar";
import Profile from "./Profile";
import Pricing from "./Pricing";
import FeedBack from "./FeedBack";
import Events from "./Events";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { showCalendar, showEvents, showPricing, showProfile } from "../helpers";
const Dashboard = () => {
  const [showWidget, setShowWidget] = useState({
    isCalendar: true,
    isEvents: false,
    isFeedback: false,
    isPricing: false,
    isProfile: false,
  });

  const opacity = useSelector((state) => state.dashboardSlice.opacity);
  const blur = useSelector((state) => state.dashboardSlice.blur);

  const isLoggedIn = JSON.parse(localStorage.getItem('userInfo'))

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={` w-full h-[820px] font-calendar ${opacity} ${blur} `}>
        <div
          id="header"
          className="w-full h-16 border-b-[1px] border-gray-300 flex "
        >
          <button
          onClick={()=>{
            navigate('/')
          }}
            id="logo"
            className="w-1/6 h-full  sm:flex hidden justify-center items-center flex-col"
          >
            <div className="w-1/6 h-1/3 bg-gray-100  rounded-t-full"></div>
            <div className="w-1/6 h-1/3  rounded-b-full bg-[#3b3299]"></div>
          </button>
          <div
            id="widgets"
            className="sm:w-3/6 w-5/6 h-full  flex justify-between items-center sm:text-[13px] text-[8px]  text-gray-400 font-[500]"
          >
            <button
              onClick={() => {
                showEvents(setShowWidget)
              }}
              className={`flex justify-center items-center h-full w-1/5 ${
                showWidget.isEvents ? "text-[#3b3299]" : ""
              }`}
            >
              <MdOutlineDashboardCustomize
                className={`sm:mr-2 mr-1 ${
                  showWidget.isEvents ? "text-[#e3a34f]" : null
                }`}
              />{" "}
              Events
            </button>
            <button
              onClick={() => {
               showCalendar(setShowWidget)
              }}
              className={`flex justify-center items-center h-full w-1/5 ${
                showWidget.isCalendar ? "text-[#3b3299]" : ""
              }`}
            >
              <BsCalendar2Week
                className={`sm:mr-2 mr-1 ${
                  showWidget.isCalendar ? "text-[#e3a34f]" : null
                }`}
              />{" "}
              Calendar
            </button>
            <button
              onClick={() => {
               showProfile(setShowWidget)
              }}
              className={`flex justify-center items-center h-full w-1/5 ${
                showWidget.isProfile ? "text-[#3b3299]" : ""
              }`}
            >
              <CgProfile
                className={`sm:mr-2 mr-1 sm:text-[15px] ${
                  showWidget.isProfile ? "text-[#e3a34f]" : null
                }`}
              />{" "}
              Profile
            </button>
            <button
              onClick={() => {
               showPricing(setShowWidget)
              }}
              className={`flex justify-center items-center h-full w-1/5 ${
                showWidget.isPricing ? "text-[#3b3299]" : ""
              }`}
            >
              <ImPriceTags
                className={`sm:mr-2 mr-1 sm:text-[15px] ${
                  showWidget.isPricing ? "text-[#e3a34f]" : null
                }`}
              />{" "}
              Pricing
            </button>
            <button
              onClick={() => {
           showProfile(setShowWidget)
              }}
              className={`flex justify-center items-center h-full w-1/5 ${
                showWidget.isFeedback ? "text-[#3b3299]" : ""
              }`}
            >
              <VscFeedback
                className={`sm:mr-2 mr-1 sm:text-[15px] ${
                  showWidget.isFeedback ? "text-[#e3a34f]" : null
                }`}
              />{" "}
              Feedback
            </button>
          </div>
          <div
            id="profile"
            className="sm:w-2/6   h-full  text-gray-400 flex justify-end items-center sm:text-[13px] text-[8px] font-[500]"
          >
            <p className="sm:text-[15px] sm:mr-20 sm:ml-0 ml-5 flex sm:w-1/6 border-[1px] items-center justify-around rounded-lg sm:py-2 sm:shadow-sm">
              {isLoggedIn ? <><Avatar
                githubHandle="sitebase"
                size={window.innerWidth < 500 ? 15 : 30}
                round="20px"
              />
              <button>
                <AiOutlineLogout
                  onClick={() => {
                    console.log("hi");
                    logoutHandler();
                  }}
                  className="sm:text-[22px] text-[10px] text-black"
                />
              </button></>: <Link
          className="sm:text-[14px] text-[8px] w-full h-full  text-black sm:rounded-2xl sm:px-0 px-2 sm:py-0 py-[4px] font-[600] border-black flex justify-center items-center "
          to="/login"
        >
          Log in
        </Link>}
              
            </p>
          </div>
        </div>
        {showWidget.isEvents ? <Events /> : null}
        {showWidget.isCalendar ? <Calendar /> : null}
        {showWidget.isProfile ? <Profile /> : null}
        {showWidget.isPricing ? <Pricing /> : null}
        {showWidget.isFeedback ? <FeedBack /> : null}
      </div>
    </>
  );
};

export default Dashboard;
