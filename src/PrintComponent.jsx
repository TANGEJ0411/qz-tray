import qz from "qz-tray";

// qz.io/wiki
const PrintComponent = () => {
  const dataHTML = [
    {
      type: "pixel",
      format: "html",
      flavor: "plain",
      data: "<h1> 這是一個測試列印 </h1>",
    },
  ];
  const dataPDF = [
    {
      type: "pixel",
      format: "pdf",
      flavor: "file",
      data: "assets/2024-02-15.pdf",
    },
  ];
  const dataImage = [
    {
      type: "pixel",
      format: "image",
      flavor: "file",
      data: "https://truth.bahamut.com.tw/s01/202310/75c96fd41013a2d72f4b1e7a5538a496.JPG",
    },
  ];
  const qztrayPrint = async () => {
    if (!qz.websocket.isActive()) {
      try {
        await qz.websocket.connect({ retries: 5, delay: 1 });
        const printer = await qz.printers.find("EPSON");
        // create 可傳入兩個參數，第一個是印表機名稱，第二個是印表機config物件參數
        // const config = qz.configs.create(printer,
        // 範例      {size: {width: 2.25, height: 1.25}, units: 'in',  colorType: 'grayscale', interpolation: "nearest-neighbor" });
        const config = qz.configs.create(printer);
        await qz.print(config, dataImage);
        qz.websocket.disconnect();
      } catch (error) {
        console.error("Error connecting to QZ Tray:", error);
        qz.websocket.disconnect();
      }
    }
  };

  return (
    <div>
      <h2>Print Component</h2>
      <button onClick={qztrayPrint}>Print</button>
    </div>
  );
};

export default PrintComponent;

// config物件參數
// orientation : null (auto) | "landscape" | "portrait" | "reverse-landscape"
// size : {width: 2.25, height: 1.25} | {width: 2.25, height: 1.25, units: 'in'} units : "in" | "cm" | "mm" metric sizes are supported
// margins : {top: 0.25, right: 0.25, bottom: 0.25, left: 0.25}
// interpolation: "nearest-neighbor"
// density : {units: "in", density: "600" }  // force 600dpi
// copies : { copies: 4 } // print 4 copies
// colorType : { colorType: "grayscale" } // or "color", "blackwhite"
// Custom Job Name : { jobName: "Receipt #123456" }
