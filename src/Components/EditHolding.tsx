import axios from 'axios';
import { Button, Form, Input, Modal } from 'antd';
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
        setStockName(holdingEditing?.stock_name) // these will update the prefilled values any time the holding we are editing changes. They may be undefined, hence the ?
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
        // event.preventDefault()
        setIsModalOpen(false)
        axios.put('https://boiling-crag-00382.herokuapp.com/api/holdings/' + holdingEditing?.id, {
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
        axios.delete('https://boiling-crag-00382.herokuapp.com/api/holdings/' + holdingEditing?.id).then(
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
            <Modal title="Edit Holding" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div className='form-div'>
                    {/* <form onSubmit={(event) => handleEditHolding(event)}> */}
                    <Form labelCol={{ span: 5 }} onFinish={(event) => handleEditHolding(event)}>
                        <Form.Item label="Stock name">
                            <Input type="text" value={stockName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockName(event)} />
                        </Form.Item>
                        <Form.Item label="Stock ticker">
                            <Input type="text" value={stockTicker} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockTicker(event)} />
                        </Form.Item>
                        <Form.Item label="Numnber of shares">
                            <Input type="number" value={stockShares} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleStockShares(event)} />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>SUBMIT</Button>
                            <Button type='primary' danger={true} onClick={handleDelete}>DELETE</Button>
                        </Form.Item>
                    </Form>
                    {/* </form> */}
                </div>
            </Modal>
        </>
    )
}

export default EditHolding