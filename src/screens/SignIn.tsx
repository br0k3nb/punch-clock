import { useState } from "react";
import logo from "../assets/logo.png";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import api from "../components/CustomHttpInterceptor";

export default function SignIn() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register } = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmitForm = async (fields: FieldValues) => {
    setIsLoading(true);
    messageApi.open({
      key: "signIn",
      type: "loading",
      content: "Loading...",
    });

    try {
      const { email, password } = fields;
      if (email && password) {
        const login = await api.post("/sign-in", {
          email,
          password,
        });

        setTimeout(() => {
          messageApi.open({
            key: "signIn",
            type: "success",
            content: `Hi, ${login.data.name}!`,
            duration: 5,
          });
        });

        const callback = (data: any, err: any) => {
          if (!err && data) setTimeout(() => navigate(`/home`), 2000);
        };

        await auth.signIn({ email, password, callback });
      }
    } catch (err: any) {
      console.log(err);
      setTimeout(() => {
        messageApi.open({
          key: "signIn",
          type: "error",
          content: `${err.message}`,
          duration: 5,
        });
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col w-[400px] h-[450px] xxs:w-full xxs:h-screen rounded-xl shadow-2xl shadow-gray-500 border border-gray-300">
          <div className="flex flex-col justify-center items-center mt-3">
            <div className="mt-4 xxs:mt-10 flex flex-col space-y-10">
              <img
                src={logo}
                alt="logo"
                className="max-h-20"
                draggable={false}
              />
              <p className="text-black text-[27px]">Sign In</p>
            </div>
            <div className="mt-12 w-full px-10">
              <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="flex flex-col space-y-4">
                  <label className="input input-bordered flex items-center gap-2">
                    <MdEmail />
                    <input
                      type="text"
                      className="grow"
                      placeholder="Email"
                      {...register("email")}
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <FaKey />
                    <input
                      type="password"
                      className="grow"
                      placeholder="Password"
                      {...register("password")}
                    />
                  </label>
                </div>
                <button
                  className="btn mt-4 w-full btn-success text-white uppercase tracking-wide hover:tracking-[0.12em] ease-in-out duration-300 transition-all"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "loading..." : "sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
