import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { 
  Container,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Paper,
  Card,
  CardContent
} from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate",{
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to generate reply. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          boxShadow: '0px 12px 32px rgba(0,0,0,0.2)'
        }}
      >
        <Typography
          variant='h4'
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, textAlign: 'center' }}
        >
          Sachal's Email Reply Generator
        </Typography>

        <Box sx={{ mx: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label='Original Email Content'
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Friendly</MenuItem>
              <MenuItem value="friendly">Concise</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            size="large"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
          </Button>

          {error && (
            <Typography color='error' sx={{ mt: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
        </Box>
      </Paper>

      {generatedReply && (
        <Card
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: '0px 10px 28px rgba(0,0,0,0.2)',
            backgroundColor: 'white'
          }}
        >
          <Typography variant='h5' gutterBottom sx={{ fontWeight: 500 }}>
            Generated Reply
          </Typography>
          <CardContent sx={{ p: 0 }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant='filled'
              value={generatedReply}
              inputProps={{ readOnly: true }}
              sx={{ backgroundColor: '#ffffff' }}
            />
            <Box textAlign="right" sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigator.clipboard.writeText(generatedReply)}
                sx={{ textTransform: 'none' }}
              >
                Copy to Clipboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

export default App;
