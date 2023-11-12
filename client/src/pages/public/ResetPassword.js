import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.mes, { theme: "light" });
    } else toast.info(response.mes, { theme: "light" });
  };
  return (
    <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-overlay flex justify-center items-center py-8 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Reset Password
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New password
            </label>
            <input
              type="text"
              id="password"
              className="mt-1 pt-1 pb-2 w-full border-gray-300 border-b outline-none"
              placeholder="example@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex gap-4">
            <Button
              children="Submit"
              handleOnClick={handleResetPassword}
              style={`w-full bg-red-500 text-white p-3 hover:bg-red-600 transition duration-300`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
