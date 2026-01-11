const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const images = {
  'banh-mi-cha-ca': [
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301148589006.jpg', name: 'main-1.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301305534782.jpg', name: 'main-2.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301148484833.jpg', name: 'ingredients.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301149227862.jpg', name: 'prep.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301149426094.jpg', name: 'frying.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301305400586.jpg', name: 'sauce.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231851365830.jpg', name: 'variant-main.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231844517108.jpg', name: 'variant-ingredients.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231546344775.jpg', name: 'variant-frying.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231545129294.jpg', name: 'variant-prep.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231609405200.jpg', name: 'variant-final.jpg' }
  ],
  'bun-cha-ha-noi': [
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-202112211431417496.jpg', name: 'main.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202201111235292144.jpeg', name: 'ingredients.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-2_760x427.jpg', name: 'cutting.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-3_760x456.jpg', name: 'marinating.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-5_760x501.jpg', name: 'grilling-prep.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-6_760x508.jpg', name: 'grilled.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-7_760x448.jpg', name: 'sauce.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-8_760x529.jpg', name: 'plated.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271024236058.jpg', name: 'completed.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271018143380.jpg', name: 'serving.jpg' }
  ],
  'goi-cuon': [
    { url: 'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-tom-thit-thom-ngon-cho-bua-com-gian-don-202203021427281747.jpg', name: 'main.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-thom-ngon-don-gian-2_760x451.jpg', name: 'meat-prep.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-thom-ngon-don-gian-3_760x450.jpg', name: 'shrimp-cooking.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-tom-thit-thom-ngon-cho-bua-com-gian-don-202112301129029086.jpg', name: 'vegetables.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-tom-thit-thom-ngon-cho-bua-com-gian-don-202102201225481515.jpg', name: 'rolling.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-thom-ngon-don-gian-5_760x450.jpg', name: 'final-with-sauce.jpg' }
  ],
  'ca-phe-sua-da': [
    { url: 'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-1200x806.jpg', name: 'street-cafe-1200x806.jpg' },
    { url: 'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-1200x900.jpg', name: 'street-cafe-1200x900.jpg' },
    { url: 'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-1200x675.jpg', name: 'street-cafe-1200x675.jpg' },
    { url: 'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-500x500.jpg', name: 'street-cafe-500x500.jpg' },
    { url: 'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da.jpg', name: 'street-cafe-full.jpg' }
  ],
  'pho-bo-ha-noi': [
    { url: 'https://cdn.tgdd.vn/Files/2017/03/18/962092/an-lien-3-bat-pho-voi-cong-thuc-nau-pho-nay-202201261419401397.jpg', name: 'intro.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/18/962092/an-lien-3-bat-pho-voi-cong-thuc-nau-pho-nay-202201261420466331.jpg', name: 'comparison.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/18/962092/an-lien-3-bat-pho-voi-cong-thuc-nau-pho-nay-202201261426437466.jpg', name: 'raw-beef.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202208251845456653.jpg', name: 'main.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202201261500501972.jpg', name: 'ingredients.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202201261501423561.jpg', name: 'broth-cooking.jpg' },
    { url: 'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202201261433333353.jpg', name: 'wine-variant.jpg' }
  ]
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  let total = 0;
  let downloaded = 0;

  // Count total images
  for (const folder in images) {
    total += images[folder].length;
  }

  console.log(`Starting download of ${total} images...\n`);

  for (const [folder, imageList] of Object.entries(images)) {
    console.log(`\nDownloading images for ${folder}...`);

    for (const img of imageList) {
      const filepath = path.join('public', 'image', folder, img.name);
      try {
        await downloadImage(img.url, filepath);
        downloaded++;
        console.log(`Progress: ${downloaded}/${total}`);
      } catch (error) {
        console.error(`Error downloading ${img.name}:`, error.message);
      }
    }
  }

  console.log(`\n✓ Download complete! ${downloaded}/${total} images downloaded.`);
}

downloadAll().catch(console.error);
