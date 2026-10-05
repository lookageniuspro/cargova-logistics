'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Port {
  name: string;
  nameAr?: string;
  lat: number;
  lng: number;
  isEgypt?: boolean;
  type: 'hub' | 'sea' | 'air';
}

const ports: Port[] = [
  // Primary Central Hub: Egypt
  { name: 'Egypt (Suez & Alex)', nameAr: 'مصر (محور قناة السويس والإسكندرية)', lat: 30.0444, lng: 31.2357, isEgypt: true, type: 'hub' },
  
  // Key Connected Global Hubs
  { name: 'Rotterdam', lat: 51.92, lng: 4.48, type: 'sea' },
  { name: 'Hamburg', lat: 53.55, lng: 9.99, type: 'sea' },
  { name: 'Shanghai', lat: 31.23, lng: 121.47, type: 'sea' },
  { name: 'Singapore', lat: 1.35, lng: 103.82, type: 'sea' },
  { name: 'Dubai', lat: 25.20, lng: 55.27, type: 'air' },
  { name: 'New York', lat: 40.71, lng: -74.01, type: 'sea' },
  { name: 'London', lat: 51.50, lng: -0.12, type: 'air' },
  { name: 'Tokyo', lat: 35.68, lng: 139.77, type: 'air' },
  { name: 'Los Angeles', lat: 33.94, lng: -118.41, type: 'sea' },
  { name: 'Jeddah', lat: 21.48, lng: 39.19, type: 'sea' },
];

