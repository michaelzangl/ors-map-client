import store from '@/store/store'
import appConfig from '@/config/app-config'

const orsDefinitions = {
  /**
   * Reorder the values of an array of coordinates switching the position of lat and long of each coordinate
   * @param {*} coordinatesArr
   * @returns {Array} of reordered coordinates
   */
  polylineMeasureOptions: (polylineMeasureTranslations) => {
    // eslint-disable-block no-multi-spaces
    const options = {
      // language options
      ...polylineMeasureTranslations,
      // other options
      position: 'topleft', // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
      clearMeasurementsOnStop: true, // Clear all the measurements when the control is unselected
      showBearings: true, // Whether bearings are displayed within the tooltips
      showClearControl: false, // Show a control to clear all the measurements
      clearControlClasses: [], // Classes to apply to clear control button
      showUnitControl: true, // Show a control to change the units of measurements
      distanceShowSameUnit: true, // Keep same unit in tooltips in case of distance less then 1 km/mi/nm
      tempLine: { // Styling settings for the temporary dashed line
        color: '#00f', // Dashed line color
        weight: 5 // Dashed line weight
      },
      fixedLine: { // Styling for the solid line
        color: '#00f', // Solid line color
        weight: 5 // Solid line weight
      },
      startCircle: { // Style settings for circle marker indicating the starting point of the polyline
        color: '#000', // Color of the border of the circle
        weight: 1, // Weight of the circle
        fillColor: '#4caf50', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      },
      intermedCircle: { // Style settings for all circle markers between startCircle and endCircle
        color: '#000', // Color of the border of the circle
        weight: 2, // Weight of the circle
        fillColor: '#2196f3', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      },
      currentCircle: { // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#000', // Color of the border of the circle
        weight: 2, // Weight of the circle
        fillColor: '#000', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      },
      endCircle: { // Style settings for circle marker indicating the last point of the polyline
        color: '#000', // Color of the border of the circle
        weight: 2, // Weight of the circle
        fillColor: '#f44336', // Fill color of the circle
        fillOpacity: 1, // Fill opacity of the circle
        radius: 6 // Radius of the circle
      }
    }
    return options
  },
  /**
   * Build the draw options object
   * @param {*} cantIntersectMsg
   */
  drawOptions (cantIntersectMsg) {
    var options = {
      position: 'topleft',
      draw: {
        polyline: false,
        rectangle: false,
        marker: false,
        circlemarker: false,
        circle: false,
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: cantIntersectMsg // Message that will show when intersect
          },
          shapeOptions: {
            color: 'blue'
          },
          showArea: true,
          showLength: true
        }
      }
    }
    return options
  },

  /**
   * Build map providers array
   */
  getProviders () {
    const defaultTileProvider = store.getters.mapSettings.defaultTileProvider
    let providers = appConfig.mapTileProviders

    // Add custom tile servive if defined in settings
    let mapSettings =  store.getters.mapSettings
    if (mapSettings.customTileProviderUrl && typeof mapSettings.customTileProviderUrl === 'string') {
      const customTileService = [
        {
          name: 'Custom',
          visible: false,
          id: 'custom',
          attribution: 'Custom tile provider defined by the user',
          url: customTileProviderUrl.toString()
        }
      ]
      providers = providers.concat(customTileService)
    }
    let setDefault = false
    for (let key in providers) {
      providers[key].visible = defaultTileProvider === providers[key].id
      setDefault = true
    }
    // In no provider is defined as visible
    // then set the firs one as visible/default
    if (!setDefault) {
      providers[0].visible = true
    }
    return providers
  }
}
export default orsDefinitions
