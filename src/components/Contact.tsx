"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, MapPin, Mail, Send, CheckCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { shop } from "@/data/site";

const field =
  "w-full border-b border-chaux/25 bg-transparent py-3 text-lg text-chaux placeholder:text-chaux/30 transition-colors focus:border-miel focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(
      whatsappLink(`Bonjour !\n\nNom : ${form.nom}\nEmail : ${form.email}\nTéléphone : ${form.telephone}\n\nMessage :\n${form.message}`),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
    setForm({ nom: "", email: "", telephone: "", message: "" });
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-cobalt-deep py-24 text-chaux md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] opacity-[0.12]"
        style={{ backgroundImage: "url(/brand/artizana-mark-mono-light.svg)", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
      />
      <div className="relative mx-auto grid max-w-[1500px] gap-16 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6 text-miel">Écrivez-nous</p>
          <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">
            Parlons de <em className="text-miel">votre pièce</em>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-chaux/70">
            Une question, une dimension sur mesure, un zellige composé dans l&apos;Atelier ? Écrivez-nous
            : nous répondons tous les jours, en français, en arabe ou en anglais.
          </p>

          <a
            href={whatsappLink("Bonjour, je souhaite vous contacter depuis votre site web.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 flex items-center gap-5 rounded-[1.5rem] bg-whatsapp p-6 text-white transition-transform hover:-translate-y-1"
           
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
              <MessageCircle size={26} />
            </span>
            <span>
              <span className="block font-display text-2xl">Commander via WhatsApp</span>
              <span className="text-sm text-white/75">Réponse rapide, photos des pièces disponibles</span>
            </span>
            <span className="ml-auto text-2xl transition-transform group-hover:translate-x-1">→</span>
          </a>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Phone, label: "Téléphone", value: shop.phone },
              { icon: Mail, label: "Email", value: shop.email },
              { icon: MapPin, label: "Boutique", value: shop.address },
            ].map(({ icon: Icon, label, value }) => (
              <li key={label}>
                <Icon size={18} className="text-miel" />
                <p className="eyebrow mt-3 text-[0.62rem] text-chaux/50">{label}</p>
                <p className="mt-1 font-medium">{value}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-[2rem] border border-chaux/15 bg-chaux/[0.04] p-8 backdrop-blur-sm md:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center" role="status">
                <CheckCircle size={48} className="text-miel" />
                <h3 className="display text-4xl">Message prêt !</h3>
                <p className="text-chaux/70">
                  WhatsApp s&apos;est ouvert avec votre message. Envoyez-le, et nous vous répondrons très
                  bientôt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <label className="block">
                  <span className="eyebrow text-[0.62rem] text-chaux/60">Votre nom *</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={form.nom}
                    onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                    placeholder="Mohammed Alami"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow text-[0.62rem] text-chaux/60">Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="vous@exemple.ma"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow text-[0.62rem] text-chaux/60">Téléphone *</span>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.telephone}
                    onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
                    placeholder="+212 6XX XXX XXX"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow text-[0.62rem] text-chaux/60">Votre message *</span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="La pièce qui vous intéresse, les dimensions, les couleurs…"
                    className={`${field} resize-none`}
                  />
                </label>
                <button type="submit" className="btn btn-light justify-center text-base">
                  <Send size={18} /> Envoyer via WhatsApp
                </button>
                <p className="text-center text-xs text-chaux/40">Votre message s&apos;ouvre dans WhatsApp, prêt à envoyer.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
