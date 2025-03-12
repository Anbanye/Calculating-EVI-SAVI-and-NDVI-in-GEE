
// ----------------------------------------------
// DEFINE AREA OF INTEREST (AOI) & TIME PERIOD
// ----------------------------------------------
var aoi = ee.FeatureCollection('projects/gis306/assets/farm_boundary');
var startDate = '2023-08-01';
var endDate = '2023-09-30';

// ----------------------------------------------
// LOAD SENTINEL-2 DATA WITH RELAXED FILTERING
// ----------------------------------------------
var sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate(startDate, endDate)
  .filterBounds(aoi)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 60));  // Adjusted for better availability

// DEBUG: Check if images exist
print('Filtered Sentinel-2 Collection:', sentinel2);
print('Number of images:', sentinel2.size());

// ----------------------------------------------
// FUNCTION TO CALCULATE EVI & SAVI
// ----------------------------------------------
var addIndices = function(image) {
  var evi = image.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': image.select('B8'),
      'RED': image.select('B4'),
      'BLUE': image.select('B2')
    }).rename('EVI');

  var savi = image.expression(
    '((NIR - RED) / (NIR + RED + L)) * (1 + L)', {
      'NIR': image.select('B8'),
      'RED': image.select('B4'),
      'L': 0.5
    }).rename('SAVI');

  return image.addBands([evi, savi]);
};

// ----------------------------------------------
// MAP INDEX CALCULATION
// ----------------------------------------------
var sentinel2WithIndices = sentinel2.map(addIndices);

// ----------------------------------------------
// CHECK IF COLLECTION IS EMPTY AND HANDLE LOGIC
// ----------------------------------------------
var collectionSize = sentinel2.size();

collectionSize.evaluate(function(size) {
  if (size === 0) {
    // ----------------------------------------------
    // CASE: NO IMAGES FOUND — Handle gracefully
    // ----------------------------------------------
    print('⚠️ No Sentinel-2 images found for the selected date range and AOI.');
    Map.centerObject(aoi, 12);
    Map.addLayer(aoi, {}, 'AOI');
  } else {
    // ----------------------------------------------
    // CASE: IMAGES FOUND — Proceed with processing
    // ----------------------------------------------

    // Composite and clip to AOI
    var composite = sentinel2WithIndices.median().clip(aoi);
    
    // ----------------------------------------------
    // CALCULATE EVI & SAVI STATISTICS
    // ----------------------------------------------
    var calculateStats = function(image, bandName, geometry, scale) {
      return image.select(bandName).reduceRegion({
        reducer: ee.Reducer.mean().combine({
          reducer2: ee.Reducer.max(),
          sharedInputs: true
        }).combine({
          reducer2: ee.Reducer.min(),
          sharedInputs: true
        }),
        geometry: geometry,
        scale: scale,
        maxPixels: 1e13
      });
    };
    
    // Calculate statistics for EVI and SAVI
    var eviStats = calculateStats(composite, 'EVI', aoi, 10);
    var saviStats = calculateStats(composite, 'SAVI', aoi, 10);

    // Print statistics
    print('✅ EVI Statistics (Mean, Max, Min):', eviStats);
    print('✅ SAVI Statistics (Mean, Max, Min):', saviStats);

    // ----------------------------------------------
    // VISUALIZE EVI & SAVI
    // ----------------------------------------------
    Map.centerObject(aoi, 12);  // Zoom to AOI

    Map.addLayer(
      composite.select('EVI'),
      {min: -1, max: 1, palette: ['red', 'yellow', 'green']},
      'EVI'
    );

    Map.addLayer(
      composite.select('SAVI'),
      {min: -1, max: 1, palette: ['brown', 'yellow', 'green']},
      'SAVI'
    );
  }
});
