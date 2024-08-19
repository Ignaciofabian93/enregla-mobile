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
