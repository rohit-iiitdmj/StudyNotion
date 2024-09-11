import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from '../.././../services/apiconnector';
import { categories} from '../.././../services/apis';
import { useSelector } from "react-redux";
const CategoryAdd = () => {
  const { token } = useSelector((state) => state.auth);
 


  /* The code snippet is using the `useState` and `useForm` hooks from React to manage state and form
  handling in a functional component. */
    const [loading, setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitSuccessful },
    } = useForm();
/**
 * The function `submitContactForm` is an asynchronous function that sends a POST request to create a
 * category using the provided data and authorization token, and logs the response or any error
 * messages.
 */
    const submitContactForm = async (data) => {
      console.log("Form Data - ", data)
      try {
        setLoading(true);
        const res = await apiConnector(
          "POST",
          "http://localhost:4000/api/v1/course/createCategory",
          data,
          {Authorization: `Bearer ${token}`}
        );
        console.log("Email Res - ", res)
        setLoading(false);
      } catch (error) {
        console.log("ERROR MESSAGE - ", error.message);
        setLoading(false);
      }
    };
    return (
        <form
      onSubmit={handleSubmit(submitContactForm)}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          {/* firstName */}

          <label htmlFor="name" className="lable-style">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter first name"
            className="form-style"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

        {/* lastName */}
       
      </div>

      

      {/* message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="lable-style">
          Add description
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          className="form-style"
          rows="7"
          placeholder="Enter Your message here"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            PLease enter your message.
          </span>
        )}
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
    );
}

export default CategoryAdd;


