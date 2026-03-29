const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Devices</title>
      <style>
        body {
          margin: 0;
          padding: 24px;
          font-family: Arial, sans-serif;
          background: #f5f5f5;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }

        th {
          background: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <table id="devicesTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Device ID</th>
            <th>Latest Temp</th>
            <th>Latest Status</th>
            <th>Overheat</th>
            <th>Last Seen At</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <script>
        async function loadDevices() {
          try {
            const response = await fetch("https://smart-copra-api.vercel.app/api/devices");
            const result = await response.json();

            const tbody = document.querySelector("#devicesTable tbody");
            tbody.innerHTML = "";

            if (result.success && Array.isArray(result.data)) {
              result.data.forEach(function(device) {
                const row = document.createElement("tr");

                row.innerHTML =
                  "<td>" + (device.id ?? "") + "</td>" +
                  "<td>" + (device.device_id ?? "") + "</td>" +
                  "<td>" + (device.latest_temp ?? "") + "</td>" +
                  "<td>" + (device.latest_status ?? "") + "</td>" +
                  "<td>" + (device.overheat ?? "") + "</td>" +
                  "<td>" + (device.last_seen_at ?? "") + "</td>" +
                  "<td>" + (device.created_at ?? "") + "</td>" +
                  "<td>" + (device.updated_at ?? "") + "</td>";

                tbody.appendChild(row);
              });
            }
          } catch (error) {
            console.error("Failed to load devices:", error);
          }
        }

        loadDevices();
      </script>
    </body>
    </html>
  `);
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
  });
}

module.exports = app;