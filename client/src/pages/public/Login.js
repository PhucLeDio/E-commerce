import React, { useCallback, useState } from "react";
import icons from "../../ultils/icons";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

// const colors = {
//   primary: "#060606",
//   background: "#f5f5f5",
//   disabled: "#D9D9D9",
// };

const { FcGoogle } = icons;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const respone = await apiForgotPassword({ email });
    console.log(respone);
  };

  // const [isHidden, setIsHidden] = useState(false);

  // const handleCancel = () => {
  //   setIsHidden(true);
  // };

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire({
          title: "Congratulations",
          text: response.mes,
          icon: "success",
        }).then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire({ title: "Oops...", text: response.mes, icon: "error" });
      }
    } else {
      const rs = await apiLogin(data);
      if (rs.success) {
        dispatch(
          register({
            isLoggedIn: true,
            token: rs.accessToken,
            userData: rs.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire({ title: "Oops...", text: rs.mes, icon: "error" });
      }
    }
  }, [payload, isRegister]);

  return (
    <div className="w-full h-screen flex items-start">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay flex justify-center items-center py-8 z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Reset Password
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                className="mt-1 pt-1 pb-2 w-full border-gray-300 border-b outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 flex gap-4">
              <Button
                name="Submit"
                handleOnClick={handleForgotPassword}
                style={`w-full bg-red-500 text-white p-3 hover:bg-red-600 transition duration-300`}
              />
              <button
                type="Cancel"
                className="w-full bg-red-500 text-white p-3 hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Turn Your Ideas into reality
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and get attractive offers from the comunity
          </p>
        </div>
        <img
          src="https://img.freepik.com/premium-photo/shopper-using-computer-laptop-input-order-with-trolley-credit-card-delivery-truck-online-shopping-ecommerce-technology-concept_50039-3926.jpg"
          className="w-full h-full object-cover"
          alt="login-img"
        />
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
        <h1 className="max-w-[500px] mx-auto text-xl text-[#060606] font-semibold ">
          Interactive Brand
        </h1>

        <div className="w-full flex flex-col  max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">
              {isRegister ? "Register" : "Login"}
            </h3>
            <p className="text-base mb-2">
              {isRegister
                ? "Lets create your account"
                : "Welcome Back! please enter your details."}
            </p>
          </div>

          <div className="w-full flex flex-col">
            {isRegister && (
              <div className="flex items-center gap-2">
                <InputField
                  value={payload.firstname}
                  setValue={setPayload}
                  nameKey="firstname"
                />
                <InputField
                  value={payload.lastname}
                  setValue={setPayload}
                  nameKey="lastname"
                />
              </div>
            )}
            <InputField
              value={payload.email}
              setValue={setPayload}
              nameKey="email"
            />
            {isRegister && (
              <InputField
                value={payload.mobile}
                setValue={setPayload}
                nameKey="mobile"
              />
            )}
            <InputField
              value={payload.password}
              setValue={setPayload}
              nameKey="password"
              type="password"
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember me for 30 days</p>
            </div>

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 text-main">
              Forgot Password ?
            </p>
          </div>

          {/* 
            login style: w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer
            register style: w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer
          */}
          <div className="w-full flex flex-col my-4">
            <Button
              name={isRegister ? "Register" : "Login"}
              style={
                isRegister
                  ? `w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer`
                  : `w-full text-white my-2 font-semibold bg-main rounded-md p-4 text-center flex items-center justify-center cursor-pointer`
              }
              handleOnClick={handleSubmit}
            />
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-[#D4D3D4]"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">Or</p>
          </div>
          <div className="w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
            <FcGoogle size={20} className="mr-2" />
            Sign In with Google
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          {!isRegister && (
            <p className="text-sm font-normal text-[#060606]">
              Don't have a account?&ensp;
              <span
                onClick={() => setIsRegister(true)}
                className="font-semibold underline underline-offset-2 cursor-pointer"
              >
                Sign up for free
              </span>
            </p>
          )}
          {isRegister && (
            <p className="text-sm font-normal text-[#060606]">
              Already have a account?&ensp;
              <span
                onClick={() => setIsRegister(false)}
                className="font-semibold underline underline-offset-2 cursor-pointer"
              >
                Let's move on
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
