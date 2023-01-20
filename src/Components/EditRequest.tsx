import axios from 'axios';
import { Button, Form, Input, Modal, Switch } from 'antd';
import { useState, useEffect } from 'react';

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

interface EditRequestProps {
    isModalOpen: boolean,
    setIsModalOpen: Function
    requestEditing: TradeRequest | undefined
    getUserRequests: Function
}

function EditRequest({ isModalOpen, setIsModalOpen, requestEditing, getUserRequests }: EditRequestProps) {
    // from ant.design documentation

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //end ant.design code

    const [stockName, setStockName] = useState<string>()
    const [stockTicker, setStockTicker] = useState<string>()
    const [stockShares, setStockShares] = useState<number>()
    const [tradeCompleted, setTradeCompleted] = useState<boolean>()
    const [requestClosed, setRequestClosed] = useState<boolean>()
    const [buying, setBuying] = useState<boolean>()

    useEffect(() => {
        setStockName(requestEditing?.stock_name) // these will update the prefilled values any time the holding we are editing changes. They may be undefined, hence the ?
        setStockTicker(requestEditing?.stock_ticker)
        setStockShares(requestEditing?.number_of_shares)
        setTradeCompleted(requestEditing?.trade_completed)
        setRequestClosed(requestEditing?.ticket_closed)
        setBuying(requestEditing?.buying)
    }, [requestEditing])


    function handleStockName(event: React.ChangeEvent<HTMLInputElement>) {
        setStockName(event.target.value)
    }
    function handleStockTicker(event: React.ChangeEvent<HTMLInputElement>) {
        setStockTicker(event.target.value)
    }
    function handleStockShares(event: React.ChangeEvent<HTMLInputElement>) {
        setStockShares(event.target.valueAsNumber)
    }
    function handleTradeCompleted() {
        if (tradeCompleted === false) {
            setTradeCompleted(true)
        } else {
            setTradeCompleted(false)
        }
    }
    function handleRequestClosed() {
        if (requestClosed === false) {
            setRequestClosed(true)
        } else {
            setRequestClosed(false)
        }
    }
    function handleBuying() {
        if (buying === false) {
            setBuying(true)
        } else {
            setBuying(false)
        }
    }

    function handleEditRequest() {
        setIsModalOpen(false)
        axios.put('https://boiling-crag-00382.herokuapp.com/api/traderequest/' + requestEditing?.id, {
            'stock_ticker': stockTicker,
            'number_of_shares': stockShares,
            'stock_name': stockName,
            'trade_completed': tradeCompleted,
            'ticket_closed': requestClosed,
            'buying': buying,
        }).then(
            (response) => {
                console.log("PUT request successful");
                getUserRequests()
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    function handleDelete() {
        axios.delete('https://boiling-crag-00382.herokuapp.com/api/traderequest/' + requestEditing?.id).then(
            (response) => {
                setIsModalOpen(false)
                console.log("successfully deleted");
                getUserRequests()
            }
        ).catch(
            (error) => {
                console.log(error);

            }
        )
    }

    return (
        <>
            <Modal title="Edit Request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form labelCol={{ span: 8 }} onFinish={handleEditRequest}>
                    <Form.Item label='Stock Name'>
                        <Input type="text" value={stockName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockName(event)} />
                    </Form.Item>
                    <Form.Item label='Stock Ticker'>
                        <Input type="text" value={stockTicker} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockTicker(event)} />
                    </Form.Item>
                    <Form.Item label='Number of Shares'>
                        <Input type="number" value={stockShares} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockShares(event)} />
                    </Form.Item>
                    <Form.Item label='Trade Direction' >
                        <Switch checked={buying} onClick={handleBuying} checkedChildren="Buying" unCheckedChildren="Selling"></Switch>
                    </Form.Item>
                    <Form.Item label='Trade Completed?' >
                        <Switch checked={tradeCompleted} onClick={handleTradeCompleted}></Switch>
                    </Form.Item>
                    <Form.Item label='Request Closed?' >
                        <Switch checked={requestClosed} onClick={handleRequestClosed}></Switch>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>SUBMIT</Button>
                        <Button type='primary' danger={true} onClick={handleDelete}>DELETE</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )

}

export default EditRequest