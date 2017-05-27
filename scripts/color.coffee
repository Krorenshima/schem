windcolor = require 'windows-titlebar-color'

color =
  getColor: () => windcolor.accentData.ColorizationColor
  setColor: (els...) =>
    for el, index in els
      pen(el).css("background-color", color.getColor())

  hexToRbg: (hex) =>
    res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return if res? then r: parseInt(res[1], 16), g: parseInt(res[2], 16), b: parseInt(res[3], 16) else null

  rgb: (r, g, b) => "rgb(#{r}, #{g}, #{b})",
  rgba: (r, g, b, a) => "rgba(#{r}, #{g}, #{b}, #{a})",
  rgbOfWindow: () =>
    windcolor.reload()
    return color.rgb(color.hexToRbg(color.getColor()).r, color.hexToRbg(color.getColor()).g, color.hexToRbg(color.getColor()).b)
  rgbaOfWindow: (num) =>
    windcolor.reload()
    return color.rgba(color.hexToRbg(color.getColor()).r, color.hexToRbg(color.getColor()).g, color.hexToRbg(color.getColor()).b, num)

module.exports = color
