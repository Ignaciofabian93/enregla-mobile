export function LogoTemplate({ logo }: { logo: string }) {
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
          }
        </style>
      </head>
      <body>
        <img src="${logo}" class="logo" alt="logo" />
      </body>
    </html>`;
}
