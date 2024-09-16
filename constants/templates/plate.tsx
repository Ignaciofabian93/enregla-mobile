export function PlateTemplate({ plate }: { plate: string }) {
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
            width: 28mm;
            height: 28mm;
            margin-bottom: 3mm;
            overflow: hidden;
            white-space: nowrap;
            visibility: hidden; /* Invisible spacer for consistent layout */
          }
          .vin {
            font-size: 6mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 3mm;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            visibility: hidden; /* Invisible spacer for consistent layout */
          }
          .plate {
            font-size: 10mm;
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
        <div class="logo" alt="logo"> </div>
        <div class="vin"> </div>
        <div class="plate">${plate.toUpperCase()}</div>
      </body>
    </html>`;
}
