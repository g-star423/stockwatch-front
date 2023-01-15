import axios from 'axios';
import { Button, Input, Modal } from 'antd';
import { useState, useEffect } from 'react';

interface Holding {
    id: number
    stock_name: string
    stock_ticker: string
    number_of_shares: number
    user_id: number
}

interface EditHoldingProps {
    isModalOpen: boolean,
    setIsModalOpen: Function
    holdingEditing: Holding | undefined
}

function EditHolding({ isModalOpen, setIsModalOpen, holdingEditing }: EditHoldingProps) {
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

    useEffect(() => {
        setStockName(holdingEditing?.stock_name)
        setStockTicker(holdingEditing?.stock_ticker)
        setStockShares(holdingEditing?.number_of_shares)
    }, [holdingEditing])

    function handleStockName(event: React.ChangeEvent<HTMLInputElement>) {
        setStockName(event.target.value)
    }
    function handleStockTicker(event: React.ChangeEvent<HTMLInputElement>) {
        setStockTicker(event.target.value)
    }
    function handleStockShares(event: React.ChangeEvent<HTMLInputElement>) {
        setStockShares(event.target.valueAsNumber)
    }

    function handleEditHolding(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsModalOpen(false)
        axios.put('http://localhost:8000/api/holdings/' + holdingEditing?.id, {
            "stock_name": stockName,
            "stock_ticker": stockTicker,
            "number_of_shares": stockShares
        }).then(
            (response) => {
                console.log("PUT request successful");
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    function handleDelete() {
        axios.delete('http://localhost:8000/api/holdings/' + holdingEditing?.id).then(
            (response) => {
                setIsModalOpen(false)
                console.log("successfully deleted");

            }
        ).catch(
            (error) => {
                console.log(error);

            }
        )
    }

    return (
        <>
            <Modal title="Edit Holding" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='DONE'>
                <div className='form-div'>
                    <form onSubmit={(event) => handleEditHolding(event)}>
                        <Input type="text" value={stockName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockName(event)} />
                        <Input type="text" value={stockTicker} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockTicker(event)} />
                        <Input type="number" value={stockShares} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockShares(event)} />
                        <Button type='primary' htmlType='submit'>SUBMIT</Button>
                        <Button type='primary' danger={true} onClick={handleDelete}>DELETE</Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default EditHolding