import PlayerForm from "./PlayerForm"
import BattleButton from "./BattleButton"


const Battle: React.FC = (): React.ReactElement => {

    return (
        <>
            <div className="row">
                <PlayerForm index={0} />
                <PlayerForm index={1} />
            </div>
            <BattleButton />
        </>
    )
}

export default Battle
