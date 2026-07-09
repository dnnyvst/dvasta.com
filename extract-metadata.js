/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const ExifReader = require("exifreader");

const HORIZONTAL = ["1093", "2111", "2235", "7549", "7624", "8126", "8288"];
const VERTICAL = [
  "0391",
  "1028",
  "8119",
  "8165",
  "8175",
  "8193",
  "8287",
  "1665",
  "1689",
];

const ddtodms = (dd, ref) => {
  const original = parseFloat(dd);
  const absolute = Math.abs(original);

  const d = Math.floor(absolute);

  const m = (absolute - d) * 60;
  const mTruncated = Math.floor(m);

  const s = parseFloat((m - mTruncated) * 60);

  const degrees = String(d).padStart(2, "0");
  const minutes = String(mTruncated).padStart(2, "0");
  const seconds = s.toFixed(s < 10 ? 3 : 2);

  const refString = String(ref).toLowerCase();
  const direction = refString.includes("north")
    ? "N"
    : refString.includes("south")
      ? "S"
      : refString.includes("east")
        ? "E"
        : "W";

  return { degrees, minutes, seconds, direction };
};

async function extractMetadata() {
  const metadata = {};

  for (const num of [...HORIZONTAL, ...VERTICAL]) {
    const folder = "for-metadata";
    const filePath = path.join(
      __dirname,
      "public",
      "cameraroll",
      folder,
      `IMG_${num}.${num === "8193" ? "jpg" : "heic"}`,
    );

    try {
      const tags = await ExifReader.load(filePath);
      if (num === "8193") {
        console.log(tags);
      }
      metadata[num] = {
        date: {
          date:
            num === "8193"
              ? "2024:07:26"
              : tags["DateTimeOriginal"]?.description,
          coords: "",
        },
        latitude: ddtodms(
          tags["GPSLatitude"]?.description,
          tags["GPSLatitudeRef"]?.description,
        ),
        longitude: ddtodms(
          tags["GPSLongitude"]?.description,
          tags["GPSLongitudeRef"]?.description,
        ),
        model: tags["Model"]?.description,
        exposureTime: tags["ExposureTime"]?.description,
        fNumber: tags["FNumber"]?.description,
        meteringMode: tags["MeteringMode"]?.description,
        focalLength: `${parseFloat(tags["FocalLength"]?.description).toFixed(2)} mm`,
        colorSpace: tags["Color Space"]?.description,
        colorProfile: tags["ICC Description"]?.description,
      };
    } catch (e) {
      console.error(e);
      metadata[num] = null;
    }
  }

  fs.writeFileSync(
    path.join(__dirname, "public", "image-metadata.json"),
    JSON.stringify(metadata, null, 2),
  );
}

extractMetadata();
