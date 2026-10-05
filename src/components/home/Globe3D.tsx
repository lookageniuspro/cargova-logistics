'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Ship, Plane, Compass, ArrowRightLeft, Sparkles, Navigation } from 'lucide-react';

interface Port {
  name: string;
  nameAr: string;
  country: string;
  lat: number;
  lng: number;
  isEgypt?: boolean;
  type: 'hub' | 'sea' | 'air';
}

const ports: Port[] = [
  // Primary Epicenter Hub: Egypt
  { name: 'Egypt (Suez & Alex)', nameAr: 'مصر (محور قناة السويس والإسكندرية)', country: 'Egypt', lat: 30.5852, lng: 32.2654, isEgypt: true, type: 'hub' },

  // Europe Hubs
  { name: 'Rotterdam', nameAr: 'ميناء روتردام', country: 'Netherlands', lat: 51.92, lng: 4.48, type: 'sea' },
  { name: 'Hamburg', nameAr: 'ميناء هامبورغ', country: 'Germany', lat: 53.55, lng: 9.99, type: 'sea' },
  { name: 'Genoa', nameAr: 'ميناء جنوة', country: 'Italy', lat: 44.41, lng: 8.93, type: 'sea' },
  { name: 'Frankfurt', nameAr: 'مطار فرانكفورت للشحن', country: 'Germany', lat: 50.03, lng: 8.57, type: 'air' },
  { name: 'London', nameAr: 'مطار هيثرو للشحن', country: 'UK', lat: 51.50, lng: -0.12, type: 'air' },

  // Asia & Far East Hubs
  { name: 'Shanghai', nameAr: 'ميناء شنغهاي الدولي', country: 'China', lat: 31.23, lng: 121.47, type: 'sea' },
  { name: 'Singapore', nameAr: 'ميناء سنغافورة العالمي', country: 'Singapore', lat: 1.35, lng: 103.82, type: 'sea' },
  { name: 'Hong Kong', nameAr: 'مطار هونغ كونغ الدولي', country: 'Hong Kong', lat: 22.31, lng: 114.16, type: 'air' },
  { name: 'Tokyo', nameAr: 'طوكيو ناريتا', country: 'Japan', lat: 35.68, lng: 139.77, type: 'air' },
  { name: 'Busan', nameAr: 'ميناء بوسان', country: 'South Korea', lat: 35.10, lng: 129.04, type: 'sea' },
  { name: 'Mumbai', nameAr: 'ميناء نهافا شيفا', country: 'India', lat: 18.95, lng: 72.95, type: 'sea' },

  // Middle East & Red Sea Hubs
  { name: 'Jeddah', nameAr: 'ميناء جدة الإسلامي', country: 'Saudi Arabia', lat: 21.48, lng: 39.19, type: 'sea' },
  { name: 'Dubai', nameAr: 'جبل علي ودبي ورلد سنترال', country: 'UAE', lat: 25.20, lng: 55.27, type: 'air' },

  // Americas Hubs
  { name: 'New York', nameAr: 'ميناء نيويورك ونيوجيرسي', country: 'USA', lat: 40.71, lng: -74.01, type: 'sea' },
  { name: 'Los Angeles', nameAr: 'ميناء لوس أنجلوس', country: 'USA', lat: 33.74, lng: -118.27, type: 'sea' },
  { name: 'Santos', nameAr: 'ميناء سانتوس', country: 'Brazil', lat: -23.96, lng: -46.33, type: 'sea' },

  // Africa & Oceania
  { name: 'Durban', nameAr: 'ميناء ديربان', country: 'South Africa', lat: -29.85, lng: 31.02, type: 'sea' },
  { name: 'Sydney', nameAr: 'ميناء بوتاني سيدني', country: 'Australia', lat: -33.86, lng: 151.20, type: 'sea' },
];

interface TradeRoute {
  id: string;
  from: string;
  to: string;
  dir: 'out' | 'in'; // Outbound from Egypt | Inbound to Egypt
  type: 'sea' | 'air';
  labelEn: string;
  labelAr: string;
  transitTime: string;
  activeCount: number;
}

