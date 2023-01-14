import axios from 'axios';
import React, { useState } from 'react';
import { Button, Input } from 'antd';

interface AddHoldingProps {
    loggedInUserID: number
}

function AddHolding({ loggedInUserID }: AddHoldingProps) {

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
        axios.post('http://localhost:8000/api/holdings', {
            'stock_name': stockName,
            'stock_ticker': stockTicker,
            'number_of_shares': stockShares,
            'user_id': loggedInUserID
        }).then(
            (response) => {
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
            <div className='form-div'>
                <h4>Add Holding</h4>
                <form onSubmit={(event) => handleAddHolding(event)}>
                    <Input type="text" placeholder="stock name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockName(event)} />
                    <Input type="text" placeholder="stock ticker" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockTicker(event)} />
                    <Input type="number" placeholder="number of shares" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockShares(event)} />
                    <Button type='primary' htmlType='submit'>SUBMIT</Button>
                </form>
            </div>
        </>
    );
}

export default AddHolding;