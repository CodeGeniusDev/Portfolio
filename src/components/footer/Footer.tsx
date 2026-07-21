import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 md:px-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mono-label"
      >
        <div>&copy; {new Date().getFullYear()} {profile.firstName} {profile.lastName}</div>
        <div>Built with motion &amp; care.</div>
      </motion.div>
    </footer>
  );
}
