const minimist = require('minimist');
const csv = require('csv-parser')
const fs = require('fs');

module.exports = () => {

    const csvColumns = 3;
    const args = minimist(process.argv.slice(2));
    const path = args._[0];
    const column = args._[1];
    const searchKey = args._[2];
    let result = "No record found";

    if (args._.length !== csvColumns) {
        console.log("Invalid arguments number");
    } else if (column > csvColumns) {
        console.log(`Column value must be between 0 and ${csvColumns}`);
    } else {
        fs.createReadStream(path)
            .on('error', (error) => {
                console.log(error.code)
            })
            .pipe(csv({ headers: false }))
            .on('data', (data) => {
                if ((column !== csvColumns ? data[column] : data[column].slice(0, -1)) == searchKey) {
                    result = "";
                    for (i = 0; i <= csvColumns; i++) {
                        result += `${data[i]},`;
                    }
                    result = result.slice(0, -1);
                }
            })
            .on('end', () => {
                console.log(result);
            })
    }

}