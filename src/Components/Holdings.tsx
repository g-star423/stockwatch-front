import { useState, useEffect } from "react"
import { Button, Table } from "antd"
import axios from "axios"
import AddHolding from "./AddHolding"
import EditHolding from "./EditHolding"
import { render } from "@testing-library/react"

interface HoldingsProps {
    loggedInUserID: number | undefined
}

interface Holding {
    id: number
    stock_name: string
    stock_ticker: string
    number_of_shares: number
    user_id: number
}

function Holdings({ loggedInUserID }: HoldingsProps) {

    // from ant.design documentation
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showEditModal = () => {
        setIsModalOpen(true);
    };
    //end ant.design code


    const [holdingEditing, setHoldingEditing] = useState<Holding | undefined>()

    const [dataSource, setDataSource] = useState<Holding[]>([])
    const columns = [ // I would not use antd again purely because of this table design.
        // {
        //     title: 'id',
        //     dataIndex: 'id',
        //     key: 'id'
        // },
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
            title: 'Edit',
            dataIndex: 'id',
            key: 'id',
            render: (text: string, record: Holding, index: number) => (
                <Button type="primary" key={record.id} onClick={() => { setHoldingEditing(record); showEditModal(); }}>EDIT HOLDING</Button>
            )
        }
    ]

    const [gotHoldings, setGotHoldings] = useState<boolean>(false) // helps display message to let user know it was successful
    const [holdingsLoading, setHoldingsLoading] = useState(false)

    function getUserHoldings() {
        setHoldingsLoading(true)
        axios.get('https://boiling-crag-00382.herokuapp.com/api/userholdings/' + loggedInUserID).then(
            (response) => {
                setDataSource(response.data)
                setGotHoldings(true)
                setTimeout(() => {
                    setHoldingsLoading(false) // usually loads quite fast, so letting loading look like it's happening for at least .5 seconds
                }, 500)
                setTimeout(() => {
                    setGotHoldings(false)
                }, 5000)
            }
        ).catch(
            (error) => {
                setHoldingsLoading(false)
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getUserHoldings()
    }, [isModalOpen])

    return (
        <>
            <div className='button-div'>
                <Button loading={holdingsLoading} onClick={getUserHoldings}>REFRESH HOLDINGS</Button>
                {gotHoldings ? <p>Holdings updated!</p> : null}
            </div>
            <div className="table-div">
                <Table<Holding> columns={columns} dataSource={dataSource} pagination={false} key="id" />
            </div>
            <AddHolding loggedInUserID={loggedInUserID} getUserHoldings={getUserHoldings} />
            <EditHolding isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} holdingEditing={holdingEditing} />
        </>
    )
}

export default Holdings
