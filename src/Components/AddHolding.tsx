import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface AddHoldingProps {
    loggedInUserID: number | undefined
    getUserHoldings: Function
}

function AddHolding({ loggedInUserID, getUserHoldings }: AddHoldingProps) {
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

    function handleStockName(event: React.ChangeEvent<HTMLInputElement>) {
        setStockName(event.target.value)
    }
    function handleStockTicker(event: React.ChangeEvent<HTMLInputElement>) {
        setStockTicker(event.target.value)
    }
    function handleStockShares(event: React.ChangeEvent<HTMLInputElement>) {
        setStockShares(event.target.valueAsNumber)
    }

    function handleAddHolding(event: React.FormEvent<HTMLFormElement>) {
        // event.preventDefault()
        setIsModalOpen(false)
        axios.post('https://boiling-crag-00382.herokuapp.com/api/holdings', {
            'stock_name': stockName,
            'stock_ticker': stockTicker,
            'number_of_shares': stockShares,
            'user_id': loggedInUserID
        }).then(
            (response) => {
                console.log(response.data);
                getUserHoldings()
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
                    ADD HOLDING
                </Button>
            </div>
            <Modal destroyOnClose={true} title="Add New Holding" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='DONE' footer={null}>
                <div className='form-div'>
                    <Form labelCol={{ span: 8 }} onFinish={(event) => handleAddHolding(event)}>
                        <Form.Item label='Stock Name' name="stock_name">
                            <Input type="text" placeholder="stock name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockName(event)} />
                        </Form.Item>
                        <Form.Item label='Stock Ticker' name="stock_ticker">
                            <Input type="text" placeholder="stock ticker" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockTicker(event)} />
                        </Form.Item>
                        <Form.Item label='Number of Shares' name="number_of_shares">
                            <Input type="number" placeholder="number of shares" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockShares(event)} />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>SUBMIT</Button>
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default AddHolding;