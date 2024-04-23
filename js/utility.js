function decimalToRgb(decimal) {
      let red = (decimal >> 8) & 0xff;
      let green = (decimal >> 4) & 0xff;
      let blue = decimal & 0xff;
      return 'rgb('+red+','+green+','+blue+')';
  }