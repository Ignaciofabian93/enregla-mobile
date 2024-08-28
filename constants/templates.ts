import moment from "moment";

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
  branch: string;
  operator: string;
};

export function SupplyRequest({
  acid,
  paper,
  yellowCatalyzer,
  blueCatalyzer,
  woodSticks,
  pen,
  penBattery,
  branch,
  operator,
}: SupplyRequest) {
  return `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 30px;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              font-size: 12px;
              line-height: 1.4;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              color: #333;
            }
            .header {
              margin-bottom: 20px;
              font-size: 18px;
              font-weight: 600;
              text-align: center;
              color: #222;
            }
            .label-container {
              width: 100%;
              max-width: 210mm; /* A4 width */
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              border-radius: 8px;
              background-color: #f9f9f9;
            }
            .item {
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .item:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #555;
            }
            .value {
              color: #000;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="header">
            Fecha: ${moment().format("DD-MM-YYYY")}<br />
            Solicitud de insumos de sucursal ubicada en ${branch} por operador ${operator}.
          </div>
          <div class="label-container">
            <div class="item"><span class="label">Ácido:</span> <span class="value">${acid}</span></div>
            <div class="item"><span class="label">Rollos de papel:</span> <span class="value">${paper}</span></div>
            <div class="item"><span class="label">Catalizador amarillo:</span> <span class="value">${yellowCatalyzer}</span></div>
            <div class="item"><span class="label">Catalizador azul:</span> <span class="value">${blueCatalyzer}</span></div>
            <div class="item"><span class="label">Paletas de madera:</span> <span class="value">${woodSticks}</span></div>
            <div class="item"><span class="label">Lápiz:</span> <span class="value">${pen}</span></div>
            <div class="item"><span class="label">Batería lápiz:</span> <span class="value">${penBattery}</span></div>
          </div>
        </body>
      </html>`;
}
