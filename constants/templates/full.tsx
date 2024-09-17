export function FullTemplate({ logo, vin, plate }: { logo: string; vin: string; plate: string }) {
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
            transform: scaleX(-1);
            transform-origin: center;
          }
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            width: 100%;
            height: 35mm;
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
            margin-bottom: 1mm;
            overflow: hidden;
            white-space: nowrap;
          }
          .vin {
            font-size: 14mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 1mm;
            width: 98%;
            overflow: hidden;
            white-space: nowrap;
          }
          .plate {
            font-size: 24mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 98%;
            margin-bottom: 1mm;
            overflow: hidden;
            white-space: nowrap;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <span class="left">${" . "}</span>
          <img src="${logo}" class="logo" alt="logo" />
          <span class="right">${" . "}</span>
        </div>
        <div class="container">
          <span class="left">${" . "}</span>
          <span class="vin">${vin.toUpperCase()}</span>
          <span class="right">${" . "}</span>
        </div>
        <div class="container">
          <span class="left">${" . "}</span>
          <span class="plate">${plate.toUpperCase()}</span>
          <span class="right">${" . "}</span>
        </div>
      </body>
    </html>`;
}
