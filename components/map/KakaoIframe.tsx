import React, { forwardRef } from "react"

const EXPO_PUBLIC_PINT_MAP = process.env.EXPO_PUBLIC_PINT_MAP

const KakaoIframe = React.memo(forwardRef((prop, ref: any) => {
    console.log("rerendering")
    return (
        <iframe src={"http://localhost:3000/"} ref={ref} width={"100%"} height={"100%"} />
    )
}))

export default KakaoIframe