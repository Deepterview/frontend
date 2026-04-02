import Icon from "../assets/Icon.svg";

const Header = () => {
  return (
    <>
      <div className="flex justify-between py-3 px-4 border-b border-[rgba(80,72,229,0.10)]">
        <button className="flex items-center gap-3 cursor-pointer">
          <div className="border border-black rounded-[10px] bg-violet-500 p-1">
            <img src={Icon} alt="" className="w-5 h-5 text-violet-600" />
          </div>
          <h1 className="font-bold text-lg tracking-wide">Deepterview</h1>
        </button>
        <button className="text-gray-50 border border-gray-300 rounded-[10px] px-4 py-1 cursor-pointer bg-violet-500 hover:bg-violet-400 hover:text-white hover:scale-105 transition duration-300 ease-in-out active:bg-violet-600">
          Login
        </button>
      </div>
    </>
  );
};

export default Header;
