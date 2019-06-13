import {HTTP} from '../utils/http.js'

class LikeModel extends HTTP {
    like(behavior,artID,category){
        let url = behavior=="like"?"like":"like/cancel"
        this.repuest({
            url:url,
            method:"POST",
            data:{
                art_id:artID,
                type:category
            }
        })
    }

    getClassicLikeStatus(artID,category,sCallback){
        this.repuest({
            url:`classic/${category}/${artID}/favor`,
            success:sCallback
        })
    }
}

export {LikeModel}