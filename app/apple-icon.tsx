import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS: the same contour mark as app/icon.svg, without transparency. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#24466B",
      }}
    >
      <svg width="132" height="132" viewBox="8 8 48 48">
        <path
          d="M34.5 15c9.5-1 17 6 18 15.5 1 10-6 18.5-15.5 19.5-8.5 1-17.5-3.5-20-12.5-2.5-8.5 1-16 6-19.5 3.5-2.2 7.6-2.7 11.5-3Z"
          fill="none"
          stroke="#A9C8E8"
          strokeWidth="3"
        />
        <path
          d="M36 25c4.5-.3 7.8 3 7.6 7.4-.2 4.5-3.6 7.4-7.6 7.3-4.2-.1-7-3.2-6.7-7.2.3-4 2.8-7.2 6.7-7.5Z"
          fill="#A9C8E8"
        />
      </svg>
    </div>,
    size,
  );
}
