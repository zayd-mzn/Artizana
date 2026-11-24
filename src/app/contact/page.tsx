import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageHeader from "@/components/shop/PageHeader";
import { directionsLink, mapEmbed, shop } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Adresse, téléphone, email et plan d'accès de la boutique Artizana à Fès. ${shop.hours}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Nous sommes <em className="text-miel">à votre écoute</em></>}
        intro="Une question, une remarque ou une critique : toutes sont bienvenues. Nous répondons tous les jours, en français, en arabe ou en anglais."
        crumbs={[{ label: "Contact" }]}
      />
      <Contact />
      <section className="bg-chaux py-16 text-manganese md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-[var(--gutter)] lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 text-terre">La boutique</p>
            <h2 className="display text-[clamp(2rem,4vw,3.5rem)]">Venir nous voir</h2>
            <address className="mt-6 space-y-2 not-italic text-lg text-[var(--ink-soft)]">
              <p>{shop.address}</p>
              <p>{shop.hours}</p>
              <p>
                <a href={`tel:${shop.phone.replace(/\s/g, "")}`} className="hover:text-terre">{shop.phone}</a>
              </p>
              <p>
                <a href={`mailto:${shop.email}`} className="hover:text-terre">{shop.email}</a>
              </p>
            </address>
            <a href={directionsLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
              Itinéraire
            </a>
          </div>
          <div className="overflow-hidden rounded-[2rem] lg:col-span-8">
            <iframe
              title="Plan d'accès à la boutique Artizana"
              src={mapEmbed}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </>
  );
}
