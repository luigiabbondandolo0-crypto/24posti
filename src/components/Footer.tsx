import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5 bg-[#0D0D0B]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo.jpg"
            alt="24 Posti"
            width={40}
            height={40}
            className="rounded-sm object-cover"
          />
          <div>
            <p className="font-heading text-sm tracking-widest text-[#FAF9F6]">
              24 POSTI
            </p>
            <p className="font-body text-xs text-[#9C9990] tracking-wider">
              Ristorante di Mare · Avellino
            </p>
          </div>
        </div>

        {/* Center */}
        <p className="font-body text-xs text-[#9C9990] tracking-widest text-center">
          Via Gabriele Speranza, 12 · 83100 Avellino · +39 0825 1503257
        </p>

        {/* Right */}
        <p className="font-body text-xs text-[#9C9990]/50 tracking-wider">
          © {new Date().getFullYear()} 24 Posti
        </p>
      </div>
    </footer>
  );
}
