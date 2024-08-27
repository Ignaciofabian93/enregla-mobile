type Template = {
  vin: string;
  plate: string;
  logo: string;
};

export function PrintTemplate({ vin, logo, plate }: Template) {
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
              transform: scaleX(-1) rotate(-270deg);
              transform-origin: center;
            }
            .label-container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 105mm;
              height: 74mm;
            }
            .logo {
              width: 100px;
              height: 100px;
            }
            .vin {
              font-size: 12px;
              font-weight: 400;
              margin: 10px 0;
            }
            .plate {
              font-size: 24px;
              font-weight: 700;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="label-container">
          ${logo ? `<img src="${logo}" class="logo" alt="logo" />` : ""}
          ${vin ? `<div class="vin">${vin}</div>` : ""}
          ${plate ? `<div class="plate">${plate}</div>` : ""}
          </div>
        </body>
      </html>`;
}

type SupplyRequest = {
  acid: number;
  paper: number;
  yellowCatalyzer: number;
  blueCatalyzer: number;
  woodSticks: number;
  pen: number;
  penBattery: number;
};

export function SupplyRequest({ acid, paper, yellowCatalyzer, blueCatalyzer, woodSticks, pen, penBattery }: SupplyRequest) {
  return `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 1.6;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
            }
            .label-container {
              width: 100%;
              max-width: 210mm; /* A4 width */
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #000;
              box-sizing: border-box;
            }
            .item {
              margin-bottom: 12px;
            }
            .item span.label {
              font-weight: bold;
              margin-right: 10px;
            }
          </style>
        </head>
        <body>
          <div class="label-container">
            <div class="item"><span class="label">Ácido:</span> ${acid}</div>
            <div class="item"><span class="label">Rollos de papel:</span> ${paper}</div>
            <div class="item"><span class="label">Catalizador amarillo:</span> ${yellowCatalyzer}</div>
            <div class="item"><span class="label">Catalizador azul:</span> ${blueCatalyzer}</div>
            <div class="item"><span class="label">Paletas de madera:</span> ${woodSticks}</div>
            <div class="item"><span class="label">Lápiz:</span> ${pen}</div>
            <div class="item"><span class="label">Batería lápiz:</span> ${penBattery}</div>
          </div>
        </body>
      </html>`;
}
