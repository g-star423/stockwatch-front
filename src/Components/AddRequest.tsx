import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Input, Modal, Switch } from 'antd';

interface AddRequestProps {
    loggedInUserID: number | undefined
    getUserRequests: Function
}

function AddRequest({ loggedInUserID, getUserRequests }: AddRequestProps) {
    // from ant.design documentation
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //end ant.design code

    const [stockName, setStockName] = useState('')
    const [stockTicker, setStockTicker] = useState('')
    const [stockShares, setStockShares] = useState(0)
    const [tradeCompleted, setTradeCompleted] = useState(false)
    const [requestClosed, setRequestClosed] = useState(false)
    const [buying, setBuying] = useState(false)


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

    function handleAddRequest() {
        setIsModalOpen(false)
        axios.post('https://boiling-crag-00382.herokuapp.com/api/traderequest', {
            'stock_ticker': stockTicker,
            'number_of_shares': stockShares,
            'stock_name': stockName,
            'trade_completed': tradeCompleted,
            'ticket_closed': requestClosed,
            'buying': buying,
            'user_id': loggedInUserID,
        }).then(
            (response) => {
                getUserRequests()
                console.log(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }



    return (
        <>
            <div className='button-div'>
                <Button type="primary" onClick={showModal}>
                    NEW TRADE REQUEST
                </Button>
            </div>
            <Modal destroyOnClose={true} title="Add New Trade Request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='DONE' footer={null}>
                <div className='form-div'>
                    <Form labelCol={{ span: 8 }} onFinish={handleAddRequest} >
                        <Form.Item label='Stock Name' name="stock_name">
                            <Input type="text" placeholder="stock name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockName(event)} />
                        </Form.Item>
                        <Form.Item label='Stock Ticker' name="stock_ticker">
                            <Input type="text" placeholder="stock ticker" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockTicker(event)} />
                        </Form.Item>
                        <Form.Item label='Number of Shares' name="number_of_shares">
                            <Input type="number" placeholder="number of shares" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockShares(event)} />
                        </Form.Item>
                        <Form.Item label='Trade Direction' name="trade direction">
                            <Switch onClick={handleBuying} checkedChildren="Buying" unCheckedChildren="Selling"></Switch>
                        </Form.Item>
                        <Form.Item label='Trade Completed?' name="trade completed">
                            <Switch onClick={handleTradeCompleted}></Switch>
                        </Form.Item>
                        <Form.Item label='Request Closed?' name="request completed">
                            <Switch onClick={handleRequestClosed}></Switch>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>SUBMIT</Button>
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default AddRequest