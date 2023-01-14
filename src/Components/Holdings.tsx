import { useState } from "react"
import { Button, Table } from "antd"
import axios from "axios"
import AddHolding from "./AddHolding"

interface HoldingsProps {
    loggedInUserID: number
}

interface Holding {
    id: number
    stock_name: string
    stock_ticker: string
    number_of_shares: number
    user_id: number
}

function Holdings({ loggedInUserID }: HoldingsProps) {


    const [dataSource, setDataSource] = useState<Holding[]>([])
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
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
        }
    ]

    function getUserHoldings() {
        axios.get('http://localhost:8000/api/userholdings/' + loggedInUserID).then(
            (response) => {
                setDataSource(response.data)
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <>
            <div className="table-div">
                <Button onClick={getUserHoldings}>Get data for logged in user</Button>
                <Table<Holding> columns={columns} dataSource={dataSource} />
            </div>
            <AddHolding loggedInUserID={loggedInUserID} />
        </>
    )
}

export default Holdings
