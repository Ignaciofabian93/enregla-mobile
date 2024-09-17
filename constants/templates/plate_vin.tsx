export function PlateVinTemplate({ plate, vin }: { plate: string; vin: string }) {
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
          .vin-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            width: 100%;
            height: 10mm;
            margin-bottom: 2mm;
            overflow: hidden;
            white-space: nowrap;
          }
          .plate-container {
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
          .vin {
            font-size: 9mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 98%;
            overflow: hidden;
            white-space: nowrap;
          }
          .plate {
            font-size: 20mm;
            font-weight: 400;
            text-transform: uppercase;
            text-align: center;
            width: 98%;
            overflow: hidden;
            white-space: nowrap;
          }
        </style>
      </head>
      <body>
        <div class="top">
          <span class="left">${" . "}</span>
        </div>
        <div class="vin-container">
          <span class="left">${" . "}</span>
          <span class="vin">${vin.toUpperCase()}</span>
          <span class="right">${" . "}</span>
        </div>
        <div class="plate-container">
          <span class="left">${" . "}</span>
          <span class="plate">${plate.toUpperCase()}</span>
          <span class="right">${" . "}</span>
        </div>
        <div class="bottom">
          <span class="right">${" . "}</span>
        </div>
      </body>
    </html>`;
}
