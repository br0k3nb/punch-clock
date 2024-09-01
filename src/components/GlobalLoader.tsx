import logo from "../assets/logo.png";

export default function GlobalLoader() {
  return (
    <div className="h-screen w-screen flex flex-col space-y-3 justify-center text-center items-center  animate-pulse">
      <img src={logo} className="w-60 !mb-5 xxs:w-52 xxs:!mb-3" />
      <div className="flex flex-row space-x-3">
        <span className="loading loading-spinner loading-lg text-black" />
        <p className="text-[25px]">Loading...</p>
      </div>
    </div>
  );
}
