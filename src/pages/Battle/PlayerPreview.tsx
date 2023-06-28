import React, { memo } from "react"

interface PlayerPreviewChildren {
    avatar: string
    userName: string
    children: any
}

const PlayerPreview: React.FC<PlayerPreviewChildren> = ({ avatar, userName, children }: PlayerPreviewChildren): React.ReactElement => {
    return (
        <div className="column">
            <img src={avatar} alt="Avatar" className="avatar" />
            <h3>{userName}</h3>
            {children}
        </div>
    )
}

export default memo(PlayerPreview)