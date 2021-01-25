import React from "react";

export default function LoadingAnimation() {
  const ellipsePath = document.getElementById("ellipsePath");
  console.log(ellipsePath);
  const ellipsePathLength = ellipsePath.getTotalLength();
  ellipsePath.style.strokeDasharray = `${ellipsePathLength}`;

  return (
    <div>
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1" fill="white">
          <path d="M500 248C500 385.519 388.519 497 251 497C113.481 497 2 385.519 2 248C2 110.481 113.481 -1 251 -1C388.519 -1 500 110.481 500 248ZM151.4 248C151.4 303.008 195.992 347.6 251 347.6C306.008 347.6 350.6 303.008 350.6 248C350.6 192.992 306.008 148.4 251 148.4C195.992 148.4 151.4 192.992 151.4 248Z" />
        </mask>
        <path
          id="#ellipsePath"
          style={{
            animation: "dash 5s linear",
            "@keyframes dash": { to: { strokeDashOffset: "1000" } },
          }}
          d="M500 248C500 385.519 388.519 497 251 497C113.481 497 2 385.519 2 248C2 110.481 113.481 -1 251 -1C388.519 -1 500 110.481 500 248ZM151.4 248C151.4 303.008 195.992 347.6 251 347.6C306.008 347.6 350.6 303.008 350.6 248C350.6 192.992 306.008 148.4 251 148.4C195.992 148.4 151.4 192.992 151.4 248Z"
          fill="black"
        />
      </svg>
    </div>
  );
}
