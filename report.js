function sortPages(pages) {
    const pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);
    
    return pagesArray;
}

function printReport(pages) {
    console.log("================");
    console.log("Report");
    console.log("================");

    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} links to ${page[0]}`);
    }

    console.log("================");
    console.log("Report End");
    console.log("================");
}
    
module.exports = { 
    sortPages,
    printReport,
}