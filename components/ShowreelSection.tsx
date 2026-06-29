import Image from "next/image";

export function ShowreelSection() {
  return (
    <section
      style={{
        width: "100%",
        display: "block", // No extra flex spacing
        lineHeight: 0, // Removes tiny space below inline images
        position: "relative",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/Video/showreel.mp4" type="video/mp4" />
        </video>

        {/* Minimal centered text over the video exactly like Daima */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(24px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1, // Fixes baseline for vertical-align super
            }}
          >
            Forward Studio<span style={{ fontSize: "0.5em", verticalAlign: "super" }}>®</span>
          </span>
        </div>
      </div>
    </section>
  );
}
