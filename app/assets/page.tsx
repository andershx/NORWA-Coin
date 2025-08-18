import RwaShowcase from '@/components/RwaShowcase';

export default function AssetsPage(){
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold">NORWA <span className="grad">Assets</span></h1>
        <p className="mt-3" style={{color:'var(--muted)'}}>
          Browse all real‑world goods available for tokenization and trading.
        </p>
      </section>
      <RwaShowcase />
    </main>
  );
}
