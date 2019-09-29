import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

const TodoItem = (props) => {
    return (
        <>
            {props.data.map((ele, i) => {
                let decor = '';
                if(ele.isCompleted) {
                    decor = {textDecoration: 'line-through'}
                }
                else decor = {textDecoration: 'none'}
                return (
                    <ListItem key={ele.item} role={undefined} dense button onChange={(e) => props.toggleFunction(e, i)}>
                        <ListItemIcon>
                            <Checkbox edge='start' checked={ele.isCompleted} />
                        </ListItemIcon>
                        <ListItemText primary={ele.item} style={decor} />
                        <ListItemSecondaryAction onClick={(e) => {props.deleteFunction(e,i)}} >
                            <IconButton edge='end'>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}    
        </>
    )
}

export default TodoItem;