const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

let options = {
    url: 'https://www.zhihu.com/explore',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
        'Content-Type':'text/html; charset=UTF-8'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        let $ = cheerio.load(body,{decodeEntities: false});
        let questionLink = $('.question_link');
        let str=`# 知乎每日发现\n`;
        for(let i=0;i<questionLink.length;i++){
            str += `+ [${questionLink.eq(i).text().replace(/(^\s+)|(\s+$)/g,'')}](https://www.zhihu.com${questionLink.attr('href')}')\n`;
        }
        fs.writeFile('dist/zhihu.md',str,function(err){
            if(err) throw err;
            console.log('数据已经保存~');
        })
    }
}

request(options, callback);