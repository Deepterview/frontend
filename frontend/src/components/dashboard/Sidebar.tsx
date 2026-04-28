import { Home, BrainCircuit, History, User, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "홈", link: "/dashboard" },
    {
      icon: BrainCircuit,
      label: "연습",
      link: "/dashboard/practice",
    },
    {
      icon: BarChart3,
      label: "분석",
      link: "/dashboard/analytics",
    },
    {
      icon: History,
      label: "히스토리",
      link: "/dashboard/history",
    },
    { icon: User, label: "내 정보", link: "/dashboard/myinfo" },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  function handleClickSidebarNav(link: string) {
    navigate(link);
  }

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 flex flex-col py-8 px-4 bg-gradient-to-r from-[#191c1f] to-transparent border-r border-[#494454]/10">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-black text-[#cebdff] tracking-tighter">
          Deepterview
        </h1>
        <p className="font-sans tracking-widest uppercase text-[0.65rem] text-[#cbc3d7]/70 mt-4">
          미드나잇 옵저버
        </p>
        <p className="font-sans text-[0.6rem] text-[#cbc3d7]/40 mt-0.5">
          프리미엄 AI 코치
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isNavActive = location.pathname === item.link;
          return (
            <motion.button
              key={item.label}
              onClick={() => handleClickSidebarNav(item.link)}
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group w-full cursor-pointer ${
                isNavActive
                  ? "text-[#cebdff] bg-[#cebdff]/10 border-r-2 border-[#cebdff]"
                  : "text-[#cbc3d7]/70 hover:bg-[#323539]/30"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isNavActive
                    ? "text-[#cebdff]"
                    : "group-hover:text-[#cebdff] transition-colors"
                }
              />
              <span className="font-sans tracking-widest uppercase text-[0.7rem] font-medium">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
