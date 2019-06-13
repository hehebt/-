import {config} from '../config.js'

const tips = {
    1:'抱歉，出现了一个错误',
    1005:'appkey无效',
    3000:'期刊不存在'
}

class HTTP {
    request({url, data={}, method='GET'}){
        return new Promise((resolve, reject)=>{
            this._repuest(url, resolve, reject, data, method)
        }) 
    }

    _repuest(url, resolve, reject, data={}, method='GET'){

        wx.request({
            url:config.api_base_url+url,
            method:method,
            data:data,
            header:{
                'content-type': 'application/json',
                'appkey':config.appkey
            },
            success:(res)=>{
                let code = res.statusCode.toString()
                if (code.startsWith('2')){
                    resolve(res.data)
                }else{
                    reject()
                    let err = res.data.error_code
                    this._show_error(err)
                }
            },
            fail:(err)=>{
                reject()
                wx.showToast({
                    title: '网络错误',
                    icon: 'none',
                    duration: 2000
                });
            }
        })
    }

    _show_error(err){
        if(!err){
            err = 1
        }
        const tip = tips[err]
        wx.showToast({
            title:tip?tip:tip[1],
            icon:'none',
            duration:2000
        })
    }
}
export {HTTP}