export function LogoTemplate({ logo }: { logo: string }) {
  return `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-family: Arial, sans-serif;
            height: 100%;
            width: 100%;
            transform: scaleX(-1) rotate(90deg);
            transform-origin: center;
          }
          .logo-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            width: 100%;
            height: 36mm;
            margin-bottom: 2mm;
            overflow: hidden;
            white-space: nowrap;
          }
          .top {
            font-size: 0.5mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 100%;
            height: 20mm;
            overflow: hidden;
            white-space: nowrap;
          }
          .bottom {
            font-size: 0.5mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 100%;
            height: 20mm;
            overflow: hidden;
            white-space: nowrap;
          }
          .left {
            font-size: 0.5mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 1%;
            overflow: hidden;
            white-space: nowrap;
          }
          .right {
            font-size: 0.5mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 1%;
            overflow: hidden;
            white-space: nowrap;
          }
          .logo {
            width: 35mm;
            height: 35mm;
            overflow: hidden;
            white-space: nowrap;
          }
        </style>
      </head>
      <body>
        <div class="top">
          <span class="left">${" . "}</span>
        </div>
        <div class="logo-container">
          <span class="left">${" . "}</span>
          <img src="${logo}" class="logo" alt="logo" />
          <span class="right">${" . "}</span>
        </div>
        <div class="bottom">
          <span class="right">${" . "}</span>
        </div>
      </body>
    </html>`;
}
