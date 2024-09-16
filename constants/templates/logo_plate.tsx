export function LogoPlateTemplate({ logo, plate }: { logo: string; plate: string }) {
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
          .logo {
            width: 35mm;
            height: 35mm;
            margin-bottom: 5mm;
          }
          .plate {
            font-size: 12mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <img src="${logo}" class="logo" alt="logo" />
        <div class="plate">${plate.toUpperCase()}</div>
      </body>
    </html>`;
}