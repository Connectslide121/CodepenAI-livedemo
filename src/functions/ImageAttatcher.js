import SearchImages from "../APIs/Unsplash.js";

export const addImages = async (htmlCode) => {
  // Define a regular expression to find image tags with the alt attribute
  const imgRegex = /<img(?:\s+[^>]+)?\s+alt=["'](.*?)["'][^>]*>/g;
  const altRegex = /alt=["'](.*?)["']/;
  const srcRegex = /src=["'](.*?)["']/;

  // Use match to find all image tags with the specified alt attribute
  const imgMatches = htmlCode.match(imgRegex);

  // Check if there are any matches
  if (imgMatches) {
    // Use Promise.all to wait for all async operations to complete
    const modifiedHtml = await Promise.all(
      imgMatches.map(async (imgTag) => {
        // Extract alt text from the matched image tag
        const altTextMatch = imgTag.match(altRegex);
        const altText = altTextMatch ? altTextMatch[1] : "";

        // Call the searchImages function and wait for the result
        const imageObject = await SearchImages(altText);

        if (imageObject) {
          // Replace the src attribute in the matched image tag
          return imgTag.replace(srcRegex, `src="${imageObject.urls.small}"`);
        } else {
          // If imageObject is not available, return the original match
          return imgTag;
        }
      })
    );

    // Replace the modified image tags in the original HTML code
    let index = 0;
    const finalHtml = htmlCode.replace(imgRegex, () => modifiedHtml[index++]);

    return finalHtml;
  } else {
    return htmlCode;
  }
};
