import { Alexandria, Bricolage_Grotesque } from "next/font/google";

/** English: Bricolage Grotesque with its optical-size axis. */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

/** Arabic (and the Latin words inside Arabic text): Alexandria. */
export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});
