import ContactForm from "@/components/form/ContactForm";
import { InstagramIcon } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/ui/SplitReveal";
import { site } from "@/content/site";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-surface px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-20 xl:grid-cols-[1fr_1.15fr] xl:gap-16">
        <div className="flex flex-col gap-10 xl:sticky xl:top-28 xl:self-start">
          <SectionLabel index="04" label="Book a session" />
          <SplitReveal as="h2" type="chars" className="font-display font-light uppercase text-[clamp(4.5rem,15vw,13rem)] leading-[0.82]">
            <span className="block">Con</span>
            <span className="block pl-[22%] italic normal-case">tact</span>
          </SplitReveal>
          <Reveal className="flex max-w-sm flex-col gap-8">
            <p className="leading-relaxed text-mute">
              Tell me about your idea — placement, size and any references you love — and let&apos;s design something that&apos;s
              truly yours.
            </p>
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm">
              <div>
                <dt className="eyebrow mb-2">Studio</dt>
                <dd>{site.city}, Germany</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Social</dt>
                <dd>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                  >
                    <InstagramIcon className="size-4" /> Instagram
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
