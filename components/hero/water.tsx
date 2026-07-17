"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;

    /* Лёгкая рябь: три наложенных волны разного масштаба */
    float e = sin(p.x * 0.9 + uTime * 0.55) * 0.18;
    e += sin(p.y * 1.4 - uTime * 0.4) * 0.13;
    e += sin((p.x + p.y) * 2.6 + uTime * 0.9) * 0.06;
    p.z += e;

    vElevation = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uGlint;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    /* Дневная вода: от морской дымки к светлой бирюзе у «горизонта» */
    vec3 color = mix(uDeep, uShallow, vUv.y * 0.9 + vElevation * 1.2);

    /* Солнечный белый блик на гребнях, сильнее к правому краю */
    float glint = smoothstep(0.1, 0.28, vElevation) * (0.3 + vUv.x * 0.6);
    color = mix(color, uGlint, glint * 0.5);

    /* Растворяемся в фоне к дальнему краю */
    float alpha = smoothstep(1.0, 0.55, vUv.y);
    gl_FragColor = vec4(color, alpha);
  }
`;

/* Палитры воды по темам: дневная бирюза / закатная глубина */
const WATER_COLORS = {
  light: { deep: "#c3dbe8", shallow: "#8ec4d6", glint: "#ffffff" },
  dark: { deep: "#0a1420", shallow: "#1a3548", glint: "#e8a860" },
};

function useTheme(): keyof typeof WATER_COLORS {
  const [theme, setTheme] = useState<keyof typeof WATER_COLORS>("light");
  useEffect(() => {
    const read = () =>
      setTheme(
        document.documentElement.dataset.theme === "dark" ? "dark" : "light"
      );
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);
  return theme;
}

function WaterPlane({ still, theme }: { still: boolean; theme: keyof typeof WATER_COLORS }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color(WATER_COLORS.light.deep) },
      uShallow: { value: new THREE.Color(WATER_COLORS.light.shallow) },
      uGlint: { value: new THREE.Color(WATER_COLORS.light.glint) },
    }),
    []
  );

  useEffect(() => {
    const c = WATER_COLORS[theme];
    uniforms.uDeep.value.set(c.deep);
    uniforms.uShallow.value.set(c.shallow);
    uniforms.uGlint.value.set(c.glint);
  }, [theme, uniforms]);

  useFrame((_, delta) => {
    if (!still && mat.current) mat.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -1.1, 0]}>
      <planeGeometry args={[34, 18, 96, 96]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/** Фоновая вода героя: тихая рябь Three.js, статична при prefers-reduced-motion,
    палитра следует за data-theme */
export function Water() {
  const reduce = useReducedMotion() ?? false;
  const theme = useTheme();
  return (
    <Canvas
      className="pointer-events-none"
      camera={{ position: [0, 1.7, 6.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduce ? "demand" : "always"}
    >
      <WaterPlane still={reduce} theme={theme} />
    </Canvas>
  );
}
