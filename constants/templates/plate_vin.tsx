export function PlateVinTemplate({ plate, vin }: { plate: string; vin: string }) {
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
          .vin {
            font-size: 6mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 5mm;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
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
        <div class="vin">${vin.toUpperCase()}</div>
        <div class="plate">${plate.toUpperCase()}</div>
      </body>
    </html>`;
}
