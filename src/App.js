import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import SaveIcon from '@material-ui/icons/Save';

import TodoItem from './components/TodoItem';

let storage = window.localStorage;
let storedList = JSON.parse(storage.getItem('ToDoList'));
let localItems = [];
if(storedList != null) {
    localItems = storedList;
}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            savedItems: localItems
        }
    }

    handleInput = (e) => {
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let todoItem = {item: this.state.value, isCompleted: false};
        this.setState({
            savedItems: [...this.state.savedItems, todoItem],
            value: ''
        }, () => this.syncLocalStorage());
    }

    toggleItemState = (id) => {
        let temp = this.state.savedItems.map((ele, i) => {
            if(id === i) {
                ele.isCompleted = !ele.isCompleted;
            }
            return ele;
        });
        this.setState({savedItems: temp}, () => this.syncLocalStorage());
    }

    deleteItem = (id) => {
        let temp = this.state.savedItems.filter((ele, i) => i !== id);
        this.setState({savedItems: temp}, () => this.syncLocalStorage());
    }

    syncLocalStorage = () => {
        let temp = JSON.stringify(this.state.savedItems)
        storage.setItem('ToDoList', temp)
    }

    render() {
        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3} justify='center' alignItems='center'>
                        <Grid item md={3}>
                            <TextField id='outlined-name' label='Enter ToDo Item' margin='normal' variant='outlined' value={this.state.value} onChange={this.handleInput} />
                        </Grid>
                        <Grid item md={1}>
                            <Button variant='contained' color='primary' size='large' style={{marginTop: '5px'}} type='submit'>
                                Save
                                <SaveIcon style={{marginLeft: '8px'}} />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Divider style={{marginTop: '30px'}} />
                <Grid container justify='center' alignItems='center'>
                    <Grid item xs={12} md={4}>
                        <List>
                            <TodoItem data={this.state.savedItems} toggleFunction={(e,i) => {this.toggleItemState(i)}} deleteFunction={(e,i) => this.deleteItem(i)} />
                        </List>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
