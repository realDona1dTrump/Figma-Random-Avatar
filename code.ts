const selection = figma.currentPage.selection;

if (selection.length > 0) {
  // 遍历选中的图层
  selection.forEach((node) => {
    if (node.type === 'RECTANGLE' || node.type === 'ELLIPSE') {
      const timestamp = new Date().getTime();
      const imageHash = timestamp;
      const imageUrl = `https://api.multiavatar.com/${imageHash}.png`;

      // 获取填充图片
      fetch(imageUrl)
        .then((response) => response.arrayBuffer())
        .then((buffer) => figma.createImage(new Uint8Array(buffer)))
        .then((img) => {
          node.fills = [
            {
              type: 'IMAGE',
              imageHash: img.hash,
              scaleMode: 'FIT',
            },
          ];
          figma.notify('Done!', { timeout: 2000 });
          figma.closePlugin();
        })
        .catch((err: any) => {
          console.error(err);
        });
    } 

    else {
      figma.notify('You have not selected any fillable layers.', { timeout: 3000 });
      figma.closePlugin();
    }

  });
} 

else {
  figma.notify('You have not selected any fillable layers.', { timeout: 3000 });
  figma.closePlugin();
}
