import React from 'react';
import './App.css';

class Base extends React.Component{
    render() {
        return (
            <div className="header">
                To-Do App
            </div>
        );
    }
}

class AddNote extends React.Component{
    render() {
        return (    
            <div className="add-note-container">
                <input type="text" id="todo-input" name="todo-text" placeholder="What do you want to do?"/>
                <button className="add-todo-button" type="button" value="Add">
                    Add
                </button>
                <hr />
                <h4>New Task Added</h4>            
            </div>
        );
    }    
}   

class ListNote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noteData: [
                {   
                    "id": 1,
                    "text": "Bring Milk",
                    "created_date": "1 Jan, 2022"
                },
                {   
                    "id": 2,
                    "text": "Bring Bread",
                    "created_date": "2 Jan, 2022"
                },
                {   
                    "id": 3,
                    "text": "Bring Eggs",
                    "created_date": "3 Jan, 2022"
                }
            ]
        }
    }
    
    componentDidMount(){
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        fetch('http://localhost:8000/list', {
            method: 'GET'
        }).then(res => {
            res.json()
            .then(data => {
                if (data.length > 0){
                    let note = data.map(note => {
                        let date = new Date(note.created_date)
                        let dateString = `${date.getDate()} ${months[date.getMonth()+1]}, ${date.getFullYear()}`;
                        return {
                            text: note.text,
                            created_date: dateString,
                            id: note.id
                        };
                    });

                    this.setState({
                        noteData: note
                    });
                }
                
            })
        })
             
        
    }
    render() {
        let noteData = this.state.noteData;
        return (
            <div className="note-list">

                {noteData.map(item => {
                    return (
                        <div className="note-container" key={item.ObjectID}>
                            <span className="note-date">{item.created_date}</span>
                            <span className="note-text">{item.text}</span>
                            <hr />
                        </div>
                    );
                })}
            </div>       
        );
    }
}

class App extends React.Component {
    render(){
        return (
            <div className="app">
                <Base />
                <div className="app-outline">
                    <AddNote />
                    <ListNote />
                </div>
            </div>
        );
    }
}

export default App;
