import VelocityMarquee from "@/components/ui/VelocityMarquee";
import { styles } from "@/content/site";

/** Scroll-reactive band of tattoo styles between About and Gallery. */
export default function Styles() {
  return (
    <section aria-label="Tattoo styles" className="relative overflow-hidden border-y border-line bg-surface py-14 md:py-20">
      <VelocityMarquee items={styles} className="font-display font-light text-[clamp(3.2rem,9vw,8.5rem)] leading-[1.05]" />
      <VelocityMarquee
        items={[...styles].reverse()}
        reverse
        speed={1.6}
        className="font-display italic text-[clamp(3.2rem,9vw,8.5rem)] leading-[1.05]"
        itemClassName="text-outline"
      />
    </section>
  );
}
