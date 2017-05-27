var color, windcolor;

windcolor = require('windows-titlebar-color');

color = {
  getColor: () => {
    return windcolor.accentData.ColorizationColor;
  },
  setColor: (...els) => {
    var el, i, index, len, results;
    results = [];
    for (index = i = 0, len = els.length; i < len; index = ++i) {
      el = els[index];
      results.push(pen(el).css("background-color", color.getColor()));
    }
    return results;
  },
  hexToRbg: (hex) => {
    var res;
    res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (res != null) {
      return {
        r: parseInt(res[1], 16),
        g: parseInt(res[2], 16),
        b: parseInt(res[3], 16)
      };
    } else {
      return null;
    }
  },
  rgb: (r, g, b) => {
    return `rgb(${r}, ${g}, ${b})`;
  },
  rgba: (r, g, b, a) => {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  },
  rgbOfWindow: () => {
    windcolor.reload();
    return color.rgb(color.hexToRbg(color.getColor()).r, color.hexToRbg(color.getColor()).g, color.hexToRbg(color.getColor()).b);
  },
  rgbaOfWindow: (num) => {
    windcolor.reload();
    return color.rgba(color.hexToRbg(color.getColor()).r, color.hexToRbg(color.getColor()).g, color.hexToRbg(color.getColor()).b, num);
  }
};

module.exports = color;
