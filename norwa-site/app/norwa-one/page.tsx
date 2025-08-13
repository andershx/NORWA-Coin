import SpinningCard from '@/components/SpinningCard';
import Link from 'next/link';

export default function NorwaOnePage() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-8 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            NORWA <span className="grad">One</span>
          </h1>
          <p className="mt-4 text-lg" style={{color:'var(--muted)'}}>
            En moderne, kundefokusert krypto‑opplevelse med <strong>Ethereum‑cashback</strong>
            og sømløs on‑chain bekreftelse. Designet for investorer som ønsker enkel tilgang,
            åpenhet og ekte eiendeler på blokkjeden.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="btn btn-primary" href="#features">Utforsk funksjoner</a>
            <Link className="btn btn-ghost" href="/">Til forsiden</Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <SpinningCard />
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-5">
        <div className="tile">
          <h3 className="text-xl font-semibold">Ethereum‑cashback</h3>
          <p style={{color:'var(--muted)'}} className="mt-1">
            Tjen tilbake ETH på kvalifiserte kjøp og aktivitet i NORWA‑økosystemet.
            Utbetalinger styres av smarte regler og on‑chain målinger.
          </p>
        </div>
        <div className="tile">
          <h3 className="text-xl font-semibold">RWA‑klar infrastruktur</h3>
          <p style={{color:'var(--muted)'}} className="mt-1">
            Tokenisering, attestasjoner og rettighetskontroll bygget for ekte eiendeler –
            med fokus på reviserbarhet og compliance‑vennlig arkitektur.
          </p>
        </div>
        <div className="tile">
          <h3 className="text-xl font-semibold">Sømløs lommebok</h3>
          <p style={{color:'var(--muted)'}} className="mt-1">
            Koble til MetaMask og kom i gang. Kjøp NORWA direkte fra siden, motta token umiddelbart.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="card flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold">Bygget for fart og tillit</h3>
            <p style={{color:'var(--muted)'}} className="mt-2">
              NORWA One kombinerer enkel brukeropplevelse med robust token‑logikk.
              Du får rask onboarding, gjennomsiktige vilkår og et klart veikart for vekst.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href="/#om" className="btn btn-primary">Kom i gang</a>
          </div>
        </div>
      </section>
    </main>
  );
}
