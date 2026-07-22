const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/r/:id', (req, res) => {
  const linkId = req.params.id; // URL에서 'beef1' 같은 ID 추출
  
  // links.json 파일 읽기
  const linksData = JSON.parse(fs.readFileSync('./links.json', 'utf8'));
  const linkInfo = linksData[linkId];

  if (!linkInfo) {
    return res.status(404).send('존재하지 않는 링크입니다.');
  }

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta property="og:title" content="${linkInfo.title}">
      <meta property="og:image" content="${linkInfo.image}">
      <meta property="og:type" content="website">
      <meta http-equiv="refresh" content="0; url=${linkInfo.target}">
      <script>window.location.href = "${linkInfo.target}";</script>
    </head>
    <body></body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
