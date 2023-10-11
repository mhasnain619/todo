import '../components/todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
const Todo = () => {
    // get local Data



    const getLocalStorageData = () => {
        const data = localStorage.getItem('myTodoList')
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }


    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalStorageData())
    const [editedItem, setEditedItem] = useState('')
    const [toggleBtn, setToggleBtn] = useState(false)
    // add the items
    const Additem = () => {
        if (!inputData) {
            alert('Plz add item')
        } else if (inputData && toggleBtn) {
            setItems(
                items.map((e) => {
                    if (e.id === editedItem) {
                        return { ...e, name: inputData }
                    }
                    return e;
                })
            );
            setInputData([]);
            setEditedItem(null)
            setToggleBtn(false)

        }
        else {
            const myNewData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewData])
            setInputData('');
        }
    }
    // EditItem


    const EditItem = (index) => {
        const Edited = items.find((e) => {
            return e.id === index
        })
        setInputData(Edited.name);
        setEditedItem(index)
        setToggleBtn(true)
    }

    // delete itemss

    const DeleteItem = (index) => {
        const updatedItem = items.filter((e) => {
            return e.id !== index;
        })
        setItems(updatedItem)
    }
    // remove All

    const removeAll = () => {
        setItems([]);
    }

    // adding localStorage
    useEffect(() => {
        localStorage.setItem('myTodoList', JSON.stringify(items))
    }, [items])
    return (
        <>
            <Container fluid='large' className='main-container'>
                <Row className="justify-content-md-center c">
                    <h2 className='heading'>Todo</h2>
                    <Col xs lg="2"></Col>
                    <Col md="5 d">
                        <div className="input-button">
                            <div className="input">
                                <input
                                    type="text"
                                    placeholder='Add Item'
                                    value={inputData}
                                    onChange={(event) => setInputData(event.target.value)}
                                />
                            </div>
                            <div className="AddBtn">
                                {toggleBtn ? (<button onClick={Additem}>Update</button>) : (<button onClick={Additem}>Add Todo</button>)}
                            </div>
                        </div>

                    </Col>
                    <Col xs lg="2"></Col>
                </Row>
            </Container>
            <Container fluid='large' className='main-container'>
                {items.map((e, i) => {
                    return (
                        <Row key={i} className="justify-content-md-center c">
                            <Col xs lg="2"></Col>
                            <Col md="5 d">
                                <div className="input-button">
                                    <div className="input-po">
                                        <span>{e.name}</span>
                                    </div>
                                    <div className="AddBtn-po">
                                        <button onClick={() => EditItem(e.id)}>Edit</button>
                                        <button onClick={() => DeleteItem(e.id)}>Del</button>
                                    </div>
                                </div>

                            </Col>
                            <Col xs lg="2"></Col>
                        </Row>
                    )
                })}

            </Container>
            <div className='clearAll'>
                <button onClick={removeAll}>Clear All</button>
            </div>
        </>
    );
}

export default Todo;