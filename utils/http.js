import {config} from '../config.js'

const tips = {
    1:'抱歉，出现了一个错误',
    1005:'appkey无效',
    3000:'期刊不存在'
}

class HTTP {
    repuest(params){
        if(!params.method){
            params.method=  "GET";
        }
        wx.request({
            url:config.api_base_url+params.url,
            method:params.method,
            data:params.data,
            header:{
                'content-type': 'application/json',
                'appkey':config.appkey
            },
            success:(res)=>{
                let code = res.statusCode.toString()
                if (code.startsWith('2')){
                    params.success && params.success(res.data)
                }else{
                    let err = res.data.error_code
                    this._show_error(err)
                }
            },
            fail:(err)=>{
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