import Footer from "../components/Footer";
import Header from "../components/Header";
import pic1 from "../assets/1.png";
import { Check } from "lucide-react";

const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header ...  */}
      <Header />

      {/* Body ...  */}
      <main>
        {/* Hero Section  */}
        <div className="flex px-32 py-12 flex-col items-center mt-20">
          {/* container  */}
          <div className="flex gap-y-12 gap-x-12 self-stretch justify-between items-center">
            {/* container 1  */}
            <div className="flex flex-col items-start gap-8 flex-1">
              <div className="border border-[#5048E51A] rounded-full px-4 py-1.5 bg-[#5048E50D] transition-all hover:bg-[#5048E51A] cursor-pointer">
                <p className="text-[#5048E5] text-sm font-semibold tracking-wide">
                  ✨ NEW: GPT-4O POWERED ANALYSIS
                </p>
              </div>
              <h1 className="text-[#0F172A] text-[72px] font-extrabold leading-[1.1] tracking-[-0.04em]">
                Master job <br />
                interviews with
                <br />
                <span className="text-[#5048E5] decoration-4 underline">
                  AI Expert
                </span>
              </h1>
              <p className="text-[#475569] text-xl font-normal leading-relaxed max-w-lg">
                Hone your interview skills with real-time AI coaching and
                personalized feedback tailored specifically to your industry and
                career goals.
              </p>
              <button className="bg-[#5048E5] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#4338CA] transition-all transform hover:scale-105 shadow-lg shadow-indigo-200 cursor-pointer">
                Get Started Free
              </button>
            </div>

            {/* container 2 (Image + Floating Card) */}
            <div className="relative flex-1 group">
              {/* Main Image with Gradient Overlay Effect */}
              <div className="relative rounded-4xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={pic1}
                  className="w-full h-auto object-cover"
                  alt="AI Interview Coaching"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-[#5048E505] to-transparent pointer-events-none" />
              </div>

              {/* Decorative background element (the light purple bar in your photo) */}
              <div className="absolute -left-12 top-4 w-12 h-4 bg-[#E0E7FF] rounded-r-lg -z-10 opacity-50" />

              {/* Feedback Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 max-w-70 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#22C55E] p-1.5 rounded-full shadow-sm shadow-green-200">
                    <Check className="text-white w-4 h-4" strokeWidth={4} />
                  </div>
                  <p className="font-bold text-[#0F172A] text-base">
                    Feedback received
                  </p>
                </div>
                <p className="text-sm text-[#64748B] leading-relaxed italic">
                  "Your answer for the conflict resolution question was
                  well-structured. Try using more specific metrics."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer ...  */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingLayout;
