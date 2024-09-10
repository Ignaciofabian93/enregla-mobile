export function VinLogoTemplate({ vin, logo }: { vin: string; logo: string }) {
  return `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
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
          .vin {
            font-size: 6mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
          }
        </style>
      </head>
      <body>
        <img src="${logo}" class="logo" alt="logo" />
        <div class="vin">${vin.toUpperCase()}</div>
      </body>
    </html>`;
}
