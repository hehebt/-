import {
    HTTP
} from '../utils/http-p.js'

class MyLike extends HTTP {
    getMyLike() {
        return this.request({
            url: "classic/favor"
        })
    }
}

export {MyLike}