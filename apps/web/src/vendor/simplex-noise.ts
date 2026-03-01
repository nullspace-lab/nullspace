export function createNoise3D() {
  return (x: number, y: number, z: number) => {
    const s1 = Math.sin(x * 1.37 + z * 0.21);
    const s2 = Math.sin(y * 1.13 - z * 0.29);
    const s3 = Math.sin((x + y + z) * 0.31);
    const c1 = Math.cos((x - y) * 0.47 + z * 0.17);
    return (s1 + s2 + s3 + c1) * 0.25;
  };
}
