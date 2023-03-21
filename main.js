const { crawlPage } = require("./crawl");

async function main() {
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
    const pages = await crawlPage(urlToCrawl, urlToCrawl, {});

    console.log("Crawling complete");

    for (const page of Object.entries(pages)) {
        console.log(page);
    }
}

main();