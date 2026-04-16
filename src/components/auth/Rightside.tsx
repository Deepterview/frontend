import { useState } from "react";
import type { Auth } from "../../types";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Rightside = () => {
  const [activeTab, setActiveTab] = useState<Auth>("login");
  const navigate = useNavigate();
  const isRegister = activeTab === "register";
  return (
    <section className="w-full md:w-1/2 bg-background flex items-center justify-center p-6 md:p-12 lg:p-20 relative">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-on-background mb-2">
            다시 오신 것을 환영합니다
          </h2>
          <p className="text-on-surface-variant/60">
            면접 마스터를 향한 여정을 계속하세요.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-surface-container-lowest p-1.5 rounded-full mb-10 border border-white/5">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "login"
                ? "bg-surface-container-high text-primary shadow-lg"
                : "text-on-surface-variant/60 hover:text-on-background"
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-30 cursor-pointer ${
              activeTab === "register"
                ? "bg-surface-container-high text-primary shadow-lg"
                : "text-on-surface-variant/60 hover:text-on-background"
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-[0.7rem] uppercase tracking-[0.15em] font-bold text-primary/80 ml-4">
              이메일 주소
            </label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                placeholder="name@gmail.com"
                className="w-full bg-surface-container-lowest border-none ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50 rounded-2xl py-4 pl-14 pr-6 placeholder:text-white/20 transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-4">
              <label className="text-[0.7rem] uppercase tracking-[0.15em] font-bold text-primary/80">
                비밀번호
              </label>
              {activeTab === "login" && (
                <a
                  href="#"
                  className="text-[0.7rem] uppercase tracking-[0.15em] text-on-surface-variant/40 hover:text-primary transition-colors"
                >
                  비밀번호를 잊으셨나요?
                </a>
              )}
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest border-none ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50 rounded-2xl py-4 pl-14 pr-6 placeholder:text-white/20 transition-all outline-none"
              />
            </div>
          </div>
          {/* when click Register button logic  */}
          {activeTab === "register" && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[0.7rem] uppercase tracking-[0.15em] font-bold text-primary/80">
                  다시 비밀번호
                </label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50 rounded-2xl py-4 pl-14 pr-6 placeholder:text-white/20 transition-all outline-none"
                />
              </div>
            </div>
          )}
          {activeTab === "login" && (
            <div className="flex items-center gap-3 px-4">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="keep-logged"
                  className="peer appearance-none w-5 h-5 rounded border border-white/10 bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-all cursor-pointer"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-on-background rounded-full" />
                </div>
              </div>
              <label
                htmlFor="keep-logged"
                className="text-sm text-on-surface-variant/80 cursor-pointer select-none"
              >
                로그인 상태 유지
              </label>
            </div>
          )}
          <button
            className="w-full bg-primary-container text-on-background font-bold py-4 rounded-2xl glow-button flex items-center justify-center gap-2 group cursor-pointer"
            onClick={() => {
              if (isRegister) {
                // register logic here
              } else {
                navigate("/dashboard");
              }
            }}
          >
            {isRegister ? "회원가입" : "로그인"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-sm text-on-surface-variant/50">
            플랫폼이 처음이신가요?
            <a
              onClick={() => setActiveTab("register")}
              className="text-primary font-semibold ml-1 hover:underline underline-offset-4 decoration-primary/30 cursor-pointer"
            >
              무료로 회원가입
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Rightside;
