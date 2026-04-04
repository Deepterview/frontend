import interviewAvatar from "../../assets/interviewAvatar.jpeg";
import sessionWaveBg from "../../assets/sessionWaveBg.png";
import iconLightbulb from "../../assets/iconLightbulb.svg";
import iconPlaySmall from "../../assets/iconPlaySmall.svg";

const MockUiSection = () => {
  return (
    <section
      className="relative w-full max-w-[1232px] px-4 sm:px-6"
      aria-label="Live interview session preview"
    >
      <div
        className="pointer-events-none absolute -left-12 -top-12 size-64 rounded-full bg-[rgba(123,208,255,0.1)] blur-2xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[48px] border border-[rgba(255,255,255,0.05)] bg-[rgba(12,14,18,0.6)] p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[20px] sm:p-8">
        <header className="flex flex-col gap-4 border-b border-[rgba(255,255,255,0.05)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#323539]">
              <img
                src={interviewAvatar}
                alt=""
                className="size-full object-cover opacity-80"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-[-0.35px] text-[#e1e2e7]">
                Live Interview Session
              </h2>
              <p className="text-[10px] font-normal uppercase tracking-wider text-[#64748b]">
                Position: Senior Product Designer
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-[rgba(239,68,68,0.1)] px-3 py-1">
              <span className="size-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-[10px] font-bold uppercase text-[#f87171]">
                REC
              </span>
            </div>
            <div className="rounded-full bg-[rgba(206,189,255,0.1)] px-3 py-1">
              <span className="text-[10px] font-bold uppercase text-[#cebdff]">
                00:14:52
              </span>
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="relative overflow-hidden rounded-[32px] bg-[#0c0e12]">
              <div className="relative h-[min(431px,60vh)] w-full opacity-40">
                <img
                  src={sessionWaveBg}
                  alt=""
                  className="absolute inset-0 h-[178%] w-full max-w-none object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-t from-black/80 to-transparent p-8">
                <div className="mb-4 flex justify-center">
                  <img
                    src={iconLightbulb}
                    alt=""
                    className="h-12 w-11 object-contain"
                  />
                </div>
                <p className="max-w-md text-center text-lg font-medium leading-7 text-[#e2e8f0] sm:text-xl">
                  &ldquo;How would you handle a situation where real-world data
                  contradicts your design intuition?&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-[rgba(255,255,255,0.05)] bg-[rgba(12,14,18,0.5)] p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(206,189,255,0.2)]">
                <img
                  src={iconPlaySmall}
                  alt=""
                  className="h-3 w-2 object-contain"
                />
              </div>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.05)]">
                <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-linear-to-r from-[#cebdff] to-[#7bd0ff]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-tight text-[#94a3b8]">
                Analyzing...
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="rounded-[32px] border border-[rgba(255,255,255,0.05)] bg-[#191c1f] p-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                Live Analysis
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-[#94a3b8]">Confidence</span>
                  <span className="font-bold text-[#cebdff]">88%</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-[#94a3b8]">Speech Pace</span>
                  <span className="font-bold text-[#7bd0ff]">Optimal</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-[#94a3b8]">Filler Words</span>
                  <span className="text-[#e1e2e7]">2 (low)</span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.05)] bg-[#191c1f] px-6 pb-6 pt-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                Emotion Analysis
              </p>
              <div className="flex h-32 items-end justify-center gap-2">
                <div className="h-16 flex-1 rounded-t-sm bg-[rgba(206,189,255,0.2)]" />
                <div className="h-24 flex-1 rounded-t-sm bg-[rgba(206,189,255,0.4)]" />
                <div className="h-full flex-1 rounded-t-sm bg-[#cebdff]" />
                <div className="h-[85px] flex-1 rounded-t-sm bg-[rgba(123,208,255,0.4)]" />
                <div className="h-[43px] flex-1 rounded-t-sm bg-[rgba(123,208,255,0.2)]" />
              </div>
              <div className="mt-4 border-t border-[rgba(255,255,255,0.05)] pt-4 text-center">
                <p className="text-[10px] uppercase text-[#64748b]">
                  System: Stable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-[rgba(123,208,255,0.05)] blur-[50px]"
        aria-hidden
      />
    </section>
  );
};

export default MockUiSection;
