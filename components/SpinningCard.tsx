/* eslint-disable @next/next/no-img-element */
/* @ts-nocheck */
'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function SpinningCard() {
  const mountRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // If THREE is already on window, init immediately after a tick
    if (typeof window !== 'undefined' && (window as any).THREE && !startedRef.current) {
      startedRef.current = true;
      setTimeout(init, 0);
    }
    function init() {
      const THREE = (window as any).THREE;
      const mount = mountRef.current;
      if (!mount) return;

      const W = mount.clientWidth || 360;
      const H = mount.clientHeight || 240;

      // Scene & renderer
      const scene = new THREE.Scene();
      scene.background = null;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1.5, 2));
      renderer.setSize(W, H);
      renderer.physicallyCorrectLights = true;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      mount.innerHTML = '';
      mount.appendChild(renderer.domElement);

      // Camera
      const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 50);
      camera.position.set(0.8, 0.45, 3.6);

      // Lights (key, fill, rim)
      const hemi = new THREE.HemisphereLight(0xff7777, 0x0b0b12, 0.7);
      scene.add(hemi);

      const key = new THREE.DirectionalLight(0xffffff, 2.0);
      key.position.set(3, 4, 2.5);
      key.castShadow = false;
      scene.add(key);

      const fill = new THREE.PointLight(0xff3355, 1.2, 10);
      fill.position.set(-2.5, 1.2, 2.0);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xffffff, 0.8);
      rim.position.set(-3.0, 2.0, -3.5);
      scene.add(rim);

      // Card geometry: rounded rectangle extruded (width x height x depth)
      function roundedRectShape(w: number, h: number, r: number) {
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
      const extrude = new THREE.ExtrudeGeometry(shape, {
        steps: 1,
        depth: 0.06,
        bevelEnabled: false,
      });
      extrude.computeVertexNormals();

      // Material: PBR metallic red with clearcoat
      const materialFront = new THREE.MeshPhysicalMaterial({
        color: 0xb31332,
        metalness: 0.92,
        roughness: 0.28,
        clearcoat: 1.0,
        clearcoatRoughness: 0.12,
        sheen: 1.0,
        sheenColor: new THREE.Color(0xff8899),
        reflectivity: 0.6,
      });

      const card = new THREE.Mesh(extrude, materialFront);
      card.castShadow = false; card.receiveShadow = false;

      // Slight bevel illusion by adding a thin rim mesh (scaled)
      const rimGeo = extrude.clone();
      const rimMat = new THREE.MeshStandardMaterial({
        color: 0x5a0f21,
        metalness: 0.8,
        roughness: 0.4,
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.scale.set(1.006, 1.006, 1.02);
      card.add(rimMesh);

      // Front "NORWA" brand via simple plane & canvas texture
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 180;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffffc0';
        ctx.font = '700 56px Inter, system-ui, Segoe UI, Roboto';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('NORWA', 20, 20);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy?.() || 8;
      const brandMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
      const brandPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.5), brandMat);
      brandPlane.position.set(0, 0.45, 0.031);
      card.add(brandPlane);

      // Subtle micro-scratches normal map (procedural via canvas)
      const nCan = document.createElement('canvas');
      nCan.width = nCan.height = 256;
      const nctx = nCan.getContext('2d');
      if (nctx) {
        nctx.fillStyle = '#7f7fff'; // neutral tangent-space normal
        nctx.fillRect(0,0,256,256);
        nctx.globalAlpha = 0.12;
        nctx.strokeStyle = '#8f8fff';
        for (let i=0;i<180;i++){
          const y = Math.random()*256;
          nctx.beginPath(); nctx.moveTo(0,y); nctx.lineTo(256,y+Math.random()*2-1); nctx.stroke();
        }
      }
      const normalTex = new THREE.CanvasTexture(nCan);
      normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
      normalTex.repeat.set(2, 2);
      materialFront.normalMap = normalTex;
      materialFront.normalScale.set(0.25, 0.25);

      // Group and orientation
      const group = new THREE.Group();
      group.add(card);
      scene.add(group);
      card.rotation.x = Math.PI * 0.03;
      card.rotation.y = Math.PI * 0.08;

      // Animated lights (for realistic moving reflections)
      const lightRig = new THREE.Group();
      scene.add(lightRig);
      lightRig.add(key, fill, rim);
      lightRig.rotation.x = 0.2;

      // Resize
      const onResize = () => {
        const w = mount.clientWidth || W, h = mount.clientHeight || H;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);

      // Animate
      let t = 0;
      let raf = 0;
      const loop = () => {
        t += 0.016;
        group.rotation.y = t * 0.6;
        lightRig.rotation.y = t * 0.8;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      loop();

      // Cleanup
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.dispose();
        mount.innerHTML = '';
      };
    }

    return () => {};
  }, []);

  return (
    <div className="wrap">
      {/* Load THREE from CDN only once per page */}
      <Script
        src="https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (!startedRef.current) {
            startedRef.current = true;
            setTimeout(() => (typeof window !== 'undefined') && (initImmediate()), 0);
          }
        }}
      />
      {/* helper to call init when script loads */}
      <script
        // dangerouslySetInnerHTML used only to expose a small hook
        dangerouslySetInnerHTML={{ __html: `window.__NORWA_THREE_READY__=true;` }}
      />
      <div ref={mountRef} className="canvasRoot" />
      <style jsx>{`
        .wrap{display:flex;justify-content:center;align-items:center}
        .canvasRoot{width:360px;height:226px}
        @media (max-width:420px){.canvasRoot{width:300px;height:188px}}
      `}</style>
    </div>
  );

  function initImmediate(){ /* noop, init runs in the effect when THREE exists */ }
}
