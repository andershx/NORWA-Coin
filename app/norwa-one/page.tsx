import Link from 'next/link';
import SpinningCard from '../../components/SpinningCard';

export default function NorwaOnePage() {
  return (
    <main>
      <section style={{maxWidth:'1200px',margin:'0 auto',padding:'64px 20px',display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:'40px'}}>
        <div>
          <h1 style={{fontSize:'48px',fontWeight:900,lineHeight:1.1,margin:0}}>
            NORWA <span style={{background:'linear-gradient(90deg,#ff6b6b,#ff3b3b,#ff1a75)',WebkitBackgroundClip:'text',color:'transparent'}}>One</span>
          </h1>
          <p style={{marginTop:'16px',fontSize:'18px',color:'rgba(200,210,230,.9)'}}>
            En moderne, kundefokusert krypto‑opplevelse med <strong>Ethereum‑cashback</strong> og sømløs on‑chain bekreftelse.
            Designet for investorer som ønsker enkel tilgang, åpenhet og ekte eiendeler på blokkjeden.
          </p>
          <div style={{display:'flex',gap:'12px',marginTop:'20px'}}>
            <a href="#features" style={{padding:'10px 14px',borderRadius:12,background:'linear-gradient(90deg,#ff6b6b,#ff3b3b,#ff1a75)',color:'#0b0f14',textDecoration:'none',fontWeight:600}}>Utforsk funksjoner</a>
            <Link href="/" style={{padding:'10px 14px',borderRadius:12,border:'1px solid #2a3550',textDecoration:'none',color:'#fff'}}>Til forsiden</Link>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <SpinningCard/>
        </div>
      </section>

      <section id="features" style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px 64px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'16px'}}>
        <div style={{border:'1px solid #232a3d',borderRadius:16,background:'#0f1520',padding:'18px'}}>
          <h3 style={{fontSize:20,fontWeight:700,margin:0}}>Ethereum‑cashback</h3>
          <p style={{color:'rgba(200,210,230,.9)',marginTop:6}}>Tjen tilbake ETH på kvalifiserte kjøp og aktivitet i NORWA‑økosystemet.</p>
        </div>
        <div style={{border:'1px solid #232a3d',borderRadius:16,background:'#0f1520',padding:'18px'}}>
          <h3 style={{fontSize:20,fontWeight:700,margin:0}}>RWA‑klar infrastruktur</h3>
          <p style={{color:'rgba(200,210,230,.9)',marginTop:6}}>Tokenisering, attestasjoner og rettighetskontroll bygget for ekte eiendeler.</p>
        </div>
        <div style={{border:'1px solid #232a3d',borderRadius:16,background:'#0f1520',padding:'18px'}}>
          <h3 style={{fontSize:20,fontWeight:700,margin:0}}>Sømløs lommebok</h3>
          <p style={{color:'rgba(200,210,230,.9)',marginTop:6}}>Koble MetaMask og kjøp NORWA direkte fra siden.</p>
        </div>
      </section>
    </main>
  );
}
