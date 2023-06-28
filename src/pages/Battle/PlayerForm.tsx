import { memo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlayerAction } from "../../state/battle/battle.slice"
import PlayerPreview from "./PlayerPreview"
import { AppDispatch, RootState } from "../../state/store"
import { IPlayers } from "../../types/battle.types"

interface PlayerFormChildren {
    index: number
}

const PlayerForm: React.FC<PlayerFormChildren> = ({ index }: PlayerFormChildren): React.ReactElement => {
    const [name, setName] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    const player: IPlayers = useSelector((state: RootState) => state.battle.players[index])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(getPlayerAction({
            index,
            name,
            image: `https://github.com/${name}.png?size200`
        }))
    }

    const handleReset = () => {
        dispatch(getPlayerAction({ index, name: '', image: null }))
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    if (player?.image) {
        return (
            <PlayerPreview
                avatar={player?.image}
                userName={player?.name}
            >
                <button className="reset" onClick={handleReset}>Reset</button>
            </PlayerPreview>
        )
    }

    return (
        <form className="column" onSubmit={handleSubmit}>
            <label htmlFor='name' className="header">
                Player {index + 1}
            </label>
            <input
                type='text'
                id='name'
                value={name}
                onChange={handleChangeName}
                placeholder='GitHub Username'
                autoComplete="off"
            />
            <button type='submit' className="button" disabled={!name.length}>Submit</button>
        </form>
    )
}

export default memo(PlayerForm)