import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container, Card } from 'react-bootstrap';

import './App.css';

function App() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [important, setImportant] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      const newReminders = [...reminders];
      newReminders[editIndex] = { title, description, date, important };
      setReminders(newReminders);
      setEditIndex(null);
    } else {
      setReminders([...reminders, { title, description, date, important }]);
    }

    setTitle('');
    setDescription('');
    setDate('');
    setImportant(false);
  };

  const handleDelete = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const handleEdit = (index) => {
    setTitle(reminders[index].title);
    setDescription(reminders[index].description);
    setDate(reminders[index].date);
    setImportant(reminders[index].important);
    setEditIndex(index);
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              placeholder="Ingrese Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              placeholder="Ingrese Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Importante"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
          </Form.Group>

          <Button type="submit">
            {editIndex !== null ? 'Actualizar Recordatorio' : 'Agregar Recordatorio'}
          </Button>
        </Form>
      </Row>
      <Row style={{ padding: 10 }}>
        {reminders.map((reminder, index) => (
          <Col sm={6} key={index}>
            <Card style={{ width: '18rem', marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>
                  {reminder.title} {reminder.important && <span style={{ color: 'red' }}>!</span>}
                </Card.Title>
                <Card.Text>{reminder.description}</Card.Text>
                <Card.Text>Fecha: {reminder.date}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Eliminar
                </Button>{' '}
                <Button variant="warning" onClick={() => handleEdit(index)}>
                  Modificar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

