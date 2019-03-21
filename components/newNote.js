import fetch from 'isomorphic-unfetch'
import { Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap'

class NewNote extends React.Component {
    constructor(props) {
        super(props);
        this.state= {newNoteTitle: '', newNoteContent: ''}
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleNewNoteSave = this.handleNewNoteSave.bind(this)
    }

    handleTitleChange(e) {
        this.setState({newNoteTitle: e.target.value});
    }

    handleContentChange(e) {
        this.setState({newNoteContent: e.target.value});
    }

    async handleNewNoteSave(){
        await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: this.state.newNoteTitle, content: this.state.newNoteContent})
        })
        this.setState({
            newNoteTitle: '',
            newNoteContent: ''
        });
        this.props.getNotesList()
    }

    render(){

        let enableSaveButton = (this.state.newNoteTitle && 0 !== this.state.newNoteTitle.length) || (this.state.newNoteContent && 0 !== this.state.newNoteContent.length);

        return (
            <Card>
                <CardBody>
                    <CardTitle style={{fontWeight: 700}}>Create new note</CardTitle>
                    <Form>
                    <FormGroup>
                        <Label for="newNoteTitle">Title</Label>
                        <Input type="text" name="newNoteTitle" id="newNoteTitle" onChange={this.handleTitleChange} value={this.state.newNoteTitle}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="newNoteTitle">Content</Label>
                        <Input type="textarea" name="newNoteContent" id="newNoteContent" onChange={this.handleContentChange} value={this.state.newNoteContent}/>
                    </FormGroup>
                    </Form>
                    <Button disabled={!enableSaveButton} onClick={this.handleNewNoteSave} href="#">Save</Button>
                </CardBody>
            </Card>
        )
    }
}
  
export default NewNote