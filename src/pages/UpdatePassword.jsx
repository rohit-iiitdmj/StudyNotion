import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi"
import { Link, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
 


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [showconfirmPassword, setConfirmPassword] = useState(true);

  const { loading } = useSelector((state) => state.auth);
  const Token = location.pathname.split("/").at(-1);
  console.log(Token);
  const handleOnChange = (e) => {
    setFormData((preData) => ({
      ...preData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, confirmPassword, Token, navigate));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div> loading..</div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1  className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100"> Almost done. Enter your Password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label className=" relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>

              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style  bg-richblack-700  text-center   rounded-lg py-2 border-2 border-b-richblack-25 w-full !pr-10"
              />

              <span onClick={() => setShowPassword(!showPassword)}  className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {showPassword ? <AiFillEye fontSize={24} fill="#AFB2BF" /> : <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />}
              </span>
            </label>

            <label className="relative mt-3 block" >
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New confirmPassword*</p>

              <input
                required
                type={showconfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="   Confirm Password"
                className="form-style  bg-richblack-700  text-center   rounded-lg py-2 border-2 border-b-richblack-25 w-full !pr-10"
              />

              <span
                onClick={() => setConfirmPassword(!showconfirmPassword)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showconfirmPassword ? <AiFillEye  fontSize={24} fill="#AFB2BF" /> : <AiFillEyeInvisible  fontSize={24} fill="#AFB2BF" />}
              </span>
            </label>
             <button className="mt-6 w-full rounded-[8px]  text-lg    font-medium bg-yellow-50 py-[12px] px-[12px]  text-richblack-900" type="submit">
              submit

             </button>
           
              
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