const tradeRoutes: TradeRoute[] = [
  // --- OUTBOUND FROM EGYPT (من مصر إلى دول العالم) ---
  { id: 'eg-rot', from: 'Egypt (Suez & Alex)', to: 'Rotterdam', dir: 'out', type: 'sea', labelEn: 'Suez-Rotterdam Direct Express', labelAr: 'خط السويس - روتردام المباشر', transitTime: '11 Days', activeCount: 6 },
  { id: 'eg-sha', from: 'Egypt (Suez & Alex)', to: 'Shanghai', dir: 'out', type: 'sea', labelEn: 'Maritime Silk Corridor (Eastbound)', labelAr: 'طريق الحرير البحري - شنغهاي', transitTime: '19 Days', activeCount: 8 },
  { id: 'eg-sin', from: 'Egypt (Suez & Alex)', to: 'Singapore', dir: 'out', type: 'sea', labelEn: 'Egypt - Malacca Transshipment', labelAr: 'محور السويس - سنغافورة الملاحي', transitTime: '14 Days', activeCount: 5 },
  { id: 'eg-nyc', from: 'Egypt (Suez & Alex)', to: 'New York', dir: 'out', type: 'sea', labelEn: 'Transatlantic Mediterranean Line', labelAr: 'الخط عبر الأطلسي - نيويورك', transitTime: '16 Days', activeCount: 4 },
  { id: 'eg-ham', from: 'Egypt (Suez & Alex)', to: 'Hamburg', dir: 'out', type: 'sea', labelEn: 'Central Europe Sea Link', labelAr: 'خط شمال أوروبا - هامبورغ', transitTime: '13 Days', activeCount: 4 },
  { id: 'eg-jed', from: 'Egypt (Suez & Alex)', to: 'Jeddah', dir: 'out', type: 'sea', labelEn: 'Red Sea Fast Feeder', labelAr: 'الخط المغذي للبحر الأحمر - جدة', transitTime: '36 Hours', activeCount: 5 },
  { id: 'eg-mum', from: 'Egypt (Suez & Alex)', to: 'Mumbai', dir: 'out', type: 'sea', labelEn: 'Arabian Sea Subcontinent Artery', labelAr: 'شريان بحر العرب - مومباي', transitTime: '8 Days', activeCount: 3 },
  { id: 'eg-san', from: 'Egypt (Suez & Alex)', to: 'Santos', dir: 'out', type: 'sea', labelEn: 'South American Atlantic Link', labelAr: 'خط أمريكا الجنوبية - سانتوس', transitTime: '22 Days', activeCount: 2 },
  { id: 'eg-dxb', from: 'Egypt (Suez & Alex)', to: 'Dubai', dir: 'out', type: 'air', labelEn: 'Cairo-Dubai Priority Air Cargo', labelAr: 'الشحن الجوي فائق السرعة - دبي', transitTime: '3.5 Hours', activeCount: 7 },
  { id: 'eg-fra', from: 'Egypt (Suez & Alex)', to: 'Frankfurt', dir: 'out', type: 'air', labelEn: 'Cairo-Frankfurt European Air Hub', labelAr: 'شحن جوي سريع - فرانكفورت', transitTime: '4.5 Hours', activeCount: 5 },
  { id: 'eg-lhr', from: 'Egypt (Suez & Alex)', to: 'London', dir: 'out', type: 'air', labelEn: 'UK Air Cargo Express', labelAr: 'الشحن الجوي المباشر - لندن', transitTime: '5 Hours', activeCount: 4 },
  { id: 'eg-hkg', from: 'Egypt (Suez & Alex)', to: 'Hong Kong', dir: 'out', type: 'air', labelEn: 'Asia Air Cargo Gateway', labelAr: 'بوابة الشحن الجوي الآسيوي - هونغ كونغ', transitTime: '9 Hours', activeCount: 3 },

  // --- INBOUND TO EGYPT (من دول العالم إلى مصر) ---
  { id: 'rot-eg', from: 'Rotterdam', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'North Europe Import Route', labelAr: 'واردات شمال أوروبا إلى الإسكندرية', transitTime: '10 Days', activeCount: 6 },
  { id: 'sha-eg', from: 'Shanghai', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'China Mainline Inbound Service', labelAr: 'الخط الصيني الرئيسي إلى مصر', transitTime: '18 Days', activeCount: 9 },
  { id: 'sin-eg', from: 'Singapore', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'Southeast Asia Supply Corridor', labelAr: 'محور توريد جنوب شرق آسيا', transitTime: '13 Days', activeCount: 5 },
  { id: 'nyc-eg', from: 'New York', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'US East Coast Import Artery', labelAr: 'واردات الساحل الشرقي الأمريكي', transitTime: '15 Days', activeCount: 4 },
  { id: 'lax-eg', from: 'Los Angeles', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'Pacific to Suez Strategic Route', labelAr: 'مسار المحيط الهادئ إلى السويس', transitTime: '26 Days', activeCount: 3 },
  { id: 'dxb-eg', from: 'Dubai', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'air', labelEn: 'Gulf Express Inbound Cargo', labelAr: 'واردات الشحن الجوي من الخليج', transitTime: '3.5 Hours', activeCount: 8 },
  { id: 'fra-eg', from: 'Frankfurt', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'air', labelEn: 'Germany-Cairo Direct Cargo', labelAr: 'الشحن الجوي الوارد من ألمانيا', transitTime: '4.5 Hours', activeCount: 5 },
  { id: 'hkg-eg', from: 'Hong Kong', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'air', labelEn: 'Far East High-Tech Air Cargo', labelAr: 'شحن البضائع التقنية الواردة من هونغ كونغ', transitTime: '8.5 Hours', activeCount: 4 },
  { id: 'jed-eg', from: 'Jeddah', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'Red Sea Petrochemical & Cargo Link', labelAr: 'شريان البحر الأحمر الوارد إلى مصر', transitTime: '36 Hours', activeCount: 6 },
  { id: 'gen-eg', from: 'Genoa', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'Mediterranean Direct Inbound', labelAr: 'المسار المتوسطي المباشر إلى الإسكندرية', transitTime: '4 Days', activeCount: 4 },
  { id: 'dur-eg', from: 'Durban', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'Southern Africa Suez Corridor', labelAr: 'ممر جنوب أفريقيا الملاحي إلى السويس', transitTime: '17 Days', activeCount: 2 },
  { id: 'syd-eg', from: 'Sydney', to: 'Egypt (Suez & Alex)', dir: 'in', type: 'sea', labelEn: 'Oceania-Europe Trade Transit', labelAr: 'مسار تجارة أوقيانوسيا العابر بمصر', transitTime: '24 Days', activeCount: 2 },
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

// Procedural World Continent Dot Matrix generator
function isLandCoordinate(lat: number, lng: number): boolean {
  // Approximate continental landmass boundaries
  // Africa (including Egypt)
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true;
  // Europe
  if (lat >= 36 && lat <= 71 && lng >= -10 && lng <= 45) return true;
  // Asia
  if (lat >= 5 && lat <= 75 && lng >= 40 && lng <= 145) return true;
  // North America
  if (lat >= 12 && lat <= 72 && lng >= -168 && lng <= -52) return true;
  // South America
  if (lat >= -56 && lat <= 13 && lng >= -82 && lng <= -34) return true;
  // Australia & NZ
  if (lat >= -47 && lat <= -10 && lng >= 113 && lng <= 178) return true;
  // Southeast Asia Islands
  if (lat >= -10 && lat <= 20 && lng >= 95 && lng <= 140) return true;
  return false;
}

function createDotTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(56, 189, 248, 0.9)');
  gradient.addColorStop(0.7, 'rgba(14, 165, 233, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

function createGoldGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(251, 191, 36, 1)');
  gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.6)');
  gradient.addColorStop(0.8, 'rgba(217, 119, 6, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'outbound' | 'inbound' | 'ocean' | 'air'>('all');
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeHoverPort, setActiveHoverPort] = useState<Port | null>(null);

  // Filter routes based on mode
  const filteredRoutes = useMemo(() => {
    switch (filterMode) {
      case 'outbound':
        return tradeRoutes.filter((r) => r.dir === 'out');
      case 'inbound':
        return tradeRoutes.filter((r) => r.dir === 'in');
      case 'ocean':
        return tradeRoutes.filter((r) => r.type === 'sea');
      case 'air':
        return tradeRoutes.filter((r) => r.type === 'air');
      default:
        return tradeRoutes;
    }
  }, [filterMode]);

  // Rotate active route ticker every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % tradeRoutes.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Center camera with view angled at Mediterranean & Egypt crossroads
    camera.position.set(0.6, 1.25, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0); // Strict alpha 0
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.75;

    const R = 1.48; // Globe Base Radius
    const dotTex = createDotTexture();
    const goldTex = createGoldGlowTexture();

    // 3. Globe Sphere Core
    const globeGeo = new THREE.SphereGeometry(R, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x061122,
      emissive: 0x020813,
      specular: 0x0ea5e9,
      shininess: 15,
      transparent: true,
      opacity: 0.95,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    // 4. Procedural World Continent Dot Matrix (Land Representation)
    const landPointsList: THREE.Vector3[] = [];
    const landColorsList: number[] = [];

    for (let lat = -65; lat <= 75; lat += 2.8) {
      for (let lng = -180; lng <= 180; lng += 2.8) {
        if (isLandCoordinate(lat, lng)) {
          const pt = latLngToVector3(lat, lng, R + 0.008);
          landPointsList.push(pt);

          // Highlight Egypt in glowing gold!
          const isEgyptArea = lat >= 22 && lat <= 32 && lng >= 25 && lng <= 36;
          if (isEgyptArea) {
            landColorsList.push(1.0, 0.75, 0.15); // Golden
          } else {
            landColorsList.push(0.18, 0.42, 0.65); // Slate / Cyber Blue
          }
        }
      }
    }

    const landGeo = new THREE.BufferGeometry().setFromPoints(landPointsList);
    landGeo.setAttribute('color', new THREE.Float32BufferAttribute(landColorsList, 3));
    const landMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      map: dotTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const landPointsMesh = new THREE.Points(landGeo, landMat);
    scene.add(landPointsMesh);

    // 5. Orbital Equatorial Rings (Navigation Telemetry)
    const ringGeo = new THREE.RingGeometry(R * 1.08, R * 1.085, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.45;
    scene.add(ringMesh);

    // 6. Atmospheric Glow Shader
    const atmosGeo = new THREE.SphereGeometry(R * 1.16, 64, 64);
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
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.02, 0.60, 0.98, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));

    // 7. Ports & Epicenter Setup
    const portPositions: Record<string, THREE.Vector3> = {};
    const egyptPulsers: THREE.Sprite[] = [];
    const destinationPulsers: THREE.Sprite[] = [];

    ports.forEach((p) => {
      const pos = latLngToVector3(p.lat, p.lng, R + 0.015);
      portPositions[p.name] = pos;

      if (p.isEgypt) {
        // Grand Golden Epicenter Beacon for Egypt
        const egyptCoreGeo = new THREE.SphereGeometry(0.042, 16, 16);
        const egyptCoreMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
        const egyptDot = new THREE.Mesh(egyptCoreGeo, egyptCoreMat);
        egyptDot.position.copy(pos);
        scene.add(egyptDot);

        // Vertical glowing telemetry pillar rising outward from Egypt
        const pillarGeo = new THREE.CylinderGeometry(0.008, 0.002, 0.35, 12);
        const pillarMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.85,
        });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.copy(pos.clone().multiplyScalar(1.09));
        pillar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
        scene.add(pillar);

        // Huge Pulsing Halo for Egypt Hub
        for (let i = 0; i < 2; i++) {
          const sm = new THREE.SpriteMaterial({
            map: goldTex,
            color: 0xf59e0b,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending,
          });
          const sprite = new THREE.Sprite(sm);
          sprite.position.copy(pos);
          sprite.scale.set(0.35 + i * 0.15, 0.35 + i * 0.15, 1);
          scene.add(sprite);
          egyptPulsers.push(sprite);
        }
      } else {
        // International Hub Port Marker
        const portColor = p.type === 'air' ? 0xf59e0b : 0x38bdf8;
        const portGeo = new THREE.SphereGeometry(0.024, 12, 12);
        const portMat = new THREE.MeshBasicMaterial({ color: portColor });
        const portMesh = new THREE.Mesh(portGeo, portMat);
        portMesh.position.copy(pos);
        scene.add(portMesh);

        // Subtle port pulse
        const sm = new THREE.SpriteMaterial({
          map: dotTex,
          color: portColor,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
        });
        const spr = new THREE.Sprite(sm);
        spr.position.copy(pos);
        spr.scale.set(0.18, 0.18, 1);
        scene.add(spr);
        destinationPulsers.push(spr);
      }
    });

    // 8. 3D Great-Circle Shipping Lines & Animated Cargo Photons
    interface CurveData {
      route: TradeRoute;
      curve: THREE.CatmullRomCurve3;
      mesh: THREE.Line;
      particles: THREE.Sprite[];
      progresses: number[];
      speed: number;
    }

    const curvesData: CurveData[] = [];
    const egyptPos = portPositions['Egypt (Suez & Alex)'];

    tradeRoutes.forEach((route, idx) => {
      const pFrom = portPositions[route.from];
      const pTo = portPositions[route.to];
      if (!pFrom || !pTo) return;

      // Calculate spherical great-circle arc peak
      const mid = pFrom.clone().add(pTo).multiplyScalar(0.5);
      const dist = pFrom.distanceTo(pTo);
      // Higher altitude for air cargo corridors
      const altFactor = route.type === 'air' ? 0.28 : 0.18;
      const altitude = Math.min(Math.max(dist * altFactor, 0.12), 0.45);
      mid.normalize().multiplyScalar(R * (1 + altitude));

      const curve = new THREE.CatmullRomCurve3([pFrom, mid, pTo]);
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      // Distinct Colors:
      // Outbound Ocean: Sky Blue | Inbound Ocean: Emerald Green | Air Express: Radiant Amber
      let arcColor = 0x0ea5e9;
      if (route.type === 'air') {
        arcColor = 0xf59e0b; // Gold
      } else if (route.dir === 'in') {
        arcColor = 0x10b981; // Emerald/Mint
      }

      const curveMat = new THREE.LineBasicMaterial({
        color: arcColor,
        transparent: true,
        opacity: route.type === 'air' ? 0.65 : 0.5,
        blending: THREE.AdditiveBlending,
      });

      const lineMesh = new THREE.Line(curveGeo, curveMat);
      scene.add(lineMesh);

      // Create 2 animated cargo photons per trade lane
      const particles: THREE.Sprite[] = [];
      const progresses: number[] = [];

      for (let i = 0; i < 2; i++) {
        const pMat = new THREE.SpriteMaterial({
          map: route.type === 'air' ? goldTex : dotTex,
          color: arcColor,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
        });
        const spr = new THREE.Sprite(pMat);
        const scale = route.type === 'air' ? 0.14 : 0.12;
        spr.scale.set(scale, scale, 1);
        spr.position.copy(pFrom);
        scene.add(spr);
        particles.push(spr);
        progresses.push((i * 0.5 + idx * 0.1) % 1);
      }

      // Air cargo flies 60% faster than ocean vessels
      const speed = route.type === 'air' ? 0.0035 : 0.0022;

      curvesData.push({
        route,
        curve,
        mesh: lineMesh,
        particles,
        progresses,
        speed,
      });
    });

    // 9. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.6);
    dirLight1.position.set(5, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 0.7);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    // 10. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Egypt Epicenter Pulsing
      const s1 = 0.35 + Math.sin(time * 3.5) * 0.08;
      const s2 = 0.55 + Math.sin(time * 3.5 + 1.2) * 0.12;
      if (egyptPulsers[0]) egyptPulsers[0].scale.set(s1, s1, 1);
      if (egyptPulsers[1]) egyptPulsers[1].scale.set(s2, s2, 1);

      // Port markers gentle pulse
      destinationPulsers.forEach((p, i) => {
        const s = 0.18 + Math.sin(time * 2.5 + i) * 0.04;
        p.scale.set(s, s, 1);
      });

      // Orbital Ring slow counter-spin
      ringMesh.rotation.z = time * 0.04;

      // Animate Moving Cargo Photons along curves
      curvesData.forEach((cd) => {
        // Filter visibility based on current user selection
        let isVisible = true;
        if (filterMode === 'outbound' && cd.route.dir !== 'out') isVisible = false;
        if (filterMode === 'inbound' && cd.route.dir !== 'in') isVisible = false;
        if (filterMode === 'ocean' && cd.route.type !== 'sea') isVisible = false;
        if (filterMode === 'air' && cd.route.type !== 'air') isVisible = false;

        cd.mesh.visible = isVisible;

        cd.particles.forEach((p, pIdx) => {
          p.visible = isVisible;
          if (!isVisible) return;

          cd.progresses[pIdx] = (cd.progresses[pIdx] + cd.speed) % 1;
          const pos = cd.curve.getPoint(cd.progresses[pIdx]);
          p.position.copy(pos);
        });
      });

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
  }, [filterMode]);

  const activeRoute = tradeRoutes[activeRouteIndex];

  return (
    <div className="relative w-full select-none">
      {/* Top Interactive Mode Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md mb-3 shadow-xl">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white px-2">
          <Navigation className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>الرادار الملاحي 3D</span>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            جميع المسارات ({tradeRoutes.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('outbound')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'outbound'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🇪🇬 صادر من مصر</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('inbound')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'inbound'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🌍 وارد إلى مصر</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('ocean')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'ocean'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Ship className="w-3 h-3" />
            <span>بحري (قناة السويس)</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('air')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterMode === 'air'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Plane className="w-3 h-3" />
            <span>شحن جوي سريع</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Mounting Area */}
      <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[580px] rounded-3xl bg-slate-950/40 border border-slate-800/80 overflow-hidden shadow-2xl flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Egypt Grand Epicenter Badge */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 pointer-events-none z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-500/50 shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold text-amber-300 font-sans">
              🇪🇬 Egypt Epicenter Hub (Suez Canal & Alexandria)
            </span>
          </div>
        </div>

        {/* Live Active Trade Lane Spotlight (Ticker) */}
        <div className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:left-4 sm:right-auto rtl:sm:left-auto rtl:sm:right-4 pointer-events-none z-10">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl max-w-sm space-y-1.5">
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-1.5 font-bold">
                {activeRoute.type === 'air' ? (
                  <Plane className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Ship className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span className={activeRoute.type === 'air' ? 'text-amber-300' : 'text-sky-300'}>
                  {activeRoute.dir === 'out' ? '🇪🇬 صادر من مصر ➔' : '🌍 وارد إلى مصر ➔'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                ● {activeRoute.activeCount} وحدات شحن نشطة
              </span>
            </div>

            <p className="text-xs font-bold text-white leading-snug">
              {activeRoute.labelAr}
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              <span>زمن العبور التقريبي: <strong className="text-slate-200">{activeRoute.transitTime}</strong></span>
              <span className="font-mono text-sky-400">انقر واسحب للتدوير 360°</span>
            </div>
          </div>
        </div>

        {/* Direction Legend (Desktop) */}
        <div className="hidden md:flex absolute top-3 right-3 rtl:right-auto rtl:left-3 pointer-events-none z-10 flex-col gap-1.5 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-[11px] shadow-lg">
          <div className="flex items-center gap-2 text-sky-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block animate-pulse" />
            <span>مسارات الشحن البحري (قناة السويس)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>شحنات واردة إلى مصر</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
            <span>شحن جوي سريع (مطار القاهرة الدولي)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
