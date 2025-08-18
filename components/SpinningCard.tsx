/* eslint-disable @next/next/no-img-element */
/* @ts-nocheck */
'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function SpinningCard() {
  const mountRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    let disposed = false;
    const tryInit = () => {
      if (disposed) return;
      const w = window as any;
      if (w && w.THREE) init();
      else setTimeout(tryInit, 50);
    };
    tryInit();

    function init() {
      if (readyRef.current) return;
      readyRef.current = true;
      const THREE = (window as any).THREE;
      const mount = mountRef.current;
      if (!mount) return;

      const W = mount.clientWidth || 360;
      const H = mount.clientHeight || 226;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1.5, 2));
      renderer.setSize(W, H);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      mount.innerHTML = '';
      mount.appendChild(renderer.domElement);

      // Scene & camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 50);
      camera.position.set(0.7, 0.45, 3.8);

      // --- Environment (procedural) ---
      const makeEnv = () => {
        const c = document.createElement('canvas');
        c.width = 1024; c.height = 512;
        const ctx = c.getContext('2d');

        if (ctx) {
          const g = ctx.createLinearGradient(0, 0, 1024, 512);
          g.addColorStop(0, '#1a0f14');     // dark red
          g.addColorStop(0.35, '#3b0f1e');  // deeper red
          g.addColorStop(0.6, '#0d0f16');   // dark blue-ish
          g.addColorStop(1, '#101216');     // near-black
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, c.width, c.height);

          // soft vignettes
          ctx.globalCompositeOperation = 'lighter';
          for (let i=0;i<3;i++){
            const cx = 200+i*300;
            const cy = 120+i*120;
            const rg = ctx.createRadialGradient(cx, cy, 20, cx, cy, 380);
            rg.addColorStop(0, 'rgba(255,80,100,0.22)');
            rg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = rg;
            ctx.beginPath(); ctx.arc(cx, cy, 380, 0, Math.PI*2); ctx.fill();
          }
        }

        const tex = new THREE.CanvasTexture(c);
        tex.mapping = THREE.EquirectangularReflectionMapping;
        tex.colorSpace = THREE.SRGBColorSpace;
        const pmrem = new THREE.PMREMGenerator(renderer);
        const env = pmrem.fromEquirectangular(tex).texture;
        tex.dispose();
        pmrem.dispose();
        return env;
      };
      scene.environment = makeEnv();

      // Lights
      const hemi = new THREE.HemisphereLight(0xff8899, 0x0b0b12, 0.6);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xffffff, 2.0);
      key.position.set(3, 4, 2.5);
      scene.add(key);
      const fill = new THREE.PointLight(0xff3355, 1.2, 10);
      fill.position.set(-2.2, 1.0, 2.0);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 0.8);
      rim.position.set(-3.0, 2.0, -3.5);
      scene.add(rim);

      // Geometry: rounded rectangle extruded
      function roundedRectShape(w, h, r) {
        const s = new THREE.Shape();
        const x = -w / 2, y = -h / 2;
        s.moveTo(x + r, y);
        s.lineTo(x + w - r, y);
        s.quadraticCurveTo(x + w, y, x + w, y + r);
        s.lineTo(x + w, y + h - r);
        s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        s.lineTo(x + r, y + h);
        s.quadraticCurveTo(x, y + h, x, y + h - r);
        s.lineTo(x, y + r);
        s.quadraticCurveTo(x, y, x + r, y);
        return s;
      }
      const shape = roundedRectShape(3.2, 2.0, 0.18);
      const extrude = new THREE.ExtrudeGeometry(shape, { steps: 1, depth: 0.06, bevelEnabled: false });
      extrude.computeVertexNormals();

      // Card material (PBR)
      const materialFront = new THREE.MeshPhysicalMaterial({
        color: 0xb31332,
        metalness: 0.95,
        roughness: 0.24,
        clearcoat: 1.0,
        clearcoatRoughness: 0.12,
        sheen: 1.0,
        sheenColor: new THREE.Color(0xff88a0),
        envMapIntensity: 1.0,
      });

      const card = new THREE.Mesh(extrude, materialFront);

      // Thin rim for depth cue
      const rimGeo = extrude.clone();
      const rimMat = new THREE.MeshStandardMaterial({ color: 0x4e0e1e, metalness: 0.8, roughness: 0.5 });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.scale.set(1.006, 1.006, 1.02);
      card.add(rimMesh);

      // Logo "foil" (uses /logo.svg). Slightly raised plane, metallic.
      const loader = new THREE.TextureLoader();
      loader.load('/logo.svg',
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          const w = 0.42;
          const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(w, w),
            new THREE.MeshPhysicalMaterial({
              map: tex,
              transparent: true,
              metalness: 0.9,
              roughness: 0.18,
              clearcoat: 1,
              clearcoatRoughness: 0.1,
              envMapIntensity: 1.2,
            })
          );
          plane.position.set(0.0, 0.48, 0.032);
          card.add(plane);
        },
        undefined,
        () => { /* ignore load errors, card still renders */ }
      );

      // Micro-scratches normal (guard ctx)
      const nCan = document.createElement('canvas');
      nCan.width = nCan.height = 256;
      const nctx = nCan.getContext('2d');
      if (nctx) {
        nctx.fillStyle = '#7f7fff';
        nctx.fillRect(0,0,256,256);
        nctx.globalAlpha = 0.1;
        nctx.strokeStyle = '#8f8fff';
        for (let i=0;i<220;i++){
          const y = Math.random()*256;
          nctx.beginPath(); nctx.moveTo(0,y); nctx.lineTo(256,y+(Math.random()*2-1)); nctx.stroke();
        }
      }
      const normalTex = new THREE.CanvasTexture(nCan);
      normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
      normalTex.repeat.set(2, 2);
      materialFront.normalMap = normalTex;
      materialFront.normalScale.set(0.25, 0.25);

      // Scene hierarchy
      const group = new THREE.Group();
      group.add(card);
      scene.add(group);
      card.rotation.x = Math.PI * 0.03;
      card.rotation.y = Math.PI * 0.08;

      // Light rig that orbits for dynamic reflections
      const lightRig = new THREE.Group();
      lightRig.add(key, fill, rim);
      scene.add(lightRig);

      // Resize handling
      const onResize = () => {
        const w = mount.clientWidth || W, h = mount.clientHeight || H;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);

      // Animate
      let t = 0, raf = 0;
      const loop = () => {
        t += 0.016;
        group.rotation.y = t * 0.6;
        lightRig.rotation.y = t * 0.8;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      loop();

      // Cleanup
      const cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.dispose();
        mount.innerHTML = '';
      };
      (mount as any).__cleanup = cleanup;
    }

    return () => {
      disposed = true;
      const mount = mountRef.current as any;
      if (mount && mount.__cleanup) mount.__cleanup();
    };
  }, []);

  return (
    <div className="wrap">
      <Script src="https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js" strategy="afterInteractive" />
      <div ref={mountRef} className="canvasRoot" />
      <style jsx>{`
        .wrap{display:flex;justify-content:center;align-items:center}
        .canvasRoot{width:360px;height:226px}
        @media (max-width:420px){.canvasRoot{width:300px;height:188px}}
      `}</style>
    </div>
  );
}
