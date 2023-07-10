import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs"


import { resetPasswordToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSend));
  };

  return (
    <div
      className=" mx-auto flex justify-center   my-auto     w-11/12 max-w-maxContent items-center 
        text-white "
    >
      <div className="flex justify-between items-center   min-w-[400px]   max-w-[42%] px-11  ">  

      
      {loading ? (
        <div  className="custom-loader "></div>
      ) : (
        <div className="  flex flex-col gap-6  w-fit">
          <h1 className=" text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{!emailSend ? "Reset your Password " : "check your Email"}</h1>

          <p className=" text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSend
              ? " Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery  "
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit} className=" flex  flex-col gap-6 ">
            {!emailSend && (
              <label className=" space-y-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                <p> Email Address <span className="   text-pink-200 ">*</span></p>

                <input className=" bg-richblack-800 form-style w-full h-10 rounded-md   border-b-2 border-pure-greys-100"
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            )}

            <button className=" bg-yellow-50    font-medium text-richblack-900 rounded-md  border-b-2  border-white  py-2" type="submit">
              {!emailSend ? "Reset Password" : " Resend Email"}
            </button>
          </form>

          <div >
            <Link className="flex justify-start text-pure-greys-100 items-center gap-3" to="/login">
              <BsArrowLeft/>
              {" "}
              <p> back to login</p>{" "}

            </Link>
          </div>
        </div>
      )}

      </div>  
    </div>
  );
};

export default ForgotPassword;
