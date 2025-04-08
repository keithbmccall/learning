const url = (() => {
    const result = [];
    document.querySelectorAll('section[data-id^="92"]').forEach((section) =>
        section
            .querySelectorAll('article[data-class$="45"]')
            .forEach((article) =>
                article.querySelectorAll('div[data-tag*="78"]').forEach((div) =>
                    div.querySelectorAll("b.ref").forEach((b) => {
                        result.push(b.getAttribute("value"));
                    }),
                ),
            ),
    );
    return result.join("");
})();
// 'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/656e64'
// endears
