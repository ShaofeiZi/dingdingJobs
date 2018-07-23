const https = require('https');
const schedule = require('node-schedule'); // 定时任务

function postdata() {
    const data = JSON.stringify(
        {
            "msgtype": "markdown",
            "markdown": {
              "title":"你有一条未读消息",
              "text":"" +
       
              "> 每天好心情 &#12288;&#12288;&#12288;✌🌹🌹️  \n" 
            
            },
            "at": {
              "atMobiles": [
                ""
              ],
              "isAtAll": true
            }
        }

    )

    const options = {
        host: 'oapi.dingtalk.com',
        path: '/robot/send?access_token=xxxxx',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }

    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (d) => {
            console.log('' + d); //将buffer转为字符串或者使用d.toString()
            let b = JSON.parse('' + d); //将buffer转成JSON
            console.log(b.image_id);
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.write(data);
    req.end();
}
// 每天上午10：10：30 发送
schedule.scheduleJob('30 10 10 * * *', () => {
    postdata()
});
// 每天下午18：30：30 发送
schedule.scheduleJob('30 30 18 * * *', () => {
    postdata()
});

