import { useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");

  const handleGenerateQrCode = (value) => {
    setQrCode(input);
  };

  return (
    <>
      <main className="h-full flex space-around align-center direction-col">
        <section className="">
          <h1 className="text-3xl m-10">QR Code Generator</h1>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter something..."
            className="h-30px w-30px text-base p-5 m-5"
          />
          <button
            onClick={handleGenerateQrCode}
            disabled={input && input.trim() !== "" ? false : true}
            className="text-base border radius-3 cursor-pointer p-5 m-5"
          >
            submit
          </button>
        </section>
        <section>
          <QRCode value={qrCode} size={400} bgColor="white" />
        </section>
      </main>
    </>
  );
}

export default App;
