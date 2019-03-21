import { Button, Card, CardBody, CardTitle, CardText, CardLink, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            isEditModalOpen: false,
            newNoteTitle: props.note.title,
            newNoteContent: props.note.content
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.handleEditNote = this.handleEditNote.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
    }

    toggleModal() {
        this.setState(prevState => ({
            isEditModalOpen: !prevState.isEditModalOpen
        }));
    }

    handleTitleChange(e) {
        this.setState({newNoteTitle: e.target.value});
    }

    handleContentChange(e) {
        this.setState({newNoteContent: e.target.value});
    }

    async handleEditNote() {
        await fetch('http://localhost:3000/notes/'+this.props.note.id, {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: this.state.newNoteTitle, content: this.state.newNoteContent})
            })
        this.props.getNotesList()
    }

    render(){

        let enableSaveButton = (this.state.newNoteTitle && 0 !== this.state.newNoteTitle.length) || (this.state.newNoteContent && 0 !== this.state.newNoteContent.length);

        return (
            <Card>
                <CardBody>
                    <CardTitle style={{fontWeight: 700}}>{this.props.note.title}</CardTitle>
                    <CardText>{this.props.note.content}</CardText>
                    <CardLink onClick={() => this.props.deleteNote(this.props.note.id)} href="#">Delete</CardLink>
                    <CardLink onClick={this.toggleModal} href="#">Edit</CardLink>
                    <Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Edit note</ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.toggleModal}>Cancel</Button>{' '}
                        <Button disabled={!enableSaveButton} color="primary" onClick={this.handleEditNote}>Save</Button>
                    </ModalFooter>
                    </Modal>
                </CardBody>
            </Card>
        )
    }
}
  
export default Note