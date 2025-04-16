import { Link, useNavigate } from "react-router-dom";
import { images } from "../constants/images";
import axios from "axios";
import { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/api/user/login`, {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };
  const handleGithubSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };
  const handleFacebookSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[85%] lg:w-[60%] h-full flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center p-10">
          <div className="w-full lg:w-[70%] flex items-start justify-start gap-1">
            <img src={images.stars} alt="create.ai" className="w-8" />
            <h2 className="text-2xl font-bold text-black">Create.ai</h2>
          </div>
          <div className="mt-10 w-full lg:w-[70%]">
            <h3 className="text-2xl font-semibold">Login to your account</h3>
            <form
              onSubmit={handleLogin}
              className="mt-5 flex flex-col items-center gap-5"
            >
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className="text-xs font-medium text-white bg-black py-3 w-full rounded-lg shadow-sm cursor-pointer"
              >
                {loading ? (
                  <ClipLoader size={15} color="#fff" />
                ) : (
                  <h4 className="text-xs font-medium text-white">Login</h4>
                )}
              </button>
            </form>
          </div>
          <div className="w-full lg:w-[70%] mt-10">
            <h3 className="text-sm font-semibold">
              Choose your preferred method to continue
            </h3>
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-5 mt-5">
              <div
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-1 w-full sm:w-36 h-12 rounded-xl border-1 border-neutral-400 cursor-pointer shadow"
              >
                <img src={images.google} alt="google-icon" className="w-8" />
                <h4 className="font-semibold text-sm">Google</h4>
              </div>
              <div
                onClick={handleFacebookSignIn}
                className="flex items-center justify-center gap-2 w-full sm:w-36 h-12 rounded-xl border-1 border-neutral-400 cursor-pointer shadow"
              >
                <img src={images.facebook} alt="google-icon" className="w-6" />
                <h4 className="font-semibold text-sm">Facebook</h4>
              </div>
              <div
                onClick={handleGithubSignIn}
                className="flex items-center justify-center gap-2 w-full sm:w-36 h-12 rounded-xl border-1 border-neutral-400 cursor-pointer shadow"
              >
                <img src={images.github} alt="google-icon" className="w-6" />
                <h4 className="font-semibold text-sm">Github</h4>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-semibold">
                Don't have an account?{" "}
                <Link to={"/sign-up"} className="underline cursor-pointer">
                  Sign up
                </Link>{" "}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-full h-full bg-black">
        <img
          src={images.sign_in_bg}
          alt="sign-in-bg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
