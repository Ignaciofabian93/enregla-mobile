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
              transform: scaleX(-1) rotate(90deg);
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
              width: 64px;
              height: auto;
              margin-bottom: 2px;
            }
            .vin, .plate {
            text-transform: uppercase; /* Ensure uppercase */
            }
            .vin {
              font-size: 14px;
              font-weight: 400;
              margin: 2mm 0;
              transform: scaleY(1.4); 
            }
            .plate {
              font-size: 32px;
              font-weight: 600;
              transform: scaleY(1.4); 
            }
          </style>
        </head>
        <body>
          <div class="label-container">
          ${logo ? `<img src="${logo}" class="logo" alt="logo" />` : ""}
          ${vin ? `<div class="vin">${vin.toUpperCase()}</div>` : ""}
          ${plate ? `<div class="plate">${plate.toUpperCase()}</div>` : ""}
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
              padding: 24px;
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
            }
            .header span {
              display: block;
              margin-bottom: 5px;
              font-size: 14px;
              font-weight: 400;
              color: #555;
              line-height: 1.2;
              text-align: left;
              width: 100%;
            }
            .label-container {
              width: 100%;
              max-width: 210mm; /* A4 width */
              margin: 0 auto;
              padding: 12px 16px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              border-radius: 8px;
              background-color: #f9f9f9;
            }
            .item {
              margin-bottom: 6px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 4px 0;
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
            <span>Fecha: ${moment().format("DD-MM-YYYY")}</span>
            <span>Solicitud de insumos de sucursal ubicada en ${branch} por ${operator}.</span>
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
