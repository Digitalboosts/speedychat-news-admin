import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditNewsItemDialog({ editItem, onSave, onCancel }) {

  console.log("editItemshankar", editItem)
  const [formData, setFormData] = useState({ ...editItem });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("formdata", formData)

  const handleTagChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(',').map((tag) => tag.trim()),
    }));
  };

  const handleUrlChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      reference_url: e.target.value.split('\n').map((url) => url.trim()),
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={Boolean(editItem)} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>Edit News Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="summary_dict.title"
          label="Title"
          placeholder={editItem?.summary_dict?.title}
          type="text"
          fullWidth
          variant="standard"
          value={formData.summary_dict?.title || ''}
          onChange={handleChange}
          multiline
          style={{ resize: 'none' }}
        />
        <TextField
          margin="dense"
          id="summary"
          name="summary_dict.summary"
          label="Summary"
          type="text"
          fullWidth
          variant="standard"
          value={formData.summary_dict?.summary || ''}
          onChange={handleChange}
          multiline
          style={{ resize: 'none' }}
        />
        <TextField
          margin="dense"
          id="status"
          name="status"
          label="Status"
          type="text"
          fullWidth
          variant="standard"
          value={formData.status || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="short_by"
          name="short_by"
          label="Short By"
          type="text"
          fullWidth
          variant="standard"
          value={formData.short_by || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="categories"
          name="categories"
          label="Categories"
          type="text"
          fullWidth
          variant="standard"
          value={formData.categories || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="tags"
          name="tags"
          label="Tags"
          type="text"
          fullWidth
          variant="standard"
          value={formData.tags?.join(', ') || ''}
          onChange={handleTagChange}
        />
        <TextField
          margin="dense"
          id="reference_url"
          name="reference_url"
          label="Reference URLs"
          type="text"
          fullWidth
          variant="standard"
          value={formData.reference_url?.join('\n') || ''}
          onChange={handleUrlChange}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} type="button">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
