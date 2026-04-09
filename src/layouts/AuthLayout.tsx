import Footer from "../components/Footer";
import Header from "../components/Header";
import Leftside from "../components/auth/Leftside";
import Rightside from "../components/auth/Rightside";

const AuthLayout = () => {
  return (
    <div className="bg-[#05070a] text-white min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Editorial Content */}
        <Leftside />
        {/* Right Side: Sign-in Form */}
        <Rightside />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
