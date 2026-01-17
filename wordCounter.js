async function countAndDisplayWordsAcrossPages(pages) {
  let totalWords = 0;
  let allWords = [];

  for (const page of pages) {
    try {
      const response = await fetch(page);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const elements = doc.body.querySelectorAll('*');

      let pageText = '';
      elements.forEach((element) => {
        if (element.offsetParent !== null && !['SCRIPT', 'STYLE'].includes(element.tagName)) {
          pageText += element.textContent + ' ';
        }
      });

      const words = pageText.trim().split(/\s+/).filter(word => word.length > 0);
      console.log(`Words on ${page}: ${words.length}`);
      totalWords += words.length;
      allWords = allWords.concat(words);
    } catch (error) {
      console.error(`Failed to fetch ${page}:`, error);
    }
  }

  console.log(`Total words across all pages: ${totalWords}`);
  console.log('All words:', allWords);
  return { totalWords, allWords };
}

// List of pages to count words from
const pages = [
  '/index.html',
  '/timeline.html',
  '/ta.html',
  '/web-impact.html'
];

// Run the function
countAndDisplayWordsAcrossPages(pages);
