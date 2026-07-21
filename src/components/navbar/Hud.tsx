import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", { hour12: false });
    setT(fmt());
    const i = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(i);
  }, []);
  return <span>{t || "--:--:--"}</span>;
}

export function Hud() {
  return (
    <>
      {/* top-left monogram */}
      <div className="fixed top-5 left-6 z-40 flex items-center gap-2">
        <div className="w-10 h-10 rounded-md bg-accent-lime flex items-center justify-center font-bold text-[15px] text-black">
          {profile.monogram}
        </div>
      </div>
      {/* top-right role */}
      <div className="fixed top-7 right-8 z-40 mono-label hidden sm:block">
        {profile.role}
      </div>
      {/* bottom-left location */}
      <div className="fixed bottom-6 left-6 z-40 mono-label flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
        <span>{profile.location}</span>
        <span className="text-white/25">/</span>
        <Clock />
      </div>
      {/* bottom-right local */}
      <div className="fixed bottom-6 right-8 z-40 mono-label hidden sm:flex items-center gap-2">
        <span>LOCAL</span>
        <span className="text-white/25">/</span>
        <Clock />
      </div>
    </>
  );
}
