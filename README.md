# Calculating-EVI-SAVI-and-NDVI-in-GEE
code to calculate and compare EVI, NDVI, and SAVI
# 🌿 Vegetation Indices Analysis using Google Earth Engine (EVI & SAVI)

## Overview

This Google Earth Engine (GEE) script performs **vegetation analysis** using **Sentinel-2 satellite imagery** to compute two important vegetation indices:

- **EVI (Enhanced Vegetation Index)**
- **SAVI (Soil Adjusted Vegetation Index)**

It is designed to work over a user-defined **Area of Interest (AOI)** and within a specified **time period**. The script also handles cases where no suitable images are available within the period (e.g., due to cloud cover) and provides key **statistical insights** (mean, max, min) of both indices for agricultural monitoring.

---

## ✳️ Key Features

- Load and filter Sentinel-2 imagery based on AOI and time range.
- Cloud cover filtering (up to 60% cloudiness for more availability).
- Automatic calculation of **EVI and SAVI** indices.
- Compute **mean, max, and min statistics** for both indices to evaluate vegetation health.
- Gracefully handle cases when no images are available (e.g., cloudy season).
- Visualization of **EVI and SAVI maps** over the AOI.

---

## 🔍 Vegetation Indices Explained

| Index | Description | When to Use |
|------|-------------|-------------|
| **EVI** | Enhanced Vegetation Index (better for dense vegetation, corrects atmospheric and canopy effects) | High-density crops, forests |
| **SAVI** | Soil Adjusted Vegetation Index (adjusts for soil brightness, ideal for sparse vegetation) | Drylands, sparse crops |

---

## 📊 Example Output Statistics


⚠️ **Note**: Extremely high or low values may indicate data artifacts (e.g., clouds, shadows, water) — preprocessing and masking are recommended for precise results.

---

## 🌍 Area of Interest (AOI)

- The script uses a predefined AOI uploaded as an Earth Engine asset:  
  `projects/gis306/assets/farm_boundary`

- You can replace this AOI with your own farm boundaries.

---

## 📅 Time Period

- Default: `2023-08-01` to `2023-09-30`
- Adjustable to fit crop monitoring needs.

---

## 🧭 Visualization

- **EVI Map**: Shows vegetation vigor (from stressed to healthy plants).
- **SAVI Map**: Reflects vegetation adjusting for soil brightness (good in dry/sparse areas).

Color scales:
- **EVI**: `['red', 'yellow', 'green']` (red = poor, green = healthy)
- **SAVI**: `['brown', 'yellow', 'green']` (brown = low vegetation, green = dense)

---

## ✅ Usage Instructions

1. Open [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Create a **new script** and **paste the code** from this repository.
3. Make sure your **AOI asset** is properly uploaded.
4. Adjust `startDate` and `endDate` as needed.
5. Run the script and analyze results (maps and stats in the console).

---

## 📦 Requirements

- **Google Earth Engine account**: [Sign up here](https://signup.earthengine.google.com/).
- Uploaded **farm boundary shapefile/asset** to GEE as `projects/gis306/assets/farm_boundary`.
- Basic familiarity with **GEE JavaScript API**.

---

## 🚀 Future Improvements

- Add **cloud and shadow masking** using Sentinel-2 QA bands (e.g., `QA60`).
- Export EVI/SAVI maps and statistics as CSV for offline analysis.
- Integrate **time-series analysis** for crop monitoring over growing seasons.

---

## 🙌 Acknowledgments

- [Google Earth Engine](https://earthengine.google.com/)
- [Sentinel-2](https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-2)

---

## 📬 Contact

For questions or collaborations, feel free to reach out via [GitHub Issues](https://github.com/your-repo/issues) or email.
