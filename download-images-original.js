const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Function to extract filename from URL
function getFilenameFromUrl(url) {
  const urlPath = new URL(url).pathname;
  const filename = path.basename(urlPath);
  return filename;
}

const images = {
  'banh-mi-cha-ca': [
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301148589006.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301305534782.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301148484833.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301149227862.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301149426094.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211301305400586.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231851365830.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231844517108.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231546344775.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231545129294.jpg',
    'https://cdn.tgdd.vn/Files/2022/11/23/1489610/cach-lam-banh-mi-cha-ca-don-gian-cho-bua-sang-day-dinh-duong-202211231609405200.jpg'
  ],
  'bun-cha-ha-noi': [
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-202112211431417496.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202201111235292144.jpeg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-2_760x427.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-3_760x456.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-5_760x501.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-6_760x508.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-7_760x448.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-8_760x529.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271024236058.jpg',
    'https://cdn.tgdd.vn/Files/2017/04/12/971481/cach-lam-bun-cha-ha-noi-truyen-thong-chuan-vi-ha-thanh-202205271018143380.jpg'
  ],
  'goi-cuon': [
    'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-tom-thit-thom-ngon-cho-bua-com-gian-don-202203021427281747.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-thom-ngon-don-gian-2_760x451.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-thom-ngon-don-gian-3_760x450.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-tom-thit-thom-ngon-cho-bua-com-gian-don-202112301129029086.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-tom-thit-thom-ngon-cho-bua-com-gian-don-202102201225481515.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/22/963738/cach-lam-goi-cuon-thom-ngon-don-gian-5_760x450.jpg'
  ],
  'ca-phe-sua-da': [
    'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-1200x806.jpg',
    'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-1200x900.jpg',
    'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-1200x675.jpg',
    'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da-500x500.jpg',
    'https://thecoffeeclub.com.vn/wp-content/uploads/2025/06/nguoi-viet-ngoi-quan-via-he-thuong-thuc-ca-phe-sua-da.jpg'
  ],
  'pho-bo-ha-noi': [
    'https://cdn.tgdd.vn/Files/2017/03/18/962092/an-lien-3-bat-pho-voi-cong-thuc-nau-pho-nay-202201261419401397.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/18/962092/an-lien-3-bat-pho-voi-cong-thuc-nau-pho-nay-202201261420466331.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/18/962092/an-lien-3-bat-pho-voi-cong-thuc-nau-pho-nay-202201261426437466.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202208251845456653.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202201261500501972.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202201261501423561.jpg',
    'https://cdn.tgdd.vn/Files/2017/03/18/962092/cach-nau-pho-bo-ngon-chuan-vi-ha-noi-nuoc-dung-dam-da-202201261433333353.jpg'
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
          console.log(`✓ ${filepath}`);
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

  console.log(`Starting download of ${total} images with original filenames...\n`);

  for (const [folder, imageList] of Object.entries(images)) {
    console.log(`\n📁 ${folder}:`);

    for (const url of imageList) {
      const filename = getFilenameFromUrl(url);
      const filepath = path.join('public', 'image', folder, filename);
      try {
        await downloadImage(url, filepath);
        downloaded++;
      } catch (error) {
        console.error(`✗ Error downloading ${filename}:`, error.message);
      }
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✓ Download complete! ${downloaded}/${total} images downloaded.`);
  console.log(`${'='.repeat(60)}\n`);

  // Print summary of downloaded files
  console.log('Summary by folder:');
  for (const folder of Object.keys(images)) {
    const files = fs.readdirSync(path.join('public', 'image', folder));
    console.log(`  ${folder}: ${files.length} files`);
  }
}

downloadAll().catch(console.error);
