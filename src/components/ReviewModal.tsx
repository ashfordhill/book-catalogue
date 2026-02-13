import { Dialog, DialogContent, Typography, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { BookWithId } from '../types';
import { QuoteTerminal } from './QuoteTerminal';
import '../styles/shared.css';

interface ReviewModalProps {
  book: BookWithId | null;
  onClose: () => void;
}

export function ReviewModal({ book, onClose }: ReviewModalProps) {
  return (
    <Dialog
      open={!!book}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "card-purple",
        sx: {
          maxHeight: '90vh',
          bgcolor: '#18181b'
        }
      }}
    >
      {book && (
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: { md: '55vh' } }}>
          {/* Left – Terminal (e-reader style quotes) */}
          <Box
            sx={{
              width: { xs: '100%', md: '42%' },
              minHeight: { xs: '280px', md: 'auto' },
              flexShrink: 0
            }}
          >
            <QuoteTerminal book={book} />
          </Box>

          {/* Right – Book details & Synopsis */}
          <Box
            className="modal-content-panel"
            sx={{
              width: { xs: '100%', md: '58%' },
              p: 4,
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h4" className="mono-text-3xl" sx={{ mb: 0.5, color: '#fff' }}>
                  {book.title}
                </Typography>
                <Typography className="mono-text-lg" sx={{ color: '#2dffc4' }}>
                  {book.author}
                </Typography>
              </Box>
              <IconButton
                onClick={onClose}
                className="btn-purple"
                size="small"
                sx={{ height: 40, borderRadius: 2 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {book.tags.map((tag, idx) => {
                const accentClasses = [
                  'tag-neon-pink',
                  'tag-mint',
                  'tag-orange',
                  'tag-cyan',
                  'tag-purple',
                  'tag-yellow'
                ];
                const accentClass = accentClasses[idx % accentClasses.length];
                return (
                  <span key={tag} className={`tag ${accentClass}`}>
                    {tag}
                  </span>
                );
              })}
            </Box>

            <Box sx={{ mt: 'auto', pt: 2, mb: 0 }}>
              <Typography className="section-header section-header-synopsis">
                &gt; Synopsis
              </Typography>
              <Typography
                className="mono-text-sm"
                sx={{ color: 'rgba(212, 212, 216, 0.9)', lineHeight: 1.6 }}
              >
                {book.synopsis}
              </Typography>
            </Box>

            {book.reviewFile && book.reviewFile.length > 0 && (
              <Box sx={{ mt: 2, pt: 2 }}>
                <Button
                  component={Link}
                  to={`/review/${book.reviewFile.replace('/reviews/', '')}`}
                  onClick={onClose}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  className="btn-purple-filled"
                  sx={{
                    bgcolor: '#8b5cf6',
                    color: '#000',
                    '&:hover': { bgcolor: '#7c3aed' },
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    border: '2px solid #8b5cf6'
                  }}
                >
                  Read Full Review
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
}
