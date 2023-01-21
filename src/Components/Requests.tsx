import { useState, useEffect } from "react"
import { Button, Table } from "antd"
import axios from "axios"
import { render } from "@testing-library/react"
import EditRequest from "./EditRequest"
import AddRequest from "./AddRequest"

interface RequestsProps {
    loggedInUserID: number | undefined
}

interface TradeRequest {
    id: number
    stock_ticker: string
    number_of_shares: number
    stock_name: string
    trade_completed: boolean
    ticket_closed: boolean
    buying: boolean
    user_id: number
}

function Requests({ loggedInUserID }: RequestsProps) {
    // from ant.design documentation
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showEditModal = () => {
        setIsModalOpen(true);
    };
    //end ant.design code

    const [requestEditing, setRequestEditing] = useState<TradeRequest | undefined>()
    const [dataSource, setDataSource] = useState<TradeRequest[]>([])


    function getUserRequests() {
        axios.get('https://boiling-crag-00382.herokuapp.com/api/userrequests/' + loggedInUserID).then(
            (response) => {
                console.log(response.data);
                setDataSource(response.data)
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getUserRequests()
    }, [isModalOpen])


    const columns = [
        {
            title: 'Stock Name',
            dataIndex: 'stock_name',
            key: 'stock_name'
        },
        {
            title: 'Stock Ticker',
            dataIndex: 'stock_ticker',
            key: 'stock_ticker'
        },
        {
            title: 'Number of Shares',
            dataIndex: 'number_of_shares',
            key: 'number_of_shares'
        },
        {
            title: 'Trade Direction',
            dataIndex: 'buying',
            key: 'buying',
            render: (text: boolean) => text ? "Buying" : "Selling"
        },
        {
            title: 'Trade Completed?',
            dataIndex: 'trade_completed',
            key: 'trade_completed',
            render: (text: boolean) => text ? "Trade Completed" : "Trade Incomplete"
        },
        {
            title: 'Ticket Status',
            dataIndex: 'ticket_closed',
            key: 'ticket_closed',
            render: (text: boolean) => text ? "Closed" : "Open"
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            key: 'id',
            render: (text: string, record: TradeRequest, index: number) => (
                <Button type="primary" key={record.id} onClick={() => { setRequestEditing(record); showEditModal(); }}>EDIT HOLDING</Button>
            )
        }
    ]

    return (
        <>
            <div className='button-div'>
                <Button onClick={getUserRequests}>GET REQUESTS</Button>
            </div>
            <div className="table-div">
                <Table<TradeRequest> columns={columns} dataSource={dataSource} pagination={false} key="id" />
            </div>
            <EditRequest getUserRequests={getUserRequests} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} requestEditing={requestEditing}></EditRequest>
            <AddRequest getUserRequests={getUserRequests} loggedInUserID={loggedInUserID}></AddRequest>
        </>
    )
}

export default Requests