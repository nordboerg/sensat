const fs = require("fs");
const es = require("event-stream");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  const stream = fs
    .createReadStream("../data/sensor_readings.json")
    .pipe(es.split())
    .pipe(
      es
        .mapSync((line) => {
          stream.pause();

          if (line.trim()) {
            ws.send(line);
          }

          stream.resume();
        })
        .on("error", (err) => console.log("Error while reading file.", err))
        .on("end", () => {
          console.log("Read entire file.")
          ws.close()
        })
    );
});
