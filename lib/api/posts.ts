import axios from "axios"

const BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL

export const subscribePostHeart = async ({
    postId,
    access_token
}: {
    postId: string;
    access_token: string;
}) => {
    return axios.patch(BACKEND_URL + "/blog/heart/" + postId + "?active=true", {}, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}

export const unsubscribePostHeart = async ({
    postId,
    access_token
}: {
    postId: string;
    access_token: string;
}) => {
    axios.patch(BACKEND_URL + "/blog/heart/" + postId + "?active=false", {}, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}

export const subscribePostBookmark = async ({
    postId,
    access_token
}: {
    postId: string;
    access_token: string;
}) => {
    axios.patch(BACKEND_URL + "/blog/bookmark/" + postId + "?active=true", {}, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}

export const unsubscribePostBookmark = async ({
    postId,
    access_token
}: {
    postId: string;
    access_token: string;
}) => {
    axios.patch(BACKEND_URL + "/blog/bookmark/" + postId + "?active=false", {}, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}



