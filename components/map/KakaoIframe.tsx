import React, { forwardRef } from "react"

const EXPO_PUBLIC_PINT_MAP = process.env.EXPO_PUBLIC_PINT_MAP

const KakaoIframe = React.memo(forwardRef((props, ref: any) => {
    return (
        <iframe src={EXPO_PUBLIC_PINT_MAP} ref={ref} width={"100%"} height={"100%"} />
    )
}))

export default KakaoIframe