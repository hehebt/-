import {
    HTTP
} from '../utils/http.js'

class ClassicModel extends HTTP {
    getLateat(sCallback) {
        this.repuest({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
                let key = this._getKey(res.index)
                wx.setStorageSync(key,res)
            }
        })
    }

    getClassic(index, todo, sCallback) {
        // 缓存中寻找 or API 写入到缓存中
        //key 确定缓存中的key

        let key = this._getKey(todo == "next" ? index + 1 : index - 1)
        let classic = wx.getStorageSync(key);
        if (!classic) {
            this.repuest({
                url: `classic/${index}/${todo}`,
                success(res) {
                    sCallback(res)
                    wx.setStorageSync(key, res);
                }
            })
        } else {
            sCallback(classic)
        }

    }


    //将最新一期的index写入到缓存数据
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }

    _getKey(index) {
        let key = 'classic-' + index
        return key
    }
}

export {
    ClassicModel
}