// Routes connecting Egypt to every major continent and hub (Bidirectional)
const routes = [
  // Outbound from Egypt
  { from: 'Egypt (Suez & Alex)', to: 'Rotterdam', type: 'sea', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'Shanghai', type: 'sea', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'Dubai', type: 'air', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'New York', type: 'sea', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'Hamburg', type: 'sea', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'Singapore', type: 'sea', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'London', type: 'air', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'Tokyo', type: 'air', dir: 'out' },
  { from: 'Egypt (Suez & Alex)', to: 'Jeddah', type: 'sea', dir: 'out' },

  // Inbound to Egypt (Global goods importing to Egypt)
  { from: 'Rotterdam', to: 'Egypt (Suez & Alex)', type: 'sea', dir: 'in' },
  { from: 'Shanghai', to: 'Egypt (Suez & Alex)', type: 'sea', dir: 'in' },
  { from: 'Dubai', to: 'Egypt (Suez & Alex)', type: 'air', dir: 'in' },
  { from: 'New York', to: 'Egypt (Suez & Alex)', type: 'sea', dir: 'in' },
  { from: 'Singapore', to: 'Egypt (Suez & Alex)', type: 'sea', dir: 'in' },
  { from: 'Los Angeles', to: 'Egypt (Suez & Alex)', type: 'sea', dir: 'in' },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(56, 189, 248, 0.8)');
  gradient.addColorStop(0.6, 'rgba(2, 132, 199, 0.3)');
  gradient.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function createGoldTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(245, 158, 11, 0.9)');
  gradient.addColorStop(0.7, 'rgba(217, 119, 6, 0.4)');
  gradient.addColorStop(1, 'rgba(217, 119, 6, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Focus slightly on Mediterranean / Egypt latitude
    camera.position.set(0.6, 1.2, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.75;

    const R = 1.45;
    const glowTex = createGlowTexture();
    const goldTex = createGoldTexture();

    // 1. Globe Base Sphere
    const globeGeo = new THREE.SphereGeometry(R, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x091426,
      transparent: true,
      opacity: 0.94,
      shininess: 12,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    // 2. Wireframe / Latitude Grid
    const wireGeo = new THREE.SphereGeometry(R + 0.006, 36, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.055,
    });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // 3. Atmospheric Outer Glow
    const atmosGeo = new THREE.SphereGeometry(R * 1.15, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.02, 0.55, 0.95, 1.0) * intensity * 0.85;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));

    // 4. Ports Mapping (Highlighting Egypt specially!)
    const portPositions: Record<string, THREE.Vector3> = {};
    const egyptPulsers: THREE.Sprite[] = [];

    ports.forEach((p) => {
      const pos = latLngToVector3(p.lat, p.lng, R + 0.015);
      portPositions[p.name] = pos;

      if (p.isEgypt) {
        // Special Golden Beacon for Egypt Hub (Suez Canal / Alexandria / Cairo)
        const egyptGeo = new THREE.SphereGeometry(0.038, 16, 16);
        const egyptMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const egyptDot = new THREE.Mesh(egyptGeo, egyptMat);
        egyptDot.position.copy(pos);
        scene.add(egyptDot);

        // Huge Pulsing Halo for Egypt
        const sm = new THREE.SpriteMaterial({
          map: goldTex,
          color: 0xfbbf24,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        });
        const sp = new THREE.Sprite(sm);
        sp.position.copy(pos);
        sp.scale.set(0.42, 0.42, 1);
        scene.add(sp);
        egyptPulsers.push(sp);
      } else {
        // Global Ports (Cyan Nodes)
        const dotGeo = new THREE.SphereGeometry(0.018, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.copy(pos);
        scene.add(dot);

        // Subtle glow sprite
        const sm = new THREE.SpriteMaterial({
          map: glowTex,
          color: 0x0284c7,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
        });
        const sp = new THREE.Sprite(sm);
        sp.position.copy(pos);
        sp.scale.set(0.16, 0.16, 1);
        scene.add(sp);
      }
    });

    // 5. Geodesic Curved Routes between Egypt and World
    interface Mover {
      mesh: THREE.Object3D;
      curve: THREE.QuadraticBezierCurve3;
      t: number;
      speed: number;
      isAir: boolean;
      dir: 'out' | 'in';
    }

    const movers: Mover[] = [];

    routes.forEach((route) => {
      const s = portPositions[route.from];
      const e = portPositions[route.to];
      if (!s || !e) return;

      const dist = s.distanceTo(e);
      // Lift the arc higher into the atmosphere for high visibility
      const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
      const arcHeight = R + 0.04 + dist * 0.32;
      mid.normalize().multiplyScalar(arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
      const pts = curve.getPoints(70);
      const lg = new THREE.BufferGeometry().setFromPoints(pts);

      // Distinguish Air (Amber Gold) vs Sea (Electric Cyan)
      const isAir = route.type === 'air';
      const color = isAir ? 0xf59e0b : 0x00e5ff;
      const lm = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: route.dir === 'out' ? 0.35 : 0.22,
      });
      scene.add(new THREE.Line(lg, lm));

      // Dynamic Shipment Cargo Beacon (moving aircraft / cargo vessel)
      const objGroup = new THREE.Group();

      const beaconGeo = isAir
        ? new THREE.ConeGeometry(0.022, 0.065, 4)
        : new THREE.BoxGeometry(0.04, 0.02, 0.06);
      const beaconMat = new THREE.MeshBasicMaterial({ color: isAir ? 0xfff066 : 0x67e8f9 });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      if (isAir) {
        beaconMesh.rotation.x = Math.PI / 2;
      }
      objGroup.add(beaconMesh);

      // Trailing Glow Particle
      const gsm = new THREE.SpriteMaterial({
        map: isAir ? goldTex : glowTex,
        color: isAir ? 0xf59e0b : 0x00e5ff,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const gsp = new THREE.Sprite(gsm);
      gsp.scale.set(0.2, 0.2, 1);
      objGroup.add(gsp);

      scene.add(objGroup);

      movers.push({
        mesh: objGroup,
        curve,
        t: Math.random(),
        speed: 0.0012 + Math.random() * 0.0018,
        isAir,
        dir: route.dir as 'out' | 'in',
      });
    });

    // 6. Ambient Particle Dust
    const particleCount = 450;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 14;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.015,
      transparent: true,
      opacity: 0.45,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // 7. Lighting
    scene.add(new THREE.AmbientLight(0x475569, 2.0));
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(5, 4, 6);
    scene.add(dirLight);

    const dirLightWarm = new THREE.DirectionalLight(0xf59e0b, 0.8);
    dirLightWarm.position.set(-5, 2, -4);
    scene.add(dirLightWarm);

    // 8. Animation Loop
    let animId: number;
    let pulseAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Animate shipment beacons moving along curves
      movers.forEach((m) => {
        m.t += m.speed;
        if (m.t > 1) m.t = 0;
        const currentPos = m.curve.getPointAt(m.t);
        m.mesh.position.copy(currentPos);
        const lookAhead = m.curve.getPointAt(Math.min(m.t + 0.015, 0.999));
        m.mesh.lookAt(lookAhead);
      });

      // Pulse Egypt Beacon
      pulseAngle += 0.04;
      const s = 0.38 + Math.sin(pulseAngle) * 0.08;
      egyptPulsers.forEach((p) => p.scale.set(s, s, 1));

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[620px] flex items-center justify-center select-none">
      {/* 3D Canvas Mounting Point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Interactive Route Radar Badge */}
      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-500/40 shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[11px] sm:text-xs font-bold text-amber-300 tracking-wide font-sans">
            🇪🇬 Egypt Global Hub ⇄ Worldwide Routes Active
          </span>
        </div>
      </div>

      {/* Route Direction Legend */}
      <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-10 pointer-events-none hidden sm:flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-[11px] shadow-2xl">
        <div className="flex items-center gap-2 text-sky-400 font-semibold">
          <span className="w-3 h-1 rounded bg-sky-400 inline-block" />
          <span>Ocean Freight (Via Suez Canal)</span>
        </div>
        <div className="flex items-center gap-2 text-amber-400 font-semibold">
          <span className="w-3 h-1 rounded bg-amber-400 inline-block" />
          <span>Priority Air Cargo Corridor</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-1 border-t border-slate-800 pt-1">
          Drag to rotate globe • 3D Real-time Visualization
        </div>
      </div>
    </div>
  );
}
