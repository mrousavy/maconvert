#!/usr/bin/env node

const convert = require('convert-svg-to-png');
const fs = require('fs');
const svgDimension = require('svg-dimensions');

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

process.argv.forEach((argument, index) => {
  console.log(`Processing ${argument}..`);
  if (argument.endsWith('.svg') && fs.existsSync(argument)) {
    svgDimension.get(argument, async (err, dimensions) => {
      if (err) {
        console.log(err);
      } else {
        const options = {
          width: dimensions.width * 10,
          height: dimensions.height * 10
        };
        const outputFilePath = await convert.convertFile(argument, options);
        console.log(`Converted ${argument} to ${outputFilePath}!`);
      }
    });
  } else {
    console.log('Not a .svg file!');
  }
});
