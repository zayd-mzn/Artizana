"use client";

import { useState, type FormEvent } from "react";
import { shop } from "@/data/site";

/**
 * The site has no backend yet, so signing up opens an email to the shop.
 * Replace with a newsletter provider (Brevo, Mailchimp…) when one is chosen.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Inscription à la newsletter");
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite recevoir la newsletter Artizana à cette adresse : ${email}\n`);
    window.location.href = `mailto:${shop.email}?subject=${subject}&body=${body}`;
    setDone(true);
  };

  if (done) {
    return <p className="text-sm text-miel" role="status">Merci ! Envoyez l&apos;email qui vient de s&apos;ouvrir pour confirmer votre inscription.</p>;
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">Votre adresse email</label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse email"
        className="min-w-0 flex-1 rounded-full border border-chaux/20 bg-chaux/5 px-5 py-3 text-chaux placeholder:text-chaux/40 focus:border-miel focus:outline-none"
      />
      <button type="submit" className="btn btn-light justify-center !py-3">
        S&apos;inscrire
      </button>
    </form>
  );
}
