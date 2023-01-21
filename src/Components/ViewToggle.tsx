import { Button } from "antd"
interface toggleProps {
    setView: Function
}

function ViewToggle({ setView }: toggleProps) {

    return (
        <>
            <Button style={{ float: 'right' }} onClick={() => setView("holdings")}>VIEW HOLDINGS</Button>
            <Button style={{ float: 'right' }} onClick={() => setView("requests")}>VIEW REQUESTS</Button>
        </>
    )

}

export default ViewToggle