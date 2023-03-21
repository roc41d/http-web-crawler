const { crawlPage } = require("./crawl");

function main() {
    if (process.argv.length < 3) {
        console.log("No website provided");
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.log("Too many arguments");
        process.exit(1);
    }

    const urlToCrawl = process.argv[2];
    console.log(`Starting crawl of ${urlToCrawl}`);
    crawlPage(urlToCrawl);
}

main();