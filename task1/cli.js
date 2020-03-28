const fs = require('fs');
const { pipeline, Transform } = require('stream');
const program = require('commander');
const cipherCaesar = require('./components/cipherCaesar');

program
  .requiredOption('-s, --shift <number>', 'shift', value => parseInt(value, 10))
  .requiredOption('-a, --action [type],', 'action type encode/decode')
  .option('-i, --input <filename>', 'input file')
  .option('-o, --output <filename>', 'output file');
program.parse(process.argv);

let inStream;
let outStream;

if (program.input) {
  inStream = fs.createReadStream(program.input);
} else {
  inStream = process.stdin;
}

if (program.output) {
  outStream = fs.createWriteStream(program.output, { flags: 'a' });
} else {
  outStream = process.stdout;
}

const transformStream = new Transform({
  transform(chunk) {
    const res = cipherCaesar(chunk.toString(), program.action, program.shift);
    this.push(res);
  }
});

pipeline(inStream, transformStream, outStream, err =>
  process.stderr.write('Error: input/output file/s not found', err)
);
