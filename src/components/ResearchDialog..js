import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

const ResearchDialog = ({ open, onClose, onApply }) => {
  const [criteria, setCriteria] = useState({
    pattern: '',
    timeRange: '1D',
    priceRange: {
      min: '',
      max: '',
    },
    volumeThreshold: '',
    includeGaps: false,
  });

  const handleApply = () => {
    onApply(criteria);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Research Criteria</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <Select
            value={criteria.pattern}
            onChange={(e) => setCriteria({ ...criteria, pattern: e.target.value })}
            label="Pattern"
          >
            <MenuItem value="doubleTop">Double Top</MenuItem>
            <MenuItem value="doubleBottom">Double Bottom</MenuItem>
            <MenuItem value="breakout">Breakout</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Minimum Price"
            type="number"
            value={criteria.priceRange.min}
            onChange={(e) => setCriteria({
              ...criteria,
              priceRange: { ...criteria.priceRange, min: e.target.value }
            })}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Maximum Price"
            type="number"
            value={criteria.priceRange.max}
            onChange={(e) => setCriteria({
              ...criteria,
              priceRange: { ...criteria.priceRange, max: e.target.value }
            })}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Volume Threshold"
            type="number"
            value={criteria.volumeThreshold}
            onChange={(e) => setCriteria({ ...criteria, volumeThreshold: e.target.value })}
          />
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={criteria.includeGaps}
              onChange={(e) => setCriteria({ ...criteria, includeGaps: e.target.checked })}
            />
          }
          label="Include Gaps"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained" color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResearchDialog;