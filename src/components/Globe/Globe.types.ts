export interface GlobeMarker {
  location: [number, number];
  size?: number;
  color?: [number, number, number];
  label?: string;
}

export interface GlobeProps {
  size?: number;
  dark?: boolean;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  markers?: GlobeMarker[];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  phi?: number;
  theta?: number;
  glow?: boolean;
  className?: string;
}
