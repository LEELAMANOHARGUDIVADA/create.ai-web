import { Link, useNavigate } from "react-router-dom";
import { images } from "../constants/images";
import React, { useRef, useState } from "react";
import axios from "axios";
import {  ClipLoader } from "react-spinners";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<Boolean>(false);
  const [otpSent, setOtpSent] = useState<Boolean>(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    const loginWindow = window.open(
      `${SERVER_URL}/auth/google`);
    
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:8000") return;
  
      const { token, username, credits } = event.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("credits", credits);
      window.location.href = "/dashboard";
    });
  };
  const handleGithubSignIn = () => {
    window.location.href = `${SERVER_URL}/auth/github`;
  };
  const handleFacebookSignIn = () => {
    window.location.href = `${SERVER_URL}/auth/facebook`;
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/api/user/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response.data);
      setOtpSent(true);
      setLoading(false);
    } catch (error:any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleOtpChange = ({ digit, index }:{ digit:string, index: number }) => {
    if (!/^[0-9]*$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>, index:number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const Otp = otp.join("");
    try {
      const response = await axios.post(`${SERVER_URL}/api/user/verifyOtp`, {
        email,
        otp: Otp,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("credits", response.data.credits);
      navigate('/dashboard');
      setLoading(false);
    } catch (error:any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen">
      {isRegistered ? (
        <div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          {!otpSent ? (
            <div className="w-[85%] lg:w-[60%] h-full flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center p-10">
                <div className="w-full lg:w-[70%] flex items-start justify-start gap-1">
                  <img src={images.stars} alt="create.ai" className="w-8" />
                  <h2 className="text-2xl font-bold text-black">Create.ai</h2>
                </div>
                <div className="mt-10 w-full lg:w-[70%]">
                  <h3 className="text-2xl font-semibold">Create an account</h3>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-5 flex flex-col items-center gap-5"
                  >
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                      <div className="w-full flex items-center justify-center relative">
                        <img
                          src={images.user_info}
                          alt="user-info"
                          className="w-4 absolute left-2"
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent py-2.5 px-8 rounded-lg border border-neutral-400 text-xs"
                          placeholder="First Name"
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                        />
                      </div>
                      <div className="w-full flex items-center justify-center relative">
                        <img
                          src={images.user_info}
                          alt="user-info"
                          className="w-4 absolute left-2"
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent py-2.5 px-8 rounded-lg border border-neutral-400 text-xs"
                          placeholder="Last Name (Optional)"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                        />
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center relative">
                      <img
                        src={images.mail}
                        alt="email"
                        className="w-4 absolute left-2"
                      />
                      <input
                        type="email"
                        className="w-full bg-transparent py-2.5 px-8 rounded-lg border border-neutral-400 text-xs"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="w-full flex items-center justify-center relative">
                      <img
                        src={images.lock}
                        alt="email"
                        className="w-4 absolute left-2"
                      />
                      <input
                        type="password"
                        className="w-full bg-transparent py-2.5 px-8 rounded-lg border border-neutral-400 text-xs"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <button
                      type="submit"
                      className={` bg-black ${loading ? 'py-2': 'py-3'} w-full rounded-lg shadow-sm cursor-pointer`}
                    >
                      {loading ? <ClipLoader
                      size={15}
                      color="#fff"
                    /> : <h4 className="text-xs font-medium text-white">Create account</h4>}
                    </button>
                  </form>
                </div>
                <div className="w-full lg:w-[70%] mt-10">
                  <h3 className="text-sm font-semibold">
                    Choose your preferred method to continue
                  </h3>
                  <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5 mt-5">
                    <div
                      onClick={handleGoogleSignIn}
                      className="flex items-center justify-center gap-1 w-full lg:w-36 h-12 rounded-xl border-1 border-neutral-400 cursor-pointer shadow"
                    >
                      <img
                        src={images.google}
                        alt="google-icon"
                        className="w-8"
                      />
                      <h4 className="font-semibold text-sm">Google</h4>
                    </div>
                    <div
                      onClick={handleFacebookSignIn}
                      className="flex items-center justify-center gap-2 w-full lg:w-36 h-12 rounded-xl border-1 border-neutral-400 cursor-pointer shadow"
                    >
                      <img
                        src={images.facebook}
                        alt="google-icon"
                        className="w-6"
                      />
                      <h4 className="font-semibold text-sm">Facebook</h4>
                    </div>
                    <div
                      onClick={handleGithubSignIn}
                      className="flex items-center justify-center gap-2 w-full lg:w-36 h-12 rounded-xl border-1 border-neutral-400 cursor-pointer shadow"
                    >
                      <img
                        src={images.github}
                        alt="google-icon"
                        className="w-6"
                      />
                      <h4 className="font-semibold text-sm">Github</h4>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h4 className="text-sm font-semibold">
                      Already have an account?{" "}
                      <Link
                        to={"/sign-in"}
                        className="underline cursor-pointer"
                      >
                        Sign in
                      </Link>{" "}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[85%] lg:w-[60%] h-full flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center p-10">
                <div className="w-full lg:w-[70%] flex items-start justify-start gap-1">
                  <img src={images.stars} alt="create.ai" className="w-8" />
                  <h2 className="text-2xl font-bold text-black">Create.ai</h2>
                </div>
                <div className="w-full lg:w-[70%] flex flex-col items-start justify-start mt-10">
                  <h3 className="text-2xl font-semibold">
                    Verify your account
                  </h3>
                  <form onSubmit={handleOtpSubmit} className="mt-5">
                    <div className="flex items-center justify-center gap-2">
                      {otp.map((num, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-lg border border-black flex items-center justify-center"
                        >
                          <input
                            type="text"
                            ref={(ref) => (inputs.current[index] = ref)}
                            className="w-4 h-12 outline-none text-center font-semibold"
                            value={num}
                            maxLength={1}
                            onChange={(e) =>
                              handleOtpChange({ digit: e.target.value, index })
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      className={`w-full bg-black ${loading ? 'py-2': 'py-2.5'} rounded-lg cursor-pointer mt-5`}
                    >
                      {loading ? <ClipLoader
                      size={15}
                      color="#fff"
                    /> : <h4 className="text-xs font-medium text-white">Submit</h4>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="hidden lg:block w-full h-full bg-black">
            {otpSent ? <img
              src={images.verify_otp_bg}
              alt="sign-up-bg"
              className="w-full h-full object-cover"
            /> : <img
            src={images.sign_up_bg}
            alt="sign-up-bg"
            className="w-full h-full object-cover"
          />}
          </div>
        </div>
      )}
    </div>
  );
}
