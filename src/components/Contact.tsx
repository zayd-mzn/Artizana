"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, MapPin, Mail, Send, CheckCircle } from "lucide-react";

const WHATSAPP_NUMBER = "212600000000";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", telephone: "", message: "" });
  const [sent, setSent] = useState(false);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%2C%20je%20souhaite%20vous%20contacter%20depuis%20votre%20site%20web.`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Bonjour !\n\nNom : ${form.nom}\nTéléphone : ${form.telephone}\n\nMessage :\n${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
    setForm({ nom: "", telephone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2C1A0E 0%, #7A1515 50%, #9C3D1A 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 zellige-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold-light font-body text-sm tracking-[0.4em] uppercase mb-3">
            Contactez-nous
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-cream mb-4">
            Parlons de votre commande
          </h2>
          <div className="moroccan-divider w-64 mx-auto">
            <span className="text-gold text-xl px-2">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="space-y-8 text-cream">
            <p className="font-body text-lg text-cream/80 leading-relaxed">
              Vous avez une question sur un produit ? Vous souhaitez une pièce sur mesure ?
              Notre équipe est disponible tous les jours pour vous accompagner.
            </p>

            {/* WhatsApp CTA — primary */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] hover:bg-[#1EB857] text-white px-6 py-5 rounded-2xl transition-colors shadow-xl group"
            >
              <div className="bg-white/20 rounded-xl p-3">
                <MessageCircle size={28} />
              </div>
              <div>
                <p className="font-heading font-bold text-lg">Commander via WhatsApp</p>
                <p className="text-white/70 text-sm font-body">Réponse rapide garantie</p>
              </div>
              <span className="ml-auto group-hover:translate-x-1 transition-transform text-xl">→</span>
            </a>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Téléphone", value: "+212 6 00 00 00 00" },
                { icon: Mail, label: "Email", value: "contact@artizana.ma" },
                { icon: MapPin, label: "Adresse", value: "Medina de Fès, Maroc" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/40 text-xs font-body tracking-wide uppercase">{label}</p>
                    <p className="text-cream font-body font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-3xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle size={48} className="text-[#25D366]" />
                <h3 className="font-heading text-2xl font-bold text-cream">Message envoyé !</h3>
                <p className="text-cream/70 font-body">
                  WhatsApp s&apos;est ouvert avec votre message. Nous vous répondrons très bientôt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-cream/60 text-xs font-body tracking-wide uppercase mb-2">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nom}
                    onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                    placeholder="Mohammed Alami"
                    className="w-full bg-white/10 border border-cream/20 text-cream placeholder:text-cream/30 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-gold/60 focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-cream/60 text-xs font-body tracking-wide uppercase mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.telephone}
                    onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
                    placeholder="+212 6XX XXX XXX"
                    className="w-full bg-white/10 border border-cream/20 text-cream placeholder:text-cream/30 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-gold/60 focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-cream/60 text-xs font-body tracking-wide uppercase mb-2">
                    Votre message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Décrivez le produit qui vous intéresse, la taille souhaitée, les couleurs..."
                    className="w-full bg-white/10 border border-cream/20 text-cream placeholder:text-cream/30 rounded-xl px-4 py-3 font-body focus:outline-none focus:border-gold/60 focus:bg-white/15 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-brown font-heading font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Send size={18} />
                  Envoyer via WhatsApp
                </button>

                <p className="text-center text-cream/40 text-xs font-body">
                  Votre message sera envoyé directement sur WhatsApp
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
