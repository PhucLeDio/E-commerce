import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import avatar from "../../assets/avatardefault.png";
import { apiUpdateCurrent } from "../../apis";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";

const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    (first) => {
      reset({
        firstname: current?.firstname,
        lastname: current?.lastname,
        mobile: current?.mobile,
        email: current?.email,
        avatar: current?.avatar,
      });
    },
    [current]
  );

  const handleUpdateInfor = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    setIsLoading(true);
    const response = await apiUpdateCurrent(formData);
    setIsLoading(false);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.mes);
    } else toast.error(response.mes);
  };

  return (
    <div className="w-full relative p-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-gray-400">
        Personal
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="w-4/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="First name"
          register={register}
          errors={errors}
          id="firstname"
          validate={{ required: "Need fill this field" }}
          fullwidth
        />
        <InputForm
          label="Last name"
          register={register}
          errors={errors}
          id="lastname"
          validate={{ required: "Need fill this field" }}
          fullwidth
        />
        <InputForm
          label="Email address"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Need fill this field",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email!",
            },
          }}
          fullwidth
        />
        <InputForm
          label="Phone number"
          register={register}
          errors={errors}
          id="mobile"
          validate={{
            required: "Need fill this field",
            pattern: {
              value:
                /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/gm,
              message: "Invalid phone!",
            },
          }}
          fullwidth
        />
        <div className="flex items-center gap-2">
          <span className="font-medium">Account status:</span>
          <span>{current?.isBlocked ? "Blocked" : "Actived"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <span>{current?.role === "user" ? "User" : "Admin"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Created At:</span>
          <span className="uppercase">
            {moment(current?.createdAt).fromNow()}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <span className="font-medium">Avatar:</span>
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-20 h-20 ml-8 object-cover rounded-full"
            />
          </label>
          <input type="file" id="file" {...register("avatar")} hidden />
        </div>
        {isDirty && (
          <div className="w-full flex justify-end">
            {isLoading ? (
              <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  ></path>
                </svg>
                Loading...
              </button>
            ) : (
              <Button type="submit">Update information</Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Personal;
