import moment from "moment";

type Template = {
  vin: string | null;
  plate: string | null;
  logo: string | null;
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
              transform: scaleX(-1)
              transform-origin: center;
            }
            .label-container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 105mm; /* Fixed width for A7 size */
              height: 74mm; /* Fixed height for A7 size */
              box-sizing: border-box;
            }
            .logo {
              width: 50px;
              height: auto;
              margin-bottom: 5px;
            }
            .vin, .plate {
              text-transform: uppercase; /* Ensure uppercase */
            }
            .vin {
              font-size: 12px;
              font-weight: 400;
              margin-bottom: 10px;
              transform: scaleY(1.4);
              }
            .plate {
              font-size: 28px;
              font-weight: 500;
              display: flex;
              justify-content: center;
              align-items: center;
              transform: scaleY(1.5);
              margin-bottom: 5px;
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

export function PrintTemplate2({ vin, logo, plate }: Template) {
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
            transform: scaleX(-1) rotate(90deg); // Rotate for landscape orientation
            transform-origin: center;
          }
          .label-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 207px; // Fixed width for A7 size
            height: 300px; // Fixed height for A7 size
            box-sizing: border-box;
            border: 1px solid transparent; // Optional border for visualization
          }
          .logo {
            width: 40px;
            height: 40px; // Fix the height to reserve space
            margin-bottom: 5px;
            background: #fff; // Placeholder background if needed
            min-width: 40px;
            min-height: 40px;
          }
          .vin, .plate {
            text-transform: uppercase;
          }
          .vin {
            font-size: 8px; // Adjusted size to fit better
            font-weight: 400;
            margin-bottom: 8px;
            transform: scaleY(1.1); // Adjusted scaling
            min-height: 10px;
            min-width: 120px;
          }
          .plate {
            min-width: 100px;
            min-height: 14px;
            font-size: 18px; // Adjusted size for plate
            font-weight: 600;
            transform: scaleY(1.1);
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="label-container">
          ${logo ? `<img src="${logo}" class="logo" alt="logo" />` : '<div class="logo"></div>'}
          ${vin ? `<div class="vin">${vin.toUpperCase()}</div>` : '<div class="vin" style="visibility: hidden;"></div>'}
          ${plate ? `<div class="plate">${plate.toUpperCase()}</div>` : '<div class="plate" style="visibility: hidden;"></div>'}
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
