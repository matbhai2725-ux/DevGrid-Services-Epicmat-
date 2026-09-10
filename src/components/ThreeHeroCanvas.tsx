import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playSound } from '../utils/audio';

interface ThreeHeroCanvasProps {
  onSelectService?: (serviceId: string) => void;
  selectedServiceId?: string | null;
}

interface NodeData {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: number;
  glowColor: number;
  position: THREE.Vector3;
  mesh?: THREE.Group;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  elevation: number;
}

export default function ThreeHeroCanvas({ onSelectService, selectedServiceId }: ThreeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<{ id: string; name: string; tagline: string; x: number; y: number } | null>(null);
  const [viewMode, setViewMode] = useState<'orbit' | 'grid' | 'focused'>('orbit');
  const [fpsCounter, setFpsCounter] = useState<number>(60);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b10, 0.022);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 4.5, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(0x38bdf8, 3.5, 30);
    primaryLight.position.set(0, 5, 5);
    scene.add(primaryLight);

    const secondaryLight = new THREE.PointLight(0x818cf8, 2.5, 30);
    secondaryLight.position.set(-6, 2, -4);
    scene.add(secondaryLight);

    const accentLight = new THREE.PointLight(0x10b981, 2.5, 25);
    accentLight.position.set(6, -2, -3);
    scene.add(accentLight);

    // Dynamic Cyber Wave Grid Floor
    const gridCols = 40;
    const gridRows = 40;
    const gridSpacing = 0.8;
    const gridGeometry = new THREE.PlaneGeometry(gridCols * gridSpacing, gridRows * gridSpacing, gridCols, gridRows);
    gridGeometry.rotateX(-Math.PI / 2);

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.position.y = -3.2;
    scene.add(gridMesh);

    // Floating Grid Center Glow Plane
    const glowPlaneGeo = new THREE.CircleGeometry(7, 32);
    glowPlaneGeo.rotateX(-Math.PI / 2);
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 128;
    glowCanvas.height = 128;
    const gctx = glowCanvas.getContext('2d');
    if (gctx) {
      const gradient = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.1)');
      gradient.addColorStop(1, 'rgba(9, 11, 16, 0)');
      gctx.fillStyle = gradient;
      gctx.fillRect(0, 0, 128, 128);
    }
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const glowPlaneMat = new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glowPlane = new THREE.Mesh(glowPlaneGeo, glowPlaneMat);
    glowPlane.position.y = -3.18;
    scene.add(glowPlane);

    // Central DevGrid Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Glowing Energy Core
    const innerCoreGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    // 2. Outer Wireframe Polyhedron
    const outerCoreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const outerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const outerCore = new THREE.Mesh(outerCoreGeo, outerCoreMat);
    coreGroup.add(outerCore);

    // 3. Dual Holographic Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.8 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    coreGroup.add(ring2);

    // Ambient floating star dust particles
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorsPool = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0x34d399),
      new THREE.Color(0xa855f7),
    ];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const randomColor = colorsPool[Math.floor(Math.random() * colorsPool.length)];
      particleColors[i * 3] = randomColor.r;
      particleColors[i * 3 + 1] = randomColor.g;
      particleColors[i * 3 + 2] = randomColor.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Define 6 Service Orbit Nodes
    const serviceNodesData: NodeData[] = [
      {
        id: 'discord-bots',
        name: 'Discord Bots',
        tagline: 'Custom Automation & Slash Systems',
        icon: '🤖',
        color: 0x6366f1,
        glowColor: 0x818cf8,
        position: new THREE.Vector3(),
        orbitRadius: 4.6,
        orbitSpeed: 0.28,
        orbitAngle: 0,
        elevation: 0.8,
      },
      {
        id: 'websites-apps',
        name: 'Websites & Apps',
        tagline: 'High-Performance Modern Web Platforms',
        icon: '🌐',
        color: 0x06b6d4,
        glowColor: 0x38bdf8,
        position: new THREE.Vector3(),
        orbitRadius: 5.2,
        orbitSpeed: 0.22,
        orbitAngle: (Math.PI / 3) * 1,
        elevation: -0.6,
      },
      {
        id: 'bot-hosting',
        name: 'Bot Hosting',
        tagline: '24/7 Dedicated Cloud Infrastructure',
        icon: '🛠️',
        color: 0x10b981,
        glowColor: 0x34d399,
        position: new THREE.Vector3(),
        orbitRadius: 4.8,
        orbitSpeed: 0.26,
        orbitAngle: (Math.PI / 3) * 2,
        elevation: 1.2,
      },
      {
        id: 'minecraft-services',
        name: 'Minecraft Services',
        tagline: 'Paper/Purpur Networks & Custom Plugins',
        icon: '🎮',
        color: 0x84cc16,
        glowColor: 0xa3e635,
        position: new THREE.Vector3(),
        orbitRadius: 5.0,
        orbitSpeed: 0.24,
        orbitAngle: (Math.PI / 3) * 3,
        elevation: -1.0,
      },
      {
        id: 'custom-development',
        name: 'Custom Development',
        tagline: 'Bespoke Software, APIs & Microservices',
        icon: '⚙️',
        color: 0xf59e0b,
        glowColor: 0xfbbf24,
        position: new THREE.Vector3(),
        orbitRadius: 4.5,
        orbitSpeed: 0.3,
        orbitAngle: (Math.PI / 3) * 4,
        elevation: 0.4,
      },
      {
        id: 'setup-configuration',
        name: 'Setup & Config',
        tagline: 'VPS, Pterodactyl, DNS & Cloud Hardening',
        icon: '🔧',
        color: 0xd946ef,
        glowColor: 0xf472b6,
        position: new THREE.Vector3(),
        orbitRadius: 5.3,
        orbitSpeed: 0.21,
        orbitAngle: (Math.PI / 3) * 5,
        elevation: -0.2,
      },
    ];

    // Build 3D Meshes for each Service Node
    const interactiveMeshes: THREE.Object3D[] = [];
    const nodeGroups: { data: NodeData; group: THREE.Group; coreMesh: THREE.Mesh; haloMesh: THREE.Mesh }[] = [];

    serviceNodesData.forEach((node) => {
      const nodeGroup = new THREE.Group();

      // Custom shape based on service
      let geo: THREE.BufferGeometry;
      if (node.id === 'minecraft-services') {
        geo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      } else if (node.id === 'discord-bots') {
        geo = new THREE.OctahedronGeometry(0.5, 0);
      } else if (node.id === 'bot-hosting') {
        geo = new THREE.CylinderGeometry(0.35, 0.35, 0.7, 8);
      } else if (node.id === 'websites-apps') {
        geo = new THREE.DodecahedronGeometry(0.45, 0);
      } else if (node.id === 'custom-development') {
        geo = new THREE.TetrahedronGeometry(0.55, 0);
      } else {
        geo = new THREE.IcosahedronGeometry(0.48, 0);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.glowColor,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.7,
      });

      const coreMesh = new THREE.Mesh(geo, mat);
      coreMesh.userData = { nodeId: node.id, isServiceNode: true };
      nodeGroup.add(coreMesh);
      interactiveMeshes.push(coreMesh);

      // Wireframe Outer Halo
      const haloGeo = new THREE.SphereGeometry(0.75, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.glowColor,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeGroup.add(haloMesh);

      // Light beam / connection line to center
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.22,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0), // Updated in animation loop
      ]);
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      scene.add(lineMesh);

      scene.add(nodeGroup);
      node.mesh = nodeGroup;
      nodeGroups.push({ data: node, group: nodeGroup, coreMesh, haloMesh });
    });

    // Raycaster for mouse interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const targetMouse = new THREE.Vector2(0, 0);
    let hoveredNodeId: string | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = x;
      mouse.y = y;
      targetMouse.x = x * 0.4;
      targetMouse.y = y * 0.4;
    };

    const handleClick = () => {
      if (hoveredNodeId) {
        playSound('node');
        if (onSelectService) {
          onSelectService(hoveredNodeId);
        }
      } else {
        playSound('click');
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // FPS Calculation
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setFpsCounter(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      // 1. Core Polyhedron Rotation & Pulsing
      coreGroup.rotation.y = elapsedTime * 0.4;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
      outerCore.rotation.z = -elapsedTime * 0.3;
      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.y = -elapsedTime * 0.4;

      const pulseScale = 1.0 + Math.sin(elapsedTime * 2.5) * 0.05;
      innerCore.scale.set(pulseScale, pulseScale, pulseScale);

      // 2. Cyber Wave Grid Dynamic Deformation
      const posAttr = gridGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vz = posAttr.getZ(i);
        const dist = Math.sqrt(vx * vx + vz * vz);
        const wave = Math.sin(dist * 0.8 - elapsedTime * 2.0) * 0.2 * Math.exp(-dist * 0.08);
        posAttr.setY(i, wave);
      }
      posAttr.needsUpdate = true;

      // 3. Orbiting Service Nodes
      nodeGroups.forEach(({ data, group, coreMesh, haloMesh }) => {
        data.orbitAngle += data.orbitSpeed * 0.012;
        const currentAngle = data.orbitAngle;
        const x = Math.cos(currentAngle) * data.orbitRadius;
        const z = Math.sin(currentAngle) * data.orbitRadius;
        const y = data.elevation + Math.sin(elapsedTime * 1.5 + data.orbitRadius) * 0.35;

        group.position.set(x, y, z);
        coreMesh.rotation.x += 0.015;
        coreMesh.rotation.y += 0.02;
        haloMesh.rotation.y -= 0.01;

        // Check if selected
        const isSelected = selectedServiceId === data.id;
        const isHovered = hoveredNodeId === data.id;

        const targetScale = isSelected ? 1.45 : isHovered ? 1.3 : 1.0;
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        if (haloMesh.material instanceof THREE.MeshBasicMaterial) {
          haloMesh.material.opacity = isSelected ? 0.8 : isHovered ? 0.6 : 0.25;
        }
      });

      // 4. Particles drift
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // 5. Smooth Camera Movement with Mouse Parallax
      camera.position.x += (targetMouse.x * 5 - camera.position.x) * 0.04;
      camera.position.y += (4.5 + targetMouse.y * 3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.4, 0);

      // 6. Raycasting for hover tooltip
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0];
        const hitId = hit.object.userData.nodeId;
        if (hitId !== hoveredNodeId) {
          hoveredNodeId = hitId;
          const found = serviceNodesData.find((s) => s.id === hitId);
          if (found) {
            playSound('hover');
            // Project 3D coordinate to 2D screen coordinate
            const vector = hit.point.clone().project(camera);
            const halfWidth = container.clientWidth / 2;
            const halfHeight = container.clientHeight / 2;
            setHoveredNode({
              id: found.id,
              name: found.name,
              tagline: found.tagline,
              x: vector.x * halfWidth + halfWidth,
              y: -(vector.y * halfHeight) + halfHeight,
            });
          }
        }
      } else {
        if (hoveredNodeId !== null) {
          hoveredNodeId = null;
          setHoveredNode(null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);

      // Dispose Three assets
      gridGeometry.dispose();
      gridMaterial.dispose();
      glowPlaneGeo.dispose();
      glowPlaneMat.dispose();
      glowTexture.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      outerCoreGeo.dispose();
      outerCoreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedServiceId, onSelectService]);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] overflow-hidden select-none bg-gradient-to-b from-[#090b10] via-[#0d121f] to-[#090b10]">
      {/* Three.js Canvas mount container */}
      <div id="three-canvas-container" ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing z-0" />

      {/* Cyber Grid background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[300px] h-[250px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top 3D Control HUD Badge */}
      <div className="absolute top-4 left-4 sm:left-8 z-10 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>DEVGRID 3D QUANTUM ENGINE</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">{fpsCounter} FPS</span>
        </div>
      </div>

      {/* Interactive 3D Node Tooltip Billboard */}
      {hoveredNode && (
        <div
          id="node-hover-tooltip"
          className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-4 transition-all duration-150"
          style={{ left: `${hoveredNode.x}px`, top: `${hoveredNode.y}px` }}
        >
          <div className="relative px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-400/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 text-center min-w-[200px] max-w-[280px]">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-0.5">Click Node to Explore</div>
            <div className="text-sm font-bold text-white tracking-wide">{hoveredNode.name}</div>
            <div className="text-[11px] text-slate-300 mt-1 leading-snug">{hoveredNode.tagline}</div>
            <div className="w-2 h-2 bg-cyan-400 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
          </div>
        </div>
      )}

      {/* Bottom 3D Instruction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-400">
        <span className="text-cyan-400 font-bold">⚡ INTERACTIVE 3D:</span>
        <span>Move cursor to orbit • Hover & click floating service nodes</span>
      </div>
    </div>
  );
}
