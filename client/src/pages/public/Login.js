import React, { useCallback, useState } from "react";
import icons from "../../ultils/icons";
import { InputField, Button } from "../../components";

// const colors = {
//   primary: "#060606",
//   background: "#f5f5f5",
//   disabled: "#D9D9D9",
// };

const { FcGoogle } = icons;

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback(
    (params) => {
      console.log(payload);
    },
    [payload]
  );

  return (
    <div className="w-full h-screen flex items-start">
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
              <InputField
                value={payload.name}
                setValue={setPayload}
                nameKey="name"
              />
            )}
            <InputField
              value={payload.email}
              setValue={setPayload}
              nameKey="email"
            />
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

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
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
                  : `w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer`
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
