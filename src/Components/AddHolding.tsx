import axios from 'axios';
import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

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
        event.preventDefault()
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
            <Button type="primary" onClick={showModal}>
                ADD HOLDING
            </Button>
            <Modal destroyOnClose={true} title="Add New Holding" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='DONE' footer={null}>
                <div className='form-div'>
                    <form onSubmit={(event) => handleAddHolding(event)}>
                        <Input type="text" placeholder="stock name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockName(event)} />
                        <Input type="text" placeholder="stock ticker" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockTicker(event)} />
                        <Input type="number" placeholder="number of shares" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockShares(event)} />
                        <Button type='primary' htmlType='submit'>SUBMIT</Button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default AddHolding;