const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
const EventEmitter = require("events");
const emitter = new EventEmitter();

let latestData = {}; // Store the latest data here

app.post("/receive", (req, res) => {
  latestData = req.body;
  console.log("Data received: ", latestData);
  emitter.emit("dataUpdate");
  res.json({ message: "Data received successfully" });
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Send data to the client
  const sendLatestData = () => {
    if (Object.keys(latestData).length !== 0) {
      res.write(`data: ${JSON.stringify(latestData)}\n\n`);
    }
  };

  // Send latest data immediately if available
  sendLatestData();

  // Update client whenever new data is received
  const onDataUpdate = () => sendLatestData();
  emitter.on("dataUpdate", onDataUpdate);

  // Clean up
  req.on("close", () => {
    emitter.removeListener("dataUpdate", onDataUpdate);
  });
});

const port = 3005;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
