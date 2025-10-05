import React, { useEffect, useRef } from "react";
async function sha256(message: string) {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message))
    )
  )
    .map((b) => ("00" + b.toString(16)).slice(-2))
    .join("");
}
const colors = ["rgb(156 39 176)", "rgb(103 222 162)"];
export const Avatar: React.FC<{ name: string; size: number }> = ({
  name,
  size,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    async function drawAvatar(size: number) {
      const input = name;
      const sizeAvatar = size;
      ref.current!.width = sizeAvatar;
      ref.current!.height = sizeAvatar;

      const canvas = ref!.current as HTMLCanvasElement;
      const s = ref.current!.height / 5;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const m = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const hash = (await sha256(input)).substr(0, m.length * m[0].length);

      for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
          const n = parseInt(hash.substr(i * j + j, 1), 16);
          m[i][j] = n > 7 ? 0 : 1;
        }
      }

      for (let i = 0; i < m.length; i++) {
        for (
          let j = Math.round(m[i].length / 2), k = 2;
          j < m[i].length;
          j++, k += 2
        ) {
          m[i][j] = m[i][j - k];
        }
      }

      drawMatrix(m);
      function drawMatrix(m: number[][]) {
        const getColor = () =>
          colors.at(Math.floor(Math.random() * colors.length));

        ctx.fillStyle = getColor() as string;

        for (let i = 0; i < m.length; i++) {
          for (let j = 0; j < m[i].length; j++) {
            if (m[i][j] === 1) {
              ctx.fillRect(j * s, i * s, s, s);
            }
          }
        }
      }
    }
    drawAvatar(size);
  }, []);
  return (
    <div style={{ height: size, width: size, cursor: "pointer" }}>
      <canvas ref={ref}></canvas>
    </div>
  );
};